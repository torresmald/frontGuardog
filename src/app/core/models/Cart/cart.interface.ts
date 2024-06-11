import { Services } from "../Services/transformed/ServiceModel";
import { Trainers } from "../Trainers/transformed/TrainerModel";

export interface Cart {
    _id:           string;
    date:          Date;
    hour:          string;
    parent:        string;
    trainer:       Trainers;
    services:      Services;
    totalPaidReal: number;
    totalPay:      number;
    discounts:     number;
}
