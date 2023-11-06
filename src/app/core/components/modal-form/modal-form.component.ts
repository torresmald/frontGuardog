import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/Modal/modal.service';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss'],
})
export class ModalFormComponent implements OnInit {
  public shouldShowModal?: boolean;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.modalService.$shoulShowModal.subscribe((value) => {
      this.shouldShowModal = value;
      console.log(this.shouldShowModal);
      
    });
  }

  public onCloseModal() {
    this.modalService.closeModal()
  }
}
