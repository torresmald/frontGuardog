import { Parents } from "../../Parents/transformed/ParentModel"
import { nutrition, exercise } from "../petsData"
export interface Pets{
    _id: string,
    name: string,
    image: string,
    birthday: string,
    nutrition: nutrition,
    diseases: string,
    exercise: exercise,
    maxNumberGifts: Number,
    parent: Parents
}