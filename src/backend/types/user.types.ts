import { Document, Types } from "mongoose";

export interface IUserSchema extends Document {
    _id: Types.ObjectId;

    firstName: string;
    lastName: string;

    email: string;
    password: string;

    phoneNumber: string;
    phone?: string;
    dateOfBirth: Date;
    birthDate?: Date;

    address: {
        street: string;
        city: string;
        country: string;
        postCode: string;
        zip?: string;
    };

    balance: number;
    tokens?: number;
    role: "user" | "admin";

    createdAt: Date;
    updatedAt: Date;
}

export interface UserType {
    _id: string;

    firstName: string;
    lastName: string;

    email: string;
    phoneNumber: string;
    phone?: string;
    dateOfBirth: Date;
    birthDate?: Date;

    address: {
        street: string;
        city: string;
        country: string;
        postCode: string;
        zip?: string;
    };

    balance: number;
    role: "user" | "admin";

    createdAt: Date;
    updatedAt: Date;
}
