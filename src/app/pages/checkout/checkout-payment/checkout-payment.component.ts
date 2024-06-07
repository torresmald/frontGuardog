import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Parents } from 'src/app/core/models/Parents/transformed/ParentModel';
import { Services } from 'src/app/core/models/Services/transformed/ServiceModel';
import { AppointmentsService } from 'src/app/core/services/Appointmet/appointmentsService.service';
import { CartService } from 'src/app/core/services/Cart/cart.service';
import { LoadingService } from 'src/app/core/services/Loading/loading.service';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
import { ModalService } from 'src/app/core/services/Modal/modal.service';
import { NavigationService } from 'src/app/core/services/Navigation/navigation.service';
import { StripeService } from 'src/app/core/services/Stripe/stripe.service';

interface DataStripe {
  description: Parents,
  totalAmount: number
}

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss'],
})
export class CheckoutPaymentComponent implements OnInit, AfterViewInit {
  constructor(
    private appointmentsService: AppointmentsService,
    private loadingService: LoadingService,
    private modalService: ModalService,
    private cartService: CartService,
    private localStorageService: LocalStorageService,
    private navigationService: NavigationService,
    private stripeService: StripeService
  ) {}
  ngOnInit(): void {
    this.localStorageService.getLocalStorage().subscribe((value) => {
      console.log(value);
      this.servicesInCart = value || [];
    });
  }
  ngAfterViewInit(): void {
    this.card = elements.create('card')
    this.card.mount(this.cardInfo.nativeElement)
    this.card.addEventListener('change', this.onChange.bind(this))
  }
  @ViewChild('cardInfo') public cardInfo!: ElementRef
  public servicesInCart: Services[] = [];
  public card: any;
  public cardError: string = ''
  public totalAmount: number = 0

  public onChange(event: any){
    console.log(event)
    if(event.error) this.cardError = event.error.message
    
  }

  public async  onCreateTransaction(){
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: this.card,
    });
    error ? this.cardError = error.message : ''
    this.totalAmount = this.getTotalAmount()
    const description = this.servicesInCart[0].parent
    const dataToStripe: DataStripe = {
      totalAmount: this.totalAmount,
      description: description!
    }
    
    this.stripeService.createTransaction(paymentMethod.id, dataToStripe).subscribe()
  }

  public getTotalAmount(){
    console.log(this.servicesInCart);
    const total = this.servicesInCart.reduce((acc, current) => {      
      return acc + current.totalPaidReal
    }, 0)
    return total
  }

  public onSubmitPay() {
    this.appointmentsService.registerAppointment(this.servicesInCart).subscribe((value) => {
      if (value) {
        this.loadingService.showLoading();
        setTimeout(() => {
          this.loadingService.hideLoading();
          this.modalService.$message?.next('Compra realizada con Éxito');
          this.modalService.showModal();
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
