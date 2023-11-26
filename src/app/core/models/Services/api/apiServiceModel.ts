import { ApiPets } from "../../Pets/api/apiPetModel"
import { typesServices } from "../servicesData"

export interface ApiServices{
    _id: string,
    name: string,
    price: number,
    type: string,
    image: string,
    pet: string,
    date: string,
    __v?: string,
    createdAt?: string,
    updatedAt?: string
}