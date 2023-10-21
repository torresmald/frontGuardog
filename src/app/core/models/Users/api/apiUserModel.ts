import { ApiParents } from "../../Parents/api/apiParentModel";

export interface ApiUsers{
    msg: string,
    token?: string
    user: ApiParents
}