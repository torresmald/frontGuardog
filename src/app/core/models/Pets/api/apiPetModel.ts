import { ApiParents } from "../../Parents/api/apiParentModel"
import { nutrition, exercise } from "../petsData"

export interface ApiPets{
    _id: string,
    name: string,
    image: string,
    birthday: string,
    nutrition: nutrition,
    diseases: string,
    exercise: exercise,
    maxNumberGifts: Number,
    __v?: string,
    createdAt?: string,
    updatedAt?: string
    parent: ApiParents
}


