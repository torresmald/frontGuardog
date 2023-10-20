import { ApiPets } from "../../Pets/api/apiPetModel"

export interface ApiParents{
    _id: String,
    isAdmin: Boolean,
    verified: Boolean
    name: String,
    image: String,
    pets: ApiPets[],
    email: String,
    password: String,
    phone: String,
    address: String,
    token: String,
    id: String,
    __v?: String,
    createdAt?: String,
    updatedAt?: String,
    existParent: any

}