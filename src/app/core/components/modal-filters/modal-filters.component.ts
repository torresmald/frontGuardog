import { Component, EventEmitter, Output } from '@angular/core';
import { CourierService } from '../../services/Courier/courier.service';
import { Flowbite } from 'src/app/shared/helpers/decorator/flowbite.decorator';

@Component({
  selector: 'app-modal-filters',
  templateUrl: './modal-filters.component.html',
  styleUrls: ['./modal-filters.component.scss']
})

@Flowbite()

export class ModalFiltersComponent {
  constructor(private courierService: CourierService){}

  public onSortType(event: Event){
    const target = event.target as HTMLButtonElement;
    this.courierService.setSortType(target.value)
    this.courierService.setFiltersModal(false)
  }

  public onSortPrice(method: string){    
   this.courierService.setSortPrice(method)
   this.courierService.setFiltersModal(false)
  }

  public closeModalFilter(){
    this.courierService.setFiltersModal(false)
  }
}
