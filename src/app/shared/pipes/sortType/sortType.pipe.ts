import { Pipe, PipeTransform } from '@angular/core';
import { Services } from 'src/app/core/models/Services/transformed/ServiceModel';

@Pipe({
  name: 'sortType',
})
export class SortTypePipe implements PipeTransform {
  transform(
    services: Services[] | null,
    condition?: string
  ): Services[] | null {
    if (services === null) {
      return null;
    }
    if(!condition || condition === 'default') return services    
    switch (condition) {
      case 'paseo':
        return services.filter((service) => service.type === condition);
      case 'higiene':
        return services.filter((service) => service.type === condition);
      case 'cuidados':
        return services.filter((service) => service.type === condition);
      case 'entrenamiento':
        return services.filter((service) => service.type === condition);
    }
    return null
  }
}
