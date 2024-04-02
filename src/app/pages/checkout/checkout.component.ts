import { Component, OnInit } from '@angular/core';
import { Services } from 'src/app/core/models/Services/transformed/ServiceModel';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { CartService } from '../../core/services/Cart/cart.service';
import { CouponsService } from 'src/app/core/services/Coupons/coupons.service';
import { ToastService } from 'src/app/core/services/Toast/toast.service';
import { AppointmentsService } from 'src/app/core/services/Appointmet/appointmentsService.service';
import { ModalService } from 'src/app/core/services/Modal/modal.service';
import { LoadingService } from 'src/app/core/services/Loading/loading.service';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
import { NavigationService } from 'src/app/core/services/Navigation/navigation.service';

registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: [],
})
export class CheckoutComponent implements OnInit {
  public servicesInCart: Services[] = [];
  public petImage?: string;
  public subTotal: number = 0;
  public total: number = 0;
  public taxes: number = 0;
  public coupon: string = '';
  public discount: number = 0;
  public servicesAddedToCart: Services[] = [];
  public isValidCoupon?: boolean = true;
  public date?: Date;

  constructor(
    private cartService: CartService,
    private couponsService: CouponsService,
    private toastService: ToastService,
    private appointmentsService: AppointmentsService,
    private modalService: ModalService,
    private loadingService: LoadingService,
    private localStorageService: LocalStorageService,
    private navigationService: NavigationService
  ) {}
  ngOnInit(): void {
    this.servicesInCart = this.cartService.getCartServices();
    this.cartService.getSubtotalAmount().subscribe(
      (value) => (this.subTotal = value)
    );
    this.cartService.getTaxes().subscribe((value) => (this.taxes = value));
    this.cartService.getTotalAmount().subscribe(
      (value) => (this.total = value)
    );
    // TODO del servicio
    const dataStorage = this.localStorageService.getLocalItem(this.localStorageService.TOKEN_KEY_CART)
    this.servicesAddedToCart = dataStorage ? JSON.parse(dataStorage) : null;
  }
  public onApplyCoupon(coupon: string) {
    this.couponsService.getDailyCoupon().subscribe((value) => {
      if (coupon === value.name) {
        this.discount = value.discount;
        this.isValidCoupon = true;
      } else {
        this.isValidCoupon = false;
        this.coupon = '';
      }
      if (this.discount) {
        // TODO ver descuentos
        this.cartService.getSubtotalAmount().subscribe(
          (value) => (this.subTotal = value - (value * this.discount) / 100)
        );
        this.cartService.getTaxes().subscribe((value) => value);
        this.cartService.getTotalAmount().subscribe(
          (value) => (this.total = this.subTotal + this.taxes)
        );
        this.toastService.$message?.next('Cupon Aplicado');
        this.toastService.showToast();
        setTimeout(() => {
          this.toastService.closeToast();
        }, 2000);
      }
    });
  }

  public onSubmit() {
    const dataStorage = this.localStorageService.getLocalItem(this.localStorageService.TOKEN_KEY_USER)
    const user = dataStorage ? JSON.parse(dataStorage).user._id : null;
    const data = this.servicesInCart.map((services) => {
      return {
        _id: services._id,
        date: services.date,
        hour: services.hour,
        parent: user,
        trainer:services.trainer,
        services,
        totalPaidReal: this.total,
        totalPay: this.subTotal,
        discounts: this.discount,
      };
    });
    this.appointmentsService.registerAppointment(data).subscribe((value) => {
      if (value) {
        this.loadingService.showLoading();
        setTimeout(() => {
          this.loadingService.hideLoading();
          this.modalService.$message?.next('Compra realizada con Éxito');
          this.modalService.showModal();
          this.cartService.removeAllServices('cart')
          this.localStorageService.getLocalStorage().subscribe(value => {
            this.servicesInCart = value || [];
        });
          this.servicesAddedToCart = [];
          this.navigationService.onNavigate('/parent-view')
        }, 3000);
      }
    });
  }
}
