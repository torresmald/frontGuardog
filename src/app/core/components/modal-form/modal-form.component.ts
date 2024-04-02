import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/Modal/modal.service';
import { UsersService } from '../../services/Users/usersService.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: [],
})
export class ModalFormComponent implements OnInit {
  public shouldShowModal?:  Observable<boolean>
  public message?: Observable<string>
  public isLogged?: Observable<boolean>

  constructor(private modalService: ModalService, private usersService:UsersService) {}

  ngOnInit(): void {
    this.shouldShowModal = this.modalService.$shoulShowModal
    this.message = this.modalService.$message
    this.isLogged = this.usersService.userLogged$
  }

  public onLeavePage(result: boolean) {
    this.modalService.closeModal();
    this.modalService.result$.next(result); 
  }
}
