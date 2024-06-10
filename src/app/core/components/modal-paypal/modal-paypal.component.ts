import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Services } from '../../models/Services/transformed/ServiceModel';
import { AppointmentsService } from '../../services/Appointmet/appointmentsService.service';
import { CartService } from '../../services/Cart/cart.service';
import { LoadingService } from '../../services/Loading/loading.service';
import { LocalStorageService } from '../../services/LocalStorage/local-storage.service';
import { NavigationService } from '../../services/Navigation/navigation.service';
import { StripeService } from '../../services/Stripe/stripe.service';
import { ModalService } from '../../services/Modal/modal.service';
import { Parents } from '../../models/Parents/transformed/ParentModel';
import { Observable } from 'rxjs';
import { PaypalService } from '../../services/Paypal/paypal.service';
import { reference } from '@popperjs/core';

interface DataStripe {
  description: Parents;
  totalAmount: number;
}

@Component({
  selector: 'app-modal-paypal',
  templateUrl: './modal-paypal.component.html',
  styleUrls: ['./modal-paypal.component.scss'],
})
export class ModalPaypalComponent implements OnInit, AfterViewInit {
  constructor(
    private appointmentsService: AppointmentsService,
    private loadingService: LoadingService,
    private modalService: ModalService,
    private cartService: CartService,
    private localStorageService: LocalStorageService,
    private navigationService: NavigationService,
    private paypalService: PaypalService
  ) {}

  ngOnInit(): void {
    this.shouldShowModal = this.modalService.$shoulShowModalCheckout;
    this.localStorageService.getLocalStorage().subscribe((value) => {
      console.log(value);
      this.servicesInCart = value || [];
    });
  }
  ngAfterViewInit(): void {
    this.paypal = paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          console.log(this.transformServices());
          
          return actions.order.create({
             purchase_units: this.transformServices(),
          });
        },
        onApprove: async (data: any, actions: any) => {
          const order = await actions.order.capture();
          console.log(order)
          this.onCreateTransaction(order);
        },
        onError: (err: any) => {
          console.log(err);
        },
      })
      .render(this.paypalElement.nativeElement);
  }

  @ViewChild('paypal') public paypalElement!: ElementRef;
  public servicesInCart: Services[] = [];
  public paypal: any;
  public totalAmount: number = 0;
  public shouldShowModal?: Observable<boolean>;

  public async onCreateTransaction(order: any) {
    this.paypalService.createTransaction(order).subscribe({
      next: () => {
        this.navigationService.onNavigate('/checkout/confirmation');
      },
      error: (error) => {
        this.loadingService.hideLoading();
        console.log(error);
      },
    });
  }

  public onCloseModal(result: boolean) {
    this.modalService.closeModal();
    this.modalService.result$.next(result);
  }

  public transformServices() {
    const services = this.servicesInCart.map((service) => {
      return {
        description: 'Test',
        amount: {
          currency_code: 'EUR',
          value: service.totalPaidReal ?? 1,
        },
        reference_id: service._id
      };
    });
    return services;
  }

  public onSubmitPay() {
    this.appointmentsService
      .registerAppointment(this.servicesInCart)
      .subscribe((value) => {
        if (value) {
          this.loadingService.showLoading();
          setTimeout(() => {
            this.loadingService.hideLoading();
            this.modalService.$message?.next('Compra realizada con Éxito');
            this.modalService.showModal('other');
            this.cartService.removeAllServices('cart');
            this.localStorageService.getLocalStorage().subscribe((value) => {
              this.servicesInCart = value || [];
            });
            this.navigationService.onNavigate('/parent-view');
          }, 3000);
        }
      });
  }
}
