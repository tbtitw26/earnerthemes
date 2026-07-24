import { connectDB } from "../config/db";
import { userService } from "../services/user.service";
import { IUserSchema, UserType } from "@/backend/types/user.types";
import { transactionService, TransactionMeta } from "@/backend/services/transaction.service";
import { emailService } from "@/backend/services/email.service";
import { formatMoney, legacyTokensToBalance, roundMoney } from "@/utils/money";

export const userController = {
    async topUpBalance(
        userId: string,
        amount: number,
        options?: { simulated?: boolean; meta?: TransactionMeta }
    ): Promise<UserType> {
        await connectDB();

        const user = await userService.addBalance(userId, amount);

        console.log("💳 Adding balance for user:", userId);
        await transactionService.record(user._id, user.email, amount, "add", user.balance, options?.meta);
        console.log("✅ Transaction created successfully");

        try {
            await emailService.sendOrderConfirmationEmail({
                email: user.email,
                firstName: user.firstName,
                subject: options?.simulated ? "Balance top-up test confirmation" : "Balance top-up confirmation",
                summaryTitle: options?.simulated ? "Simulated payment summary" : "Payment summary",
                summaryLines: [
                    `Order: Balance top-up`,
                    ...(options?.meta?.reference ? [`Receipt number: ${options.meta.reference}`] : []),
                    `Amount added: ${formatMoney(amount)}`,
                    `Wallet balance after payment: ${formatMoney(user.balance)}`,
                    ...(options?.meta?.billingDescriptor
                        ? [`Card statement descriptor: ${options.meta.billingDescriptor}`]
                        : []),
                ],
                amountLabel: "Top-up amount",
                amountValue: formatMoney(amount),
                transactionDate: new Date(),
            });
        } catch (error) {
            console.error("❌ Balance top-up email failed:", {
                userId,
                email: user.email,
                amount,
                error,
            });
        }

        return formatUser(user);
    },

    async spendBalance(userId: string, amount: number): Promise<UserType> {
        await connectDB();

        const user = await userService.getUserById(userId);
        if (!user) throw new Error("User not found");
        if ((user.balance || 0) < amount) throw new Error("Not enough balance");

        user.balance = roundMoney(user.balance - amount);
        await user.save();

        await transactionService.record(user._id, user.email, amount, "spend", user.balance);

        return formatUser(user);
    },
};

function formatUser(user: IUserSchema): UserType {
    return {
        _id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        // Documents created before the field rename still carry the legacy names.
        phoneNumber: user.phoneNumber || user.phone || "",
        phone: user.phoneNumber || user.phone || "",
        dateOfBirth: user.dateOfBirth || user.birthDate,
        birthDate: user.dateOfBirth || user.birthDate,
        address: {
            street: user.address?.street,
            city: user.address?.city,
            country: user.address?.country,
            postCode: user.address?.postCode || user.address?.zip || "",
            zip: user.address?.postCode || user.address?.zip || "",
        },
        role: user.role,
        balance: typeof user.balance === "number" ? user.balance : legacyTokensToBalance(user.tokens || 0),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}
