import { Trainers } from "../../Trainers/transformed/TrainerModel"

export interface ApiServices{
    _id: string,
    name: string,
    price: number,
    type: string,
    image: string,
    pet: string,
    date: string,
    hour: string,
    petId?: string,
    trainer: Trainers,
    link: string,
    description: string,
    totalPaidReal: number,
    __v?: string,
    createdAt?: string,
    updatedAt?: string
}
