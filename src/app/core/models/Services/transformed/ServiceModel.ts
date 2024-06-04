import { Trainers } from "../../Trainers/transformed/TrainerModel";

export interface Services {
    name: string,
    price: number,
    type: string,
    image: string
    _id: string,
    pet: string,
    date: string,
    hour: string,
    petId?: string,
    trainer: Trainers,
    link: string,
    description: string,
}
