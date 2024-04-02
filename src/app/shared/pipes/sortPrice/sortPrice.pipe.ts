import { Pipe, PipeTransform } from '@angular/core';
import { Services } from 'src/app/core/models/Services/transformed/ServiceModel';

@Pipe({
  name: 'sortPrice',
  
})
export class SortPricePipe implements PipeTransform {
  transform(services: Services[] | null, condition?: string): Services[] | null {
    if (services === null) {
      return null;
    }
    if (condition === "ascendant"){
        return services.sort((a, b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0))
      } else{
        return services.sort((a, b) => (a.price > b.price) ? -1 : ((b.price > a.price) ? 1 : 0))
      }
  }
}
