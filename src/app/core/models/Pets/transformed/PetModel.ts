import { Parents } from "../../Parents/transformed/ParentModel"
import { nutrition, exercise } from "../petsData"
export interface Pets{
    name: String,
    image: String,
    birthday: String,
    nutrition: nutrition,
    diseases: String,
    exercise: exercise,
    maxNumberGifts: Number,
    parent: Parents

}