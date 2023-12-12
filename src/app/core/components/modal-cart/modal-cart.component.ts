import {
    Component,
    HostListener,
    OnInit,
    Renderer2,
} from '@angular/core';
import {Services} from '../../models/Services/transformed/ServiceModel';
import {CartService} from '../../services/Cart/cart.service';
import {CourierService} from '../../services/courier/courier.service';
import {NavigationEnd, Router} from '@angular/router';
import {LocalStorageService} from "../../services/LocalStorage/local-storage.service";

@Component({
    selector: 'app-modal-cart',
    templateUrl: './modal-cart.component.html',
    styleUrls: ['./modal-cart.component.scss'],
})
export class ModalCartComponent implements OnInit {

    public servicesInCart: Services[] = [];
    public totalAmount: number = 0;
    public isHover?: boolean = false
    public scrollEvent: number = 0;

    constructor(
        private _router: Router,
        private cartService: CartService,
        private courierService: CourierService,
        private renderer: Renderer2,
        private localStorageService: LocalStorageService
    )
    {
        localStorageService.getLocalStorage().subscribe(value => this.servicesInCart = value || [])
        cartService.getTotalAmount().subscribe( value => this.totalAmount = value);
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(): void {
        this.scrollEvent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    }

    ngOnInit(): void {
        this.courierService.getCartModal().subscribe((value) => {
            this.isHover = value
            if (this.isHover)
                this.renderer.addClass(document.body, 'block-scroll');
            else
                this.renderer.removeClass(document.body, 'block-scroll')
        })
        this._router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.closeCartModal();
                this.scrollEvent = 0;
            }
        })
    }

    public onRemoveService(service: Services) {
        console.log(service);
        
        service.date = '';
        service.pet = '';
        service._id = ''
        if (service)
            this.courierService.updateServiceInCart(service?._id, false);
        this.cartService.removeServiceToCart(service);
    }

    public closeCartModal() {
        this.courierService.setCartModal(false)
    }
}
