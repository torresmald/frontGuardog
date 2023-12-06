import { ApiParents } from "../../Parents/api/apiParentModel"
import { ApiServices } from "../../Services/api/apiServiceModel"

export interface ApiAppointments{
    _id: string,
    services: ApiServices[],
    parent: ApiParents,
    createdAt?: string,
    updatedAt?: string,
    __v?: string
}