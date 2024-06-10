import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/core/services/Navigation/navigation.service';
import { PaypalService } from 'src/app/core/services/Paypal/paypal.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  constructor(private navigationService: NavigationService,
    private paypalService: PaypalService
  ){

  }

  public transactionData: any

  ngOnInit(): void {
      this.transactionData = this.paypalService.transactionData
      console.log(this.transactionData);
      
  }

  onNavigate(){
    this.navigationService.onNavigate('/')
  }

}
