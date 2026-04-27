"use client";

import React, { useMemo, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";

import styles from "./ManualGenerator.module.scss";

import { useAlert } from "@/context/AlertContext";
import { useUser } from "@/context/UserContext";

import { experts } from "@/data/experts";
import { media } from "@/resources/media";
import { IconKey } from "@/resources/icons";
import { renderIcon } from "@/utils/renderIcon";
import { FITNESS_EXTRAS } from "@/components/widgets/manual-generator/extra/fitnes-extra";
import { useCurrency } from "@/context/CurrencyContext";

type PlanPath = "ai" | "coach";
type Experience = "beginner" | "intermediate" | "advanced";
type Duration = "2w" | "4w" | "8w" | "12w";
type FitnessGoal = "fat_loss" | "muscle_gain" | "strength" | "endurance" | "mobility";
type TrainingDays = "2" | "3" | "4" | "5" | "6";
type SessionMinutes = "30" | "45" | "60" | "75" | "90";
type Equipment = "gym" | "home_basic" | "home_full" | "no_equipment";

const PATHS: Array<{
    id: PlanPath;
    title: string;
    desc: string;
    badge: string;
    amount: number;
    icon: IconKey;
}> = [
    {
        id: "ai",
        title: "AI Training Plan",
        desc: "Instantly creates a plan for your goal, schedule, and equipment. You can update it anytime.",
        badge: "FAST & AFFORDABLE",
        amount: 15,
        icon: "speed",
    },
    {
        id: "coach",
        title: "Coach-Led Plan",
        desc: "A coach builds your plan and adds human feedback/explanations. Premium format.",
        badge: "PREMIUM COACHING",
        amount: 60,
        icon: "brain",
    },
];

const GOALS: Array<{ id: FitnessGoal; label: string; sub: string; icon?: IconKey }> = [
    { id: "fat_loss", label: "Fat Loss", sub: "calorie deficit + tone", icon: "path" as IconKey },
    { id: "muscle_gain", label: "Muscle Gain", sub: "hypertrophy + progression", icon: "flex" as IconKey },
    { id: "strength", label: "Strength", sub: "strength + compound lifts", icon: "settings" as IconKey },
    { id: "endurance", label: "Endurance", sub: "volume + intervals", icon: "brain" as IconKey },
    { id: "mobility", label: "Mobility", sub: "mobility + stability", icon: "priceTag" as IconKey },
];

const DURATIONS: Array<{ id: Duration; label: string; hint: string }> = [
    { id: "2w", label: "2 Weeks", hint: "Quick start" },
    { id: "4w", label: "4 Weeks", hint: "Best baseline" },
    { id: "8w", label: "8 Weeks", hint: "Solid progress" },
    { id: "12w", label: "12 Weeks", hint: "Transformation" },
];

const EQUIPMENT: Array<{ id: Equipment; label: string; sub: string }> = [
    { id: "gym", label: "Gym", sub: "full equipment" },
    { id: "home_basic", label: "Home (basic)", sub: "dumbbells/bands" },
    { id: "home_full", label: "Home (full)", sub: "rack/bench" },
    { id: "no_equipment", label: "No equipment", sub: "bodyweight only" },
];

const FOCUS_AREAS = ["Glutes", "Core", "Upper body", "Lower body", "Cardio", "Mobility"] as const;

interface Values {
    path: PlanPath;

    goal: FitnessGoal;
    experience: Experience;
    duration: Duration;

    daysPerWeek: TrainingDays;
    sessionMinutes: SessionMinutes;
    equipment: Equipment;

    focusAreas: string[];
    limitations: string;

    coachId?: string;
    extras: string[];
}

const schema = Yup.object({
    path: Yup.mixed<PlanPath>().oneOf(["ai", "coach"]).required(),

    goal: Yup.mixed<FitnessGoal>()
        .oneOf(["fat_loss", "muscle_gain", "strength", "endurance", "mobility"])
        .required("Required"),

    experience: Yup.mixed<Experience>().oneOf(["beginner", "intermediate", "advanced"]).required("Required"),

    duration: Yup.mixed<Duration>().oneOf(["2w", "4w", "8w", "12w"]).required("Required"),

    daysPerWeek: Yup.mixed<TrainingDays>().oneOf(["2", "3", "4", "5", "6"]).required("Required"),
    sessionMinutes: Yup.mixed<SessionMinutes>().oneOf(["30", "45", "60", "75", "90"]).required("Required"),
    equipment: Yup.mixed<Equipment>().oneOf(["gym", "home_basic", "home_full", "no_equipment"]).required("Required"),

    focusAreas: Yup.array().of(Yup.string()).required(),
    limitations: Yup.string().max(400, "Too long"),

    coachId: Yup.string().when("path", {
        is: "coach",
        then: (s) => s.required("Choose a coach"),
        otherwise: (s) => s.optional(),
    }),

    extras: Yup.array().of(Yup.string()).required(),
});

type PathIconProps = { icon: IconKey; active: boolean };

function PathIcon({ icon, active }: PathIconProps) {
    return <div className={active ? styles.iconBadge : styles.iconBadgeSoft}>{renderIcon(icon)}</div>;
}

function CoachValue({ coachId }: { coachId: string }) {
    const coach = experts.find((c) => c.id === coachId);
    if (!coach) return null;

    return (
        <div className={styles.coachValue}>
            <img src={media[coach.avatar].src} alt={coach.fullName} className={styles.coachAvatar} />
            <div className={styles.coachValueMeta}>
                <div className={styles.coachValueName}>{coach.fullName}</div>
                <div className={styles.coachValueSub}>⭐ {coach.rating} · {coach.subtitle}</div>
            </div>
        </div>
    );
}

function durationToWeeks(d: Duration) {
    if (d === "2w") return 2;
    if (d === "4w") return 4;
    if (d === "8w") return 8;
    return 12;
}

function durationToPercent(d: Duration) {
    if (d === "2w") return 0;
    if (d === "4w") return 33;
    if (d === "8w") return 66;
    return 100;
}

export default function ManualGenerator() {
    const { showAlert } = useAlert();
    const user = useUser();
    const { sign, currency, convertFromBase } = useCurrency();

    const [coachOpen, setCoachOpen] = useState(false);

    const initialValues: Values = {
        path: "ai",

        goal: "fat_loss",
        experience: "beginner",
        duration: "4w",

        daysPerWeek: "3",
        sessionMinutes: "45",
        equipment: "gym",

        focusAreas: ["Core"],
        limitations: "",

        coachId: undefined,
        extras: [],
    };

    // ✅ culinary-style duration pricing
    // Base includes minimal program for fitness (2 weeks), everything above is extra
    const FREE_WEEKS = 2;

    function calcDurationAmount(path: PlanPath, duration: Duration) {
        const weeks = durationToWeeks(duration);
        const extraWeeks = Math.max(0, weeks - FREE_WEEKS);

        if (path === "coach") return extraWeeks * 10;
        return extraWeeks * 5;
    }

    function calcTotalAmount(values: Values) {
        const pathAmount = PATHS.find((p) => p.id === values.path)?.amount ?? 0;
        const durationAmount = calcDurationAmount(values.path, values.duration);
        const extrasAmount = FITNESS_EXTRAS
            .filter((e) => values.extras.includes(e.id))
            .reduce((sum, e) => sum + e.amount, 0);

        return pathAmount + durationAmount + extrasAmount;
    }

    const experienceLabel = (x: Experience) => (x === "beginner" ? "Beginner" : x === "intermediate" ? "Intermediate" : "Advanced");
    const equipmentLabel = (id: Equipment) => EQUIPMENT.find((e) => e.id === id)?.label ?? id;
    const goalLabel = (id: FitnessGoal) => GOALS.find((g) => g.id === id)?.label ?? id;

    return (
        <Formik<Values>
            initialValues={initialValues}
            validationSchema={schema}
            validateOnMount
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);

                try {
                    const payload = {
                        category: "training",
                        planType: values.path === "coach" ? "reviewed" : "default",
                        language: "English",
                        extras: values.extras,
                        totalAmount: calcTotalAmount(values),
                        email: user?.email,

                        fields: {
                            domain: "fitness",
                            deliveryMode: values.path === "coach" ? "expert" : "ai",

                            goal: values.goal,
                            experience: values.experience,
                            durationWeeks: durationToWeeks(values.duration),

                            schedule: {
                                daysPerWeek: Number(values.daysPerWeek),
                                sessionMinutes: Number(values.sessionMinutes),
                            },

                            equipment: values.equipment,
                            focusAreas: values.focusAreas,
                            limitations: values.limitations?.trim() || undefined,

                            coach: values.path === "coach" ? experts.find((c) => c.id === values.coachId)?.fullName : undefined,
                        },
                    };

                    const res = await fetch("/api/universal/create-order", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include",
                        body: JSON.stringify(payload),
                    });

                    const data = await res.json();
                    if (res.ok) showAlert("Success", "Training plan request saved!", "success");
                    else showAlert("Error", data?.message || "Failed to save", "error");
                } catch {
                    showAlert("Error", "Network or server issue", "error");
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ values, setFieldValue, errors, touched, isSubmitting, submitForm }) => {
                const estimatedAmount = calcTotalAmount(values);

                const selectedExtras = FITNESS_EXTRAS.filter((e) => values.extras.includes(e.id));
                const durationWeeks = durationToWeeks(values.duration);

                const summaryRows = [
                    { k: "Mode", v: values.path === "coach" ? "Coach" : "AI" },
                    { k: "Goal", v: goalLabel(values.goal) },
                    { k: "Experience", v: experienceLabel(values.experience) },
                    { k: "Schedule", v: `${values.daysPerWeek}x / ${values.sessionMinutes} min` },
                    { k: "Duration", v: `${durationWeeks} weeks` },
                    { k: "Equipment", v: equipmentLabel(values.equipment) },
                ];

                return (
                    <Form className={styles.page}>
                        <div className={styles.container}>
                            {/* HERO */}
                            <div className={styles.hero}>
                                <div className={styles.heroText}>
                                    <h1>Create your fitness program</h1>
                                    <p>Pick a mode, goal, and setup — you’ll get a clear plan: workouts, progression, and adjustments.</p>
                                </div>

                                <div className={styles.heroSteps}>
                                    <div className={styles.stepPills}>
                                        <span className={styles.stepPill}>1</span>
                                        <span className={styles.stepPill}>2</span>
                                        <span className={styles.stepPill}>3</span>
                                        <span className={styles.stepPill}>4</span>
                                    </div>
                                    <div className={styles.stepTrail}>Mode → Goal → Setup → Add-ons</div>
                                </div>
                            </div>

                            {/* SHELL */}
                            <div className={styles.shell}>
                                {/* MAIN */}
                                <div className={styles.main}>
                                    {/* BLOCK 1 */}
                                    <section className={styles.block}>
                                        <div className={styles.blockHeader}>
                                            <div className={styles.blockKicker}>STEP 1</div>
                                            <div>
                                                <div className={styles.blockTitle}>Coaching mode</div>
                                                <div className={styles.blockSub}>AI is fast and affordable. Coach is premium with human feedback.</div>
                                            </div>
                                        </div>

                                        <div className={styles.heroCards}>
                                            {PATHS.map((p) => {
                                                const active = values.path === p.id;

                                                return (
                                                    <button
                                                        key={p.id}
                                                        type="button"
                                                        className={`${styles.heroCard} ${active ? styles.heroCardActive : ""}`}
                                                        onClick={() => {
                                                            setFieldValue("path", p.id);
                                                            if (p.id === "ai") {
                                                                setFieldValue("coachId", undefined);
                                                                setCoachOpen(false);
                                                            }
                                                        }}
                                                    >
                                                        <div className={styles.heroCardTop}>
                                                            <PathIcon icon={p.icon} active={active} />
                                                            <div className={styles.heroCardMeta}>
                                                                <div className={styles.heroCardRow}>
                                                                    <div className={styles.heroCardTitle}>{p.title}</div>
                                                                    <span className={styles.heroCardBadge}>{p.badge}</span>
                                                                </div>
                                                                <div className={styles.heroCardDesc}>{p.desc}</div>
                                                            </div>
                                                        </div>

                                                        <div className={styles.heroCardBottom}>
                                                            <div className={styles.heroCardPrice}>
                                                                <span className={styles.dot} />
                                                                <span className={styles.heroCardTokens}>{sign}{convertFromBase(p.amount).toFixed(2)} {currency}</span>
                                                            </div>

                                                            <div className={styles.selectMark} aria-hidden>
                                                                <span className={active ? styles.selectOn : styles.selectOff} />
                                                            </div>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {values.path === "coach" && (
                                            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className={styles.coachBlock}>
                                                <div className={styles.fieldTitle}>Choose your coach</div>

                                                <div className={styles.dropdown}>
                                                    <button
                                                        type="button"
                                                        className={`${styles.dropdownTrigger} ${touched.coachId && errors.coachId ? styles.dropdownError : ""}`}
                                                        onClick={() => setCoachOpen((v) => !v)}
                                                    >
                                                        {values.coachId ? (
                                                            <CoachValue coachId={values.coachId} />
                                                        ) : (
                                                            <span className={styles.dropdownPlaceholder}>
                                {touched.coachId && errors.coachId ? String(errors.coachId) : "Select a coach"}
                              </span>
                                                        )}
                                                        <span className={styles.dropdownChevron}>▾</span>
                                                    </button>

                                                    {coachOpen && (
                                                        <div className={styles.dropdownMenu}>
                                                            {experts.map((coach) => (
                                                                <button
                                                                    key={coach.id}
                                                                    type="button"
                                                                    className={styles.dropdownItem}
                                                                    onClick={() => {
                                                                        setFieldValue("coachId", coach.id);
                                                                        setCoachOpen(false);
                                                                    }}
                                                                >
                                                                    <img src={media[coach.avatar].src} alt={coach.fullName} className={styles.coachAvatar} />
                                                                    <div className={styles.dropdownItemMeta}>
                                                                        <div className={styles.dropdownItemName}>{coach.fullName}</div>
                                                                        <div className={styles.dropdownItemSub}>⭐ {coach.rating} · {coach.subtitle}</div>
                                                                    </div>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </section>

                                    {/* BLOCK 2 */}
                                    <section className={styles.block}>
                                        <div className={styles.blockHeader}>
                                            <div className={styles.blockKicker}>STEP 2</div>
                                            <div>
                                                <div className={styles.blockTitle}>Goal & experience</div>
                                                <div className={styles.blockSub}>Choose your main goal and level — the plan will adjust intensity and progression.</div>
                                            </div>
                                        </div>

                                        <div className={styles.fieldTitle}>Main goal</div>
                                        <div className={styles.goalGrid}>
                                            {GOALS.map((g) => {
                                                const active = values.goal === g.id;

                                                return (
                                                    <button
                                                        key={g.id}
                                                        type="button"
                                                        className={`${styles.goalCard} ${active ? styles.goalCardActive : ""}`}
                                                        onClick={() => setFieldValue("goal", g.id)}
                                                    >
                                                        <div className={styles.goalIcon}>{g.icon ? renderIcon(g.icon) : "•"}</div>
                                                        <div className={styles.goalMeta}>
                                                            <div className={styles.goalTitle}>{g.label}</div>
                                                            <div className={styles.goalSub}>{g.sub}</div>
                                                        </div>
                                                        <div className={styles.goalCheck}>
                                                            <span className={active ? styles.selectOn : styles.selectOff} />
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        <div className={styles.splitRow}>
                                            <div className={styles.splitCol}>
                                                <div className={styles.fieldTitle}>Experience level</div>
                                                <div className={styles.segmentBig}>
                                                    {(["beginner", "intermediate", "advanced"] as Experience[]).map((lvl) => (
                                                        <button
                                                            key={lvl}
                                                            type="button"
                                                            className={`${styles.segmentBigBtn} ${values.experience === lvl ? styles.segmentBigActive : ""}`}
                                                            onClick={() => setFieldValue("experience", lvl)}
                                                        >
                                                            {experienceLabel(lvl)}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className={styles.splitCol}>
                                                <div className={styles.fieldTitle}>Focus areas (optional)</div>
                                                <div className={styles.chipRow}>
                                                    {FOCUS_AREAS.map((x) => {
                                                        const active = values.focusAreas.includes(x);
                                                        return (
                                                            <button
                                                                key={x}
                                                                type="button"
                                                                className={`${styles.chipBig} ${active ? styles.chipBigActive : ""}`}
                                                                onClick={() => {
                                                                    setFieldValue(
                                                                        "focusAreas",
                                                                        active ? values.focusAreas.filter((a) => a !== x) : [...values.focusAreas, x]
                                                                    );
                                                                }}
                                                            >
                                                                {x}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/* BLOCK 3 */}
                                    <section className={styles.block}>
                                        <div className={styles.blockHeader}>
                                            <div className={styles.blockKicker}>STEP 3</div>
                                            <div>
                                                <div className={styles.blockTitle}>Schedule & setup</div>
                                                <div className={styles.blockSub}>Your schedule, session length, equipment, and program duration.</div>
                                            </div>
                                        </div>

                                        <div className={styles.splitRow}>
                                            <div className={styles.splitCol}>
                                                <div className={styles.fieldTitle}>Training days / week</div>
                                                <div className={styles.segmentBig}>
                                                    {(["2", "3", "4", "5", "6"] as TrainingDays[]).map((d) => (
                                                        <button
                                                            key={d}
                                                            type="button"
                                                            className={`${styles.segmentBigBtn} ${values.daysPerWeek === d ? styles.segmentBigActive : ""}`}
                                                            onClick={() => setFieldValue("daysPerWeek", d)}
                                                        >
                                                            {d} days
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className={styles.splitCol}>
                                                <div className={styles.fieldTitle}>Session duration</div>
                                                <div className={styles.segmentBig}>
                                                    {(["30", "45", "60", "75", "90"] as SessionMinutes[]).map((m) => (
                                                        <button
                                                            key={m}
                                                            type="button"
                                                            className={`${styles.segmentBigBtn} ${values.sessionMinutes === m ? styles.segmentBigActive : ""}`}
                                                            onClick={() => setFieldValue("sessionMinutes", m)}
                                                        >
                                                            {m} min
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.splitRow}>
                                            <div className={styles.splitCol}>
                                                <div className={styles.fieldTitle}>Equipment</div>
                                                <div className={styles.equipmentGrid}>
                                                    {EQUIPMENT.map((e) => {
                                                        const active = values.equipment === e.id;

                                                        return (
                                                            <button
                                                                key={e.id}
                                                                type="button"
                                                                className={`${styles.equipmentCard} ${active ? styles.equipmentCardActive : ""}`}
                                                                onClick={() => setFieldValue("equipment", e.id)}
                                                            >
                                                                <div className={styles.equipmentTitle}>{e.label}</div>
                                                                <div className={styles.equipmentSub}>{e.sub}</div>
                                                                <div className={styles.goalCheck}>
                                                                    <span className={active ? styles.selectOn : styles.selectOff} />
                                                                </div>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            <div className={styles.splitCol}>
                                                <div className={styles.fieldTitle}>Program duration</div>

                                                <div className={styles.durationBox}>
                                                    <div className={styles.durationTrack}>
                                                        <div className={styles.durationLine} />
                                                        <div className={styles.durationThumb} style={{ left: `${durationToPercent(values.duration)}%` }} />
                                                    </div>

                                                    <div className={styles.durationMarks}>
                                                        {DURATIONS.map((d) => {
                                                            const active = values.duration === d.id;
                                                            return (
                                                                <button
                                                                    key={d.id}
                                                                    type="button"
                                                                    className={`${styles.durationMark} ${active ? styles.durationMarkActive : ""}`}
                                                                    onClick={() => setFieldValue("duration", d.id)}
                                                                >
                                                                    <div className={styles.durationMarkTop}>{d.label}</div>
                                                                    <div className={styles.durationMarkSub}>{d.hint}</div>
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.fieldTitle}>Limitations / injuries (optional)</div>
                                        <div className={styles.inputWrap}>
                                            <input
                                                className={`${styles.input} ${touched.limitations && errors.limitations ? styles.inputError : ""}`}
                                                value={values.limitations}
                                                onChange={(e) => setFieldValue("limitations", e.target.value)}
                                                placeholder="e.g. knee pain, no barbell, prefer low-impact cardio..."
                                            />
                                        </div>
                                    </section>

                                    {/* BLOCK 4 */}
                                    <section className={styles.block}>
                                        <div className={styles.blockHeader}>
                                            <div className={styles.blockKicker}>STEP 4</div>
                                            <div>
                                                <div className={styles.blockTitle}>Add-ons (extra cost)</div>
                                                <div className={styles.blockSub}>Optional paid add-ons for your PDF/plan (amounts are added to the total).</div>
                                            </div>
                                        </div>

                                        <div className={styles.extrasGridNew}>
                                            {FITNESS_EXTRAS.filter((e) => !e.coachOnly || values.path === "coach").map((extra) => {
                                                const active = values.extras.includes(extra.id);

                                                return (
                                                    <button
                                                        key={extra.id}
                                                        type="button"
                                                        className={`${styles.extraCardNew} ${active ? styles.extraCardNewActive : ""}`}
                                                        onClick={() => {
                                                            setFieldValue(
                                                                "extras",
                                                                active ? values.extras.filter((id) => id !== extra.id) : [...values.extras, extra.id]
                                                            );
                                                        }}
                                                    >
                                                        <div className={styles.extraTopNew}>
                                                            <div className={styles.extraIcon}>{renderIcon(extra.icon)}</div>
                                                            <div className={styles.extraMeta}>
                                                                <div className={styles.extraTitle}>{extra.title}</div>
                                                                <div className={styles.extraDesc}>{extra.description}</div>
                                                            </div>
                                                        </div>

                                                        <div className={styles.extraBottomNew}>
                                                            <div className={styles.extraPrice}>
                                                                <span className={styles.dot} />
                                                                <span>+{sign}{convertFromBase(extra.amount).toFixed(2)} {currency}</span>
                                                            </div>
                                                            <div className={styles.goalCheck}>
                                                                <span className={active ? styles.selectOn : styles.selectOff} />
                                                            </div>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </section>

                                    {/* DESKTOP FOOTER (main) */}
                                    <div className={styles.bottomNote}>
                                        <span>✅ Tailored plan</span>
                                        <span>🧠 AI mode 24/7</span>
                                        <span>📈 Progression built-in</span>
                                    </div>
                                </div>

                                {/* SIDEBAR */}
                                <aside className={styles.sidebar}>
                                    <div className={styles.summaryCard}>
                                        <div className={styles.summaryTop}>
                                            <div>
                                                <div className={styles.summaryLabel}>Estimated cost</div>
                                                <div className={styles.summaryCost}>
                                                    <span className={styles.dotBig} />
                                                    <span className={styles.summaryCostNum}>{sign}{convertFromBase(estimatedAmount).toFixed(2)}</span>
                                                    <span className={styles.summaryCostUnit}>{currency}</span>
                                                </div>
                                            </div>

                                            <button type="submit" className={styles.ctaButton} disabled={isSubmitting}>
                                                {isSubmitting ? "Saving..." : "Save Draft"}
                                            </button>
                                        </div>

                                        <div className={styles.summaryDivider} />

                                        <div className={styles.summaryList}>
                                            {summaryRows.map((r) => (
                                                <div key={r.k} className={styles.summaryRow}>
                                                    <div className={styles.summaryKey}>{r.k}</div>
                                                    <div className={styles.summaryVal}>{r.v}</div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className={styles.summaryDivider} />

                                        <div className={styles.summarySectionTitle}>Add-ons</div>
                                        {selectedExtras.length ? (
                                            <ul className={styles.summaryBullets}>
                                                {selectedExtras.map((e) => (
                                                    <li key={e.id}>
                                                        {e.title} <span className={styles.muted}>+{sign}{convertFromBase(e.amount).toFixed(2)}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div className={styles.muted}>No add-ons selected</div>
                                        )}
                                    </div>
                                </aside>
                            </div>

                            {/* MOBILE FOOTER (shows when sidebar hidden) */}
                            <div className={styles.mobileFooter}>
                                <div className={styles.mobileCost}>
                                    <span className={styles.dotBig} />
                                    <span className={styles.mobileCostNum}>{sign}{convertFromBase(estimatedAmount).toFixed(2)}</span>
                                    <span className={styles.mobileCostUnit}>{currency}</span>
                                </div>

                                <button
                                    type="button"
                                    className={styles.mobileCTA}
                                    disabled={isSubmitting}
                                    onClick={() => {
                                        void submitForm();
                                    }}
                                >
                                    {isSubmitting ? "Saving..." : "Continue"}
                                </button>
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}
