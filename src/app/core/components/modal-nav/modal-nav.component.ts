import { Component, HostListener, OnInit } from '@angular/core';
import { CourierService } from '../../services/courier/courier.service';
import { NavigationEnd, Router } from '@angular/router';
import {UsersService} from "../../services/Users/usersService.service";

@Component({
  selector: 'app-modal-nav',
  templateUrl: './modal-nav.component.html',
  styleUrls: ['./modal-nav.component.scss']
})
export class ModalNavComponent implements OnInit {
  public isLightMode: boolean = true;
  public modalAnimation: boolean = false;
  public isParent: boolean = false;
  public isLogged: boolean = false;


  @HostListener('window:resize', ['$event'])
  onResize(): void {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 769) {
      this.closeMenuMobile()
    }
  }

  constructor(public courierService: CourierService, private _router: Router, private usersService: UsersService) {}

  ngOnInit(): void {
    this.courierService.getModalNav().subscribe(value =>  this.modalAnimation = value)
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.closeMenuMobile()
      }
    })
    this.usersService.userLogged$.subscribe((value) => {
      this.isLogged = value
    })
  }

  public closeMenuMobile() {
    this.modalAnimation = false
    setTimeout(() => {
      this.courierService.setBooleanNav(false)
    }, 400);
  }

  public stopPropagation(event: Event) {
    event.stopPropagation();
  }

  public onLogout() {
    this.usersService.logout()
    this._router.navigate([''])
  }

  public onNavigateAccount() {
    const token = localStorage.getItem('user') // TODO evaluar si usar una variable de entorno para el token
    if (token) {
      JSON.parse(token).user.pets ? this.isParent = true : this.isParent = false
    }
    this.isParent ? this._router.navigate(['/parent-view']) : this._router.navigate(['/trainer-view'])
  }


  // public changeTheme() {
  //
  //   this.isLightMode = !this.isLightMode;
  //   console.log(this.isLightMode);
  //
  // }

}
