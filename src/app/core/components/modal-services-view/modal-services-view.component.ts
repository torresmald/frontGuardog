import { Component, OnInit, Renderer2 } from '@angular/core';
import { ServicesService } from '../../services/Services/servicesService.service';
import { Services } from '../../models/Services/transformed/ServiceModel';
import { CourierService } from '../../services/courier/courier.service';
import {DomSanitizer} from "@angular/platform-browser";


@Component({
  selector: 'app-modal-services-view',
  templateUrl: './modal-services-view.component.html',
  styleUrls: ['./modal-services-view.component.scss'],
})
export class ModalServicesViewComponent implements OnInit{

  public service: Services | null = null;

  constructor(private serviceService: ServicesService,
    private courierService: CourierService,
    private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'block-scroll');

    this.serviceService
    .getSelectService()
    .subscribe((value) => (this.service = value));    
  }


  closeModalService(): void {
    this.courierService.setServiceModalView(false);
    this.renderer.removeClass(document.body, 'block-scroll');
  }
  
}
