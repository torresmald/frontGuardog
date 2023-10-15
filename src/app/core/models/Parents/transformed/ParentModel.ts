import { Pet } from "../../Pets/transformed/PetModel"

export interface Parent{
    isAdmin: Boolean,
    verified: Boolean
    name: String,
    image: String,
    pets: Pet[],
    email: String,
    password: String,
    phone: String,
    address: String,
    token: String,
}