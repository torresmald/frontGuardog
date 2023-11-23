import { Component, Input, OnInit } from '@angular/core';
import { Services } from 'src/app/core/models/Services/transformed/ServiceModel';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { ServicesService } from 'src/app/core/services/Services/servicesService.service';

registerLocaleData(localeEs, 'es');
const TOKEN_KEY_CART = 'cart'

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent implements OnInit {
  @Input() service?: Services;
  @Input() servicesAddedToCart?: Services[];

  public changeStyles?: boolean;

  constructor(private servicesService: ServicesService) {}

  ngOnInit(): void {
    const dataStorage = localStorage.getItem(TOKEN_KEY_CART)
    const dataParsed = dataStorage ? JSON.parse(dataStorage) : null
    this.servicesService.stylesImage.subscribe((value) => {
      if (value.name === this.service?.name) {
        this.changeStyles = true;
      }
    });
    this.servicesAddedToCart?.map((service) => {
      if (service._id === this.service?._id) {
        this.changeStyles = true;
      }
    });
  }
}
