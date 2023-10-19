import { Injectable } from "@angular/core";
import { ApiPetsService } from "./api/ApiPetsService.service";
import { Observable, map, tap } from "rxjs";
import { Pets } from "../../models/Pets/transformed/PetModel";
import { LoadingService } from "../Loading/loading.service";
import { transformDataPet } from "./helpers/transformApi";

@Injectable({
    providedIn: 'root'
})
export class PetsService {

    constructor(private apiPetsService: ApiPetsService, private loadingService: LoadingService) {}

    public getPets ():Observable<Pets[]> {
        this.loadingService.showLoading()
        return this.apiPetsService.getApiPets().pipe(
           map((apiPets) => {
                return apiPets.map((apiPet) => {
                    return transformDataPet(apiPet)
                })
           }),
           tap(() => {
            this.loadingService.hideLoading()
           })
        )
    }

    public registerPets(body: Pets): Observable<Pets> {
        this.loadingService.showLoading()
        return this.apiPetsService.registerApiPets(body).pipe(
            map((apiPets) => {
                return transformDataPet(apiPets)
            }),
            tap(() => {
                this.loadingService.showLoading()
            })
        )
    }


    
}
