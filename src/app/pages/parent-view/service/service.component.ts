import {Component, Input, OnInit} from '@angular/core';
import {Services} from 'src/app/core/models/Services/transformed/ServiceModel';
import {CourierService} from "../../../core/services/courier/courier.service";
import {ServicesService} from "../../../core/services/Services/servicesService.service";

@Component({
    selector: 'app-service',
    templateUrl: './service.component.html',
    styleUrls: ['./service.component.scss'],
})
export class ServiceComponent implements OnInit {
    @Input() service?: Services;
    @Input() servicesAddedToCart: Services[];
    public isServiceInCart: Boolean = false

    constructor(
        private serviceService: ServicesService,
        private courierService: CourierService,
    ) {
        this.servicesAddedToCart = []
    }

    ngOnInit() {
        this.servicesAddedToCart?.find(value => this.isServiceInCart = value._id === this.service?._id);       
        this.courierService.updateServiceInCart(this.service?._id, this.isServiceInCart);
        this.courierService.getServiceInCart().subscribe(value => {            
            if (this.service) {
                this.isServiceInCart = value[this.service?._id];
            }
        });
    }
    openServiceModal(service: Services) {
        this.serviceService.setSelectService(service)
        this.courierService.setItemServiceModal(true)
    }
    openServiceModalView(service: Services) {
        this.serviceService.setSelectService(service)
        this.courierService.setServiceModalView(true)
    }

}
