import { typesServices } from "../servicesData"

export interface ApiServices{
    _id?: string,
    name: string,
    price: number,
    type: string,
    image: string,
    __v?: string,
    createdAt?: string,
    updatedAt?: string
}