import { ApiParents } from "../../Parents/api/apiParentModel"
import { ApiPets } from "../../Pets/api/apiPetModel"
import { ApiServices } from "../../Services/api/apiServiceModel"

export interface ApiAppointments{
    id: string,
    date: string,
    service: ApiServices,
    parent: ApiParents,
    pet: ApiPets
    createdAt?: string,
    updatedAt?: string,
    __v?: string
}