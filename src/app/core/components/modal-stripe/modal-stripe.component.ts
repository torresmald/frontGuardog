import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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


interface DataStripe {
  description: Parents,
  totalAmount: number,
  customer: Parents
}

@Component({
  selector: 'app-modal-stripe',
  templateUrl: './modal-stripe.component.html',
  styleUrls: ['./modal-stripe.component.scss']
})
export class ModalStripeComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    private appointmentsService: AppointmentsService,
    private loadingService: LoadingService,
    private modalService: ModalService,
    private cartService: CartService,
    private localStorageService: LocalStorageService,
    private navigationService: NavigationService,
    private stripeService: StripeService

  ){}

  ngOnInit(): void {
    this.shouldShowModal = this.modalService.$shoulShowModalCheckout
    this.localStorageService.getLocalStorage().subscribe((value) => {
      this.servicesInCart = value || [];
    });
    this.totalAmount = this.getTotalAmount()

  }
  ngAfterViewInit(): void {
    this.card = elements.create('card')
    this.card.mount(this.cardInfo.nativeElement)
    this.card.addEventListener('change', this.onChange.bind(this))
  }

  ngOnDestroy(): void {
    this.card.destroy()
  }
  @ViewChild('cardInfo') public cardInfo!: ElementRef
  public servicesInCart: Services[] = [];
  public card: any;
  public cardError: string = ''
  public totalAmount: number = 0
  public shouldShowModal?:  Observable<boolean>


  public onChange(event: any){
    if(event.error) this.cardError = event.error.message
    
  }

  public onCloseModal(result: boolean) {    
    this.modalService.closeModal();
    this.modalService.result$.next(result); 
  }

  public async  onCreateTransaction(){

    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: this.card,
      });
      error ? this.cardError = error.message : ''
      const description = this.servicesInCart[0].parent
      const dataToStripe: DataStripe = {
        totalAmount: this.totalAmount,
        description: description!,
        customer: description!
      }
      
     this.stripeService.createTransaction(paymentMethod.id, dataToStripe).subscribe(value =>  this.stripeService.transactionData = value)
     this.onSubmitPay()
    } catch (error) {
      console.log(error);
    }
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
        setTimeout(() => {
          this.modalService.$message?.next('Compra realizada con Éxito');
          this.modalService.showModal('other');
          this.cartService.removeAllServices('cart');
          this.localStorageService.getLocalStorage().subscribe((value) => {
            this.servicesInCart = value || [];
          });
        }, 3000);
      }
    });
  }

}
