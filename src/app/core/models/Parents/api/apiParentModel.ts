import { ApiPets } from "../../Pets/api/apiPetModel"

export interface ApiParents{
    _id: string,
    name: string,
    image: string,
    pets: ApiPets[],
    email: string,
    password: string,
    phone: string,
    address: string,
    isAdmin: Boolean,
    verified: Boolean
    token: string,
    __v?: string,
    createdAt?: string,
    updatedAt?: string,
}