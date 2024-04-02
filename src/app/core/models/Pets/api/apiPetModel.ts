import { ApiParents } from "../../Parents/api/apiParentModel"
import { Nutrition, Exercise } from "../petsData"

export interface ApiPets{
    _id: string,
    name: string,
    image: string,
    birthday: string,
    nutrition: Nutrition,
    diseases: string,
    exercise: Exercise,
    maxNumberGifts: number,
    __v?: string,
    createdAt?: string,
    updatedAt?: string
    parent: ApiParents
}


