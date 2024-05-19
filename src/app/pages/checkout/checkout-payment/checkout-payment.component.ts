import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Services } from 'src/app/core/models/Services/transformed/ServiceModel';
import { AppointmentsService } from 'src/app/core/services/Appointmet/appointmentsService.service';
import { CartService } from 'src/app/core/services/Cart/cart.service';
import { LoadingService } from 'src/app/core/services/Loading/loading.service';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
import { ModalService } from 'src/app/core/services/Modal/modal.service';
import { NavigationService } from 'src/app/core/services/Navigation/navigation.service';

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
    this.card.addEventListener('change', this.onChange)
  }
  @ViewChild('cardInfo') public cardInfo!: ElementRef
  public servicesInCart: Services[] = [];
  public servicesAddedToCart: Services[] = [];
  public card: any;
  private stripe: any;
  private elements: any;
  public onChange($event: any){
    console.log($event)
    
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
          this.servicesAddedToCart = [];
          this.navigationService.onNavigate('/parent-view');
        }, 3000);
      }
    });
  }
}
