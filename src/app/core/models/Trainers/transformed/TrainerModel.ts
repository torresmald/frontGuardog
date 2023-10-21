import { experience } from "../trainersData"
export interface Trainers {
    name: string,
    image: string,
    email: string,
    phone: string,
    experience: experience,
    verified: boolean,
    isAdmin: boolean
}
