import {Component, HostListener, OnInit} from '@angular/core';
import {CourierService} from '../../services/courier/courier.service';
import {UsersService} from '../../services/Users/usersService.service';
import {Router} from '@angular/router';
import {Services} from '../../models/Services/transformed/ServiceModel';
import {registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es';
import {LocalStorageService} from "../../services/LocalStorage/local-storage.service";
import { CartService } from '../../services/Cart/cart.service';

registerLocaleData(localeEs, 'es');

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    // public isLightMode: boolean = true;
    public token?: string;
    public id?: string;
    public scrollNav: boolean = false;
    public isLogged: boolean = false;
    public isParent: boolean = false;
    public servicesInCart: Services[] = []
    public numberInCart: number = 0
    public showFixedCart: boolean = false;
    public timeHoverMenu?: ReturnType<typeof setTimeout>;


    @HostListener('window:scroll', ['$event'])
    onScroll(): void {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        this.scrollNav = scrollPercentage >= 20;
        this.showFixedCart = window.scrollY > 100;
    }

    constructor(public courierService: CourierService,
                private usersService: UsersService,
                public router: Router,
                private localStorageService: LocalStorageService, private cartService: CartService) {}
    ngOnInit(): void {
        this.servicesInCart = this.cartService.getCartServices();

        this.localStorageService.getLocalStorage().subscribe(value => {
            this.servicesInCart = value || [];
            this.numberInCart = this.servicesInCart.length;            
        });
        this.usersService.userLogged$.subscribe((value) => {
            this.isLogged = value
        })
        const token = localStorage.getItem('user') 
        if (token) {
            JSON.parse(token).user.pets ? this.isParent = true : this.isParent = false
        }
    }

    public openMenuMobile() {
        this.courierService.setBooleanNav(true);
    }

    public onLogout() {
        this.usersService.logout()
        this.router.navigate([''])
    }

    public onNavigateAccount() {
        this.token = this.localStorageService.TOKEN_KEY_USER;
        const storedValue: string | null = localStorage.getItem(this.token);
        const parsedValue = storedValue ? JSON.parse(storedValue) : null;
        this.id = parsedValue.user._id
        this.router.navigate([`/my-account/${this.id}`])
    }

                
    public onNavigateServices() {
        this.token = this.localStorageService.TOKEN_KEY_USER;
        const storedValue = localStorage.getItem(this.token);
        if (storedValue) {
            JSON.parse(storedValue).user.pets ? this.isParent = true : this.isParent = false
        }
        this.isParent ? this.router.navigate(['/parent-view']) : this.router.navigate(['/trainer-view'])
    }
    public onChangeHover() {
        if (this.servicesInCart.length >= 1) {
            this.timeHoverMenu = setTimeout(() => {
                this.courierService.setCartModal(true);
            }, 1000);
        }
    }

    public onHoverLeave() {
        clearTimeout(this.timeHoverMenu);
    }
}
