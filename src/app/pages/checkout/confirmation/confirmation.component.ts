import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/core/services/Navigation/navigation.service';
import { PaypalService } from 'src/app/core/services/Paypal/paypal.service';
import { StripeService } from 'src/app/core/services/Stripe/stripe.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  constructor(private navigationService: NavigationService,
    private paypalService: PaypalService,
    private stripeService: StripeService
  ){}

  public transactionDataPaypal: any
  public transactionData: any

  ngOnInit(): void {
      this.transactionDataPaypal = this.paypalService.transactionData
      this.transactionData = this.stripeService.transactionData
      
  }

  onNavigate(){
    this.navigationService.onNavigate('/')
  }

}
