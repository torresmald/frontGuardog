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
        // this.loadingService.showLoading()
        return this.apiPetsService.getApiPets().pipe(
           map((apiPets) => {
                return apiPets.map((apiPet) => {
                    return transformDataPet(apiPet)
                })
           }),
           tap(() => {
            // this.loadingService.hideLoading()
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

    public registerPets(body: FormData): Observable<Pets> {
        this.loadingService.showLoading()
        return this.apiPetsService.registerApiPets(body).pipe(
            map((apiPets) => {
                return transformDataPet(apiPets)
            }),
            tap(() => {
                this.loadingService.hideLoading()
            })
        )
    }

    public deletePets(id: string): Observable<string> {
        this.loadingService.showLoading()
        return this.apiPetsService.deleteApiPets(id).pipe(
            map((apiPets) => {
                return apiPets
            }),
            tap(() => {
                this.loadingService.hideLoading()
            })
        )
    }



}
