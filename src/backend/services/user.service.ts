import { User } from "../models/user.model";
import { IUserSchema } from "@/backend/types/user.types";
import { legacyTokensToBalance, roundMoney } from "@/utils/money";

async function ensureBalance(user: IUserSchema) {
    if (typeof user.balance !== "number" || Number.isNaN(user.balance)) {
        user.balance = legacyTokensToBalance(user.tokens || 0);
        user.tokens = undefined;
        await user.save();
    }

    return user;
}

export const userService = {
    async addBalance(userId: string, amount: number) {
        const user = await User.findById(userId);
        if (!user) throw new Error("UserNotFound");

        await ensureBalance(user);
        user.balance = roundMoney((user.balance || 0) + amount);
        await user.save();
        return user;
    },

    async getUserById(userId: string) {
        const user = await User.findById(userId);
        if (!user) throw new Error("UserNotFound");
        return ensureBalance(user);
    },
};
