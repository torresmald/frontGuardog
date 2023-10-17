import { ApiParents } from "src/app/core/models/Parents/api/apiParentModel";
import { Parents } from "src/app/core/models/Parents/transformed/ParentModel";



export function transformDataParent(parent: ApiParents): Parents {
    delete parent.__v
    delete parent.createdAt;
    delete parent.updatedAt;
    return parent;
}