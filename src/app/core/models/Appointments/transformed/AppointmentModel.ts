import { Parents } from "../../Parents/transformed/ParentModel"
import { Pets } from "../../Pets/transformed/PetModel"
import { Services } from "../../Services/transformed/ServiceModel"

export interface Appointments{
    id: string,
    date: string,
    service: Services,
    parent: Parents,
    pet: Pets
}