import { Pets } from "../../Pets/transformed/PetModel"

export interface Parents{
    isAdmin: Boolean,
    verified: Boolean
    name: String,
    image: String,
    pets: Pets[],
    email: String,
    password: String,
    phone: String,
    address: String,
    token: String,
}