import { Component, Input, OnInit } from '@angular/core';
import { Services } from 'src/app/core/models/Services/transformed/ServiceModel';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import {CourierService} from "../../../core/services/courier/courier.service";

registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent implements OnInit {
  @Input() service?: Services;
  @Input() servicesAddedToCart?: Services[];
  constructor(private courierService: CourierService) {}
  ngOnInit(): void {
  }
  openServiceModal(){
    this.courierService.setItemServiceModal(true)
  }

}
