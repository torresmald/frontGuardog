import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/Modal/modal.service';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss'],
})
export class ModalFormComponent implements OnInit {
  public shouldShowModal?: boolean;
  public message?: string;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.modalService.$shoulShowModal.subscribe((value) => {
      this.shouldShowModal = value;
    });
    this.modalService.$message?.subscribe((value) => {
      this.message = value;
    });
  }

  public onLeavePage(result: boolean) {
    console.log(result);
    this.modalService.closeModal(result);
  }
}
