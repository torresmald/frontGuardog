import {Component, HostListener, OnInit} from '@angular/core';
import {CourierService} from '../../services/courier/courier.service';
import {UsersService} from '../../services/Users/usersService.service';
import {Router} from '@angular/router';
import {Services} from '../../models/Services/transformed/ServiceModel';
import {CartService} from '../../services/Cart/cart.service';
import {registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es';
import {TimeoutConfig} from 'rxjs';
import {LocalStorageService} from "../../services/LocalStorage/local-storage.service";

registerLocaleData(localeEs, 'es');


const TOKEN_KEY = 'user'
const TOKEN_KEY_CART = 'cart'
const dataStorage = localStorage.getItem(TOKEN_KEY_CART)
const dataParsed = dataStorage ? JSON.parse(dataStorage) : null

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    public isLightMode: boolean = true;
    public scrollNav: boolean = false;
    public isLogged: boolean = false;
    public isParent: boolean = false;
    public servicesInCart: Services[] = []
    public numberInCart: number = 0
    public showFixedCart: boolean = false;
    public isHover: boolean = false;
    public totalAmount: number = 0
    public timeHoverMenu?: ReturnType<typeof setTimeout>;


    @HostListener('window:scroll', ['$event'])
    onScroll(): void {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercentage >= 20) this.scrollNav = true;
        else this.scrollNav = false;
        this.showFixedCart = window.scrollY > 100;
    }

    constructor(public courierService: CourierService, private usersService: UsersService, public router: Router, private localStorageService: LocalStorageService) {
    }

    ngOnInit(): void {
        this.localStorageService.getLocalStorage().subscribe(value => {
            this.servicesInCart = value || [];
            this.numberInCart = this.servicesInCart.length;
        });
        this.usersService.userLogged$.subscribe((value) => {
            this.isLogged = value
        })
    }

    public openMenuMobile() {
        this.courierService.setBooleanNav(true);
    }

    public onLogout() {
        this.usersService.logout()
        this.router.navigate([''])
    }

    public onNavigateAccount() {
        const token = localStorage.getItem(TOKEN_KEY)
        if (token) {
            JSON.parse(token).user.pets ? this.isParent = true : this.isParent = false
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
