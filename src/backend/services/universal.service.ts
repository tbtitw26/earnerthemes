import { connectDB } from "../config/db";
import { UniversalOrder, UniversalOrderDocument } from "../models/universalOrder.model";
import { User } from "../models/user.model";
import { transactionService } from "../services/transaction.service";
import OpenAI from "openai";
import { ENV } from "../config/env";
import mongoose from "mongoose";
import { emailService } from "./email.service";
import { legacyTokensToBalance, roundMoney, formatMoney } from "@/utils/money";

const openai = new OpenAI({ apiKey: ENV.OPENAI_API_KEY });

function buildPrompt(body: any): string {
    const { fields } = body;

    const domain = fields.domain || "general";          // fitness / culinary / ...
    const mode = fields.deliveryMode || "ai";          // ai | expert
    const language = body.language || "English";

    const context = JSON.stringify(fields, null, 2);

    // ---------- FITNESS ----------
    const isFitness = domain === "fitness" || body.category === "training";

    if (isFitness) {
        const persona =
            mode === "expert"
                ? `
You are a senior strength & conditioning coach.
You write premium programs with clear reasoning, technique notes, and progression logic.
Tone: confident, professional, practical.
`
                : `
You are an AI fitness programming assistant.
You create clear, structured, practical training plans.
Tone: friendly, concise, actionable.
`;

        const task =
            mode === "expert"
                ? `
Build a personalized training program with coaching-level detail.
Include: weekly structure, exercise selection rationale, progression rules, and safety notes.
`
                : `
Build a personalized training program.
Include: weekly structure, exercises, sets/reps, and progression guidance.
`;

        const outputFormat = `
### Output Requirements (MUST FOLLOW)
Return a complete program in markdown with these sections:

1) Overview
- Goal, experience level, duration (weeks), schedule (days/week, minutes/session), equipment
- Key principles (3–6 bullets)

2) Weekly Plan
For each week (or week ranges if long), list training days.
For each workout:
- Warm-up (short)
- Main lifts (sets x reps, RPE or intensity guidance, rest)
- Accessories (sets x reps)
- Optional conditioning (if relevant)
- Cool-down / mobility (short)
Keep sessions realistic for the provided sessionMinutes.

3) Progression
- How to progress week to week (reps/weight/sets)
- Deload guidance (if needed)
- Plateau handling

4) Technique & Safety
- 6–10 key technique cues
- Injury-risk reduction and substitutions if limitations are present

5) Adjustments
- What to do if user misses a session
- How to scale up/down based on recovery

Important:
- Use the user's equipment constraints strictly.
- Respect limitations/injuries.
- FocusAreas are priorities (add extra volume/selection bias).
`;

        return `
${persona}

${task}

### Client Input (JSON)
${context}

${outputFormat}

Write the entire output in ${language}.
`;
    }

    // ---------- EXISTING LOGIC (culinary/general) ----------
    const persona =
        domain === "culinary"
            ? mode === "expert"
                ? `
You are a Michelin-level professional chef and culinary educator.
You explain not only WHAT to do, but WHY.
You include techniques, mistakes, substitutions, and professional insights.
Tone: confident, expert, premium.
`
                : `
You are an AI culinary assistant.
You generate clear, structured, practical cooking courses.
Tone: friendly and concise.
`
            : mode === "expert"
                ? `
You are a senior domain expert and professional consultant.
You provide deep, expert-level explanations.
`
                : `
You are a helpful AI assistant.
You generate clear and structured content.
`;

    const task =
        domain === "culinary"
            ? mode === "expert"
                ? `
Design a comprehensive culinary course.
Include:
- Skill progression
- Weekly structure
- Techniques explanation
- Common mistakes
- Ingredient substitutions
- Professional chef notes
`
                : `
Design a clear culinary course.
Include:
- Weekly plan
- Recipes
- Short tips
`
            : `
Generate content based on the provided context.
`;

    const outputRules =
        mode === "expert"
            ? `
Output must be detailed, structured with headings and subheadings.
Assume the reader wants mastery.
`
            : `
Keep the output concise and easy to follow.
`;

    return `
${persona}

${task}

### Client Input
${context}

### Output Rules
${outputRules}

Write the entire output in ${language}.
`;
}

/** 🧩 Extra section prompt builder */
function buildExtraPrompt(extra: string, category: string, fields: any, language?: string): string {
    const context = JSON.stringify(fields, null, 2);
    const langNote = language ? `Write in ${language}.` : "";

    // Fitness extras (from ManualGenerator)
    switch (extra) {
        case "warmupCooldown":
            return `Create personalized warm-up + cool-down protocols for each workout day based on the plan context.
Include mobility, activation, and time estimates. ${langNote}\n${context}`;

        case "exerciseLibrary":
            return `Create an Exercise Library (PDF-style markdown).
For each exercise likely used in this plan:
- technique cues
- tempo suggestions
- common mistakes
- substitutions (based on equipment)
- regressions/progressions
Keep it structured. ${langNote}\n${context}`;

        case "progressionAuto":
            return `Write detailed progression rules:
- how to progress loads/reps/sets
- when to deload
- what to do on plateaus
- examples for main lifts and accessories
Use tables where helpful. ${langNote}\n${context}`;

        case "injurySafeAlternatives":
            return `Provide joint-safe alternatives and modifications for knees/back/shoulders based on limitations and equipment.
Include "if pain then" rules and safer swaps for common movements. ${langNote}\n${context}`;

        case "nutritionMacros":
            return `Create a Nutrition & Macros Guide aligned with the goal:
- estimated calorie target method (with example)
- protein/fat/carb ranges
- meal structure tips
- 7-day simple menu template (optional)
Be practical, not medical. ${langNote}\n${context}`;

        case "formVideoChecklist":
            return `Create a Form Video Checklist:
- filming angles per exercise type
- checklist items to review
- common red flags
Keep it short and actionable. ${langNote}\n${context}`;

        case "weeklyCheckins":
            return `Create a Weekly Check-in Template:
Include a table for sleep, stress, soreness/DOMS, steps/cardio, weights used, RPE, notes, and next-week adjustments. ${langNote}\n${context}`;

        case "coachNotes":
            return `Write Coach Notes:
- key cues for this user
- intensity guidance (RPE/RIR)
- common pitfalls for this goal/experience
- focus priorities (focusAreas)
Premium tone. ${langNote}\n${context}`;

        // legacy extras kept
        case "progressTracking":
            return `Create a weekly progress tracking table for ${category}.\n${langNote}\n${context}`;
        case "motivationTips":
            return `Write 10 motivational phrases related to this ${category} context.\n${langNote}\n${context}`;
        case "summaryReport":
            return `Write a short summary report showing how the plan achieves goals.\n${langNote}\n${context}`;

        default:
            return `Generate a useful "${extra}" section for the ${category} context.\n${langNote}\n${context}`;
    }
}
export const universalService = {
    /** create order */
    async createOrder(userId: string, email: string, body: any) {
        await connectDB();

        if (!body || typeof body !== "object") throw new Error("Invalid request body");
        if (!body.category) throw new Error("Missing category");
        if (!body.fields || typeof body.fields !== "object") throw new Error("Missing fields");
        if ((body.totalAmount == null || isNaN(body.totalAmount)) && (body.totalTokens == null || isNaN(body.totalTokens))) {
            throw new Error("Invalid totalAmount value");
        }

        if (body.planType === "instant") body.planType = "default";
        if (!["default", "reviewed"].includes(body.planType))
            throw new Error("Invalid planType (must be 'default' or 'reviewed')");

        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");

        const languageCost = body.language && body.language !== "English" ? legacyTokensToBalance(5) : 0;
        const totalCost = roundMoney(
            (body.totalAmount != null ? Number(body.totalAmount) : legacyTokensToBalance(Number(body.totalTokens))) +
            languageCost
        );

        if (user.balance < totalCost)
            throw new Error(`Insufficient balance (have ${user.balance}, need ${totalCost})`);

        // charge
        user.balance = roundMoney(user.balance - totalCost);
        await user.save();
        await transactionService.record(user._id, email, totalCost, "spend", user.balance);

        // main generation
        const mainPrompt = buildPrompt(body);
        let mainText = "";
        try {
            const mainRes = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: "You are a structured professional generator. Always output final readable content.",
                    },
                    { role: "user", content: mainPrompt },
                ],
            });
            mainText = mainRes.choices?.[0]?.message?.content?.trim() || "";
        } catch (err: any) {
            throw new Error("AI generation failed, please retry later");
        }

        // extras generation
        const extrasData: Record<string, string> = {};
        if (Array.isArray(body.extras) && body.extras.length > 0) {
            for (const extra of body.extras) {
                try {
                    const extraPrompt = buildExtraPrompt(extra, body.category, body.fields, body.language);
                    const extraRes = await openai.chat.completions.create({
                        model: "gpt-4o-mini",
                        messages: [{ role: "user", content: extraPrompt }],
                    });
                    extrasData[extra] = extraRes.choices?.[0]?.message?.content?.trim() || "";
                } catch {}
            }
        }

        const readyAt =
            body.planType === "reviewed" ? new Date(Date.now() + 24 * 60 * 60 * 1000) : new Date();

        const orderDoc = {
            userId: new mongoose.Types.ObjectId(userId),
            email,
            category: body.category,
            fields: body.fields,
            planType: body.planType,
            extras: body.extras || [],
            totalAmount: totalCost,
            language: body.language || "English",
            response: mainText,
            extrasData,
            status: body.planType === "reviewed" ? "pending" : "ready",
            readyAt,
        };

        const order = await UniversalOrder.create(orderDoc);
        const plainOrder = order.toObject({ flattenMaps: true });

        try {
            await emailService.sendOrderConfirmationEmail({
                email: user.email,
                firstName: user.firstName,
                subject: "Order confirmation",
                summaryTitle: "Order summary",
                summaryLines: [
                    `Service: ${body.category}`,
                    `Plan type: ${body.planType}`,
                    `Extras: ${Array.isArray(body.extras) && body.extras.length ? body.extras.join(", ") : "None"}`,
                    `Language: ${body.language || "English"}`,
                    `Status: ${body.planType === "reviewed" ? "Pending review" : "Ready"}`,
                ],
                amountLabel: "Amount used",
                amountValue: formatMoney(totalCost),
                transactionDate: plainOrder.createdAt || new Date(),
            });
        } catch (error) {
            console.error("❌ Universal order confirmation email failed:", {
                orderId: plainOrder._id,
                email: user.email,
                error,
            });
        }

        return plainOrder;
    },

    async getOrders(userId: string) {
        await connectDB();
        const docs = await UniversalOrder.find({ userId })
            .sort({ createdAt: -1 })
            .lean<UniversalOrderDocument[]>({ virtuals: true });

        return docs.map((d: any) => {
            if (d.extrasData instanceof Map) d.extrasData = Object.fromEntries(d.extrasData);
            return d;
        });
    },

    async getOrderById(userId: string, orderId: string) {
        await connectDB();
        const doc = await UniversalOrder.findOne({ _id: orderId, userId }).lean<UniversalOrderDocument>({ virtuals: true });
        if (!doc) return null;
        if (doc.extrasData instanceof Map) (doc as any).extrasData = Object.fromEntries(doc.extrasData);
        return doc;
    },
};
