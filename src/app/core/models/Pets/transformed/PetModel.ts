import { nutrition, exercise } from "../petsData"
export interface Pet{
    name: String,
    image: String,
    birthday: String,
    nutrition: nutrition,
    diseases: String,
    exercise: exercise,
    maxNumberGifts: Number,
}