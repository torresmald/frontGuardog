import { Component, OnInit, Renderer2 } from '@angular/core';
import { ServicesService } from '../../services/Services/servicesService.service';
import { Services } from '../../models/Services/transformed/ServiceModel';
import { CourierService } from '../../services/courier/courier.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-modal-services-view',
  templateUrl: './modal-services-view.component.html',
  styleUrls: [],
})
export class ModalServicesViewComponent implements OnInit{

  public service!: Observable<Services | null>;

  constructor(private serviceService: ServicesService,
    private courierService: CourierService,
    private renderer: Renderer2) {}


    // TODO: TERMINAR VISTA
  ngOnInit(): void {
    this.renderer.addClass(document.body, 'block-scroll');

    this.service = this.serviceService
    .getSelectService()
  }


  closeModalService(): void {
    this.courierService.setServiceModalView(false);
    this.renderer.removeClass(document.body, 'block-scroll');
  }
  
}
