import { nutrition, exercise } from "../petsData"

export interface ApiPets{
    _id: String,
    name: String,
    image: String,
    birthday: String,
    nutrition: nutrition,
    diseases: String,
    exercise: exercise,
    maxNumberGifts: Number,
    __v: String,
    createdAt: String,
    updatedAt: String

}


