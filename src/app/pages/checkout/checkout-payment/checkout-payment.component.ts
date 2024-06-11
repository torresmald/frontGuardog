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

// interface DataStripe {
//   description: Parents,
//   totalAmount: number
// }

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss'],
})
export class CheckoutPaymentComponent  {

  public openModal: string = '';
  constructor(
    private modalService: ModalService
  ) {}
  public onOpenModal(name :string){
    name == 'stripe' ? this.openModal = name : this.openModal = 'paypal'
    this.modalService.showModal('checkout')
  }
}
