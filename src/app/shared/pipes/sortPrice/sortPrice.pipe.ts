import { Pipe, PipeTransform } from '@angular/core';
import { Services } from 'src/app/core/models/Services/transformed/ServiceModel';

@Pipe({
  name: 'sort-price',
})
export class SortPricePipe implements PipeTransform {
  transform(services: Services[], condition?: 'asc' | 'desc'): Services[] {
    if (!services) {
      return [];
    }
    if (!condition) {
      return services;
    }
    if (condition === "asc"){
        return services.sort((a, b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0))
      } else{
        return services.sort((a, b) => (a.price > b.price) ? -1 : ((b.price > a.price) ? 1 : 0))
      }
  }
}
