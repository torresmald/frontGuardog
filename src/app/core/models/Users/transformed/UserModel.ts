import { Parents } from "../../Parents/transformed/ParentModel";

export interface User{
    msg: string,
    token?: string,
    user: Parents
}