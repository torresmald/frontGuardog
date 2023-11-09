import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/Modal/modal.service';
import { UsersService } from '../../services/Users/usersService.service';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss'],
})
export class ModalFormComponent implements OnInit {
  public shouldShowModal?: boolean;
  public message?: string;
  public isLogged: boolean = false;

  constructor(private modalService: ModalService, private usersService:UsersService) {}

  ngOnInit(): void {
    this.modalService.$shoulShowModal.subscribe((value) => {
      this.shouldShowModal = value;
    });
    this.modalService.$message?.subscribe((value) => {      
      this.message = value;
    });
    this.usersService.userLogged$.subscribe((value) => {
      this.isLogged = value
    })
  }

  public onLeavePage(result: boolean) {
    this.modalService.closeModal();
    this.modalService.result$.next(result); 
  }
}
