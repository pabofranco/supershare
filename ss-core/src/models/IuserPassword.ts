import stringArray from "../../models/stringArray";

export interface IuserPassword extends stringArray {
    id: string,
    password: string,
    user_id: string,
}
