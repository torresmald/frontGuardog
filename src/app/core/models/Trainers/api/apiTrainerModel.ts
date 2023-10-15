import { experience } from "../trainersData"
export interface ApiTrainer {
    _id: String,
    name: String,
    image: String,
    email: String,
    phone: String,
    experience: experience,
    __v: String,
    createdAt: String,
    updatedAt: String
}

