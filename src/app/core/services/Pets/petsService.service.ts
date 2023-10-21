import { Injectable } from "@angular/core";
import { ApiPetsService } from "./api/ApiPetsService.service";
import { Observable, map, tap } from "rxjs";
import { Pets } from "../../models/Pets/transformed/PetModel";
import { LoadingService } from "../Loading/loading.service";
import { transformDataPet } from "./helpers/transformApi";
import { ApiPets } from "../../models/Pets/api/apiPetModel";

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

    public getPet (id:string):Observable<Pets> {
        this.loadingService.showLoading()
        return this.apiPetsService.getApiPet(id).pipe(
           map((apiPets) => {
                return transformDataPet(apiPets)
           }),
           tap(() => {
            this.loadingService.hideLoading()
           })
        )
    }

    public registerPets(body: ApiPets): Observable<Pets> {
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
