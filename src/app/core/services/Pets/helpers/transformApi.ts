
import { ApiPets } from "src/app/core/models/Pets/api/apiPetModel";
import { Pets } from "src/app/core/models/Pets/transformed/PetModel";



export function transformDataPet(pet: ApiPets): Pets {
    delete pet.__v
    delete pet.createdAt;
    delete pet.updatedAt;
    return pet;
}