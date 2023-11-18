import { Pets } from "../../Pets/transformed/PetModel"

export interface Parents{
    name: string,
    image: string,
    pets: Pets[],
    email: string,
    password: string,
    phone: string,
    address: string,
    isAdmin: Boolean,
    verified: Boolean
    token: string,
    _id: string
}