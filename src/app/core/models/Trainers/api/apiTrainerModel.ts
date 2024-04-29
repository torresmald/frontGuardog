import { experience } from "../trainersData"
export interface ApiTrainers {
    _id: string,
    name: string,
    image: string,
    experience: experience,
    email: string,
    phone: string,
    verified: boolean,
    isAdmin: boolean,
    token: string,
    __v?: string,
    createdAt?: string,
    updatedAt?: string
    location: Location;
}
interface Location {
  lat: number;
  lng: number;
}