import { ApiPet } from "../../Pets/api/apiPetModel"

export interface ApiParent{
    _id: String,
    isAdmin: Boolean,
    verified: Boolean
    name: String,
    image: String,
    pets: ApiPet[],
    email: String,
    password: String,
    phone: String,
    address: String,
    token: String,
    __v: String,
    createdAt: String,
    updatedAt: String
}