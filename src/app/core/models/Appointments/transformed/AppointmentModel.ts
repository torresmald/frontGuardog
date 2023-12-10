import { Parents } from "../../Parents/transformed/ParentModel"
import { Services } from "../../Services/transformed/ServiceModel"

export interface Appointments{
    _id: string,
    services: Services[],
    parent: Parents,
    amount: number,
}