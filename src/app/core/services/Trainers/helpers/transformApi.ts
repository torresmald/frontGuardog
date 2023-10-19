import { ApiTrainers } from "src/app/core/models/Trainers/api/apiTrainerModel";
import { Trainers } from "src/app/core/models/Trainers/transformed/TrainerModel";



export function transformDataTrainer(trainer: ApiTrainers): Trainers {
    delete trainer.__v
    delete trainer.createdAt;
    delete trainer.updatedAt;
    return trainer;
}