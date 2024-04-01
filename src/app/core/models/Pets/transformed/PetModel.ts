import { Parents } from "../../Parents/transformed/ParentModel"
import { Nutrition, Exercise } from "../petsData"
export interface Pets{
    _id: string,
    name: string,
    image: string,
    birthday: string,
    nutrition: Nutrition,
    diseases: string,
    exercise: Exercise,
    maxNumberGifts: number,
    parent: Parents
}