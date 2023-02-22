import { createHash, randomUUID } from "crypto"
import { IuserPassword } from "../models/IuserPassword";
import { IuserSalt } from "../models/IuserSalt";

export const generateUUID = (): string => ( randomUUID() );

export const generateSalt = (userId: string): IuserSalt => {
    return {
        id: generateUUID(),
        salt: generateUUID(),
        user_id: userId,
    };
};

export const generatePassword = (userId: string, password: string, salt: string): IuserPassword => {
    return {
        id: generateUUID(),
        password: saltPassword(salt, password),
        user_id: userId,
    };
};

export const saltPassword = (salt: string, password: string): string => {
    const passwordData = `${password}${salt}`;
    return createHash('sha256').update(passwordData).digest('hex');
}

