import stringArray from "../../models/stringArray";

export interface IuserSalt extends stringArray {
    id: string,
    salt: string,
    user_id: string,
}
