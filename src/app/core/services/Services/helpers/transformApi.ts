
import { ApiServices } from "src/app/core/models/Services/api/apiServiceModel";
import { Services } from "src/app/core/models/Services/transformed/ServiceModel";



export function transformDataService(service: ApiServices): Services {
    delete service.__v
    delete service.createdAt;
    delete service.updatedAt;
    return service;
}