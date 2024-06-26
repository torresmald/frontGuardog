import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pets } from 'src/app/core/models/Pets/transformed/PetModel';
import { PetsService } from 'src/app/core/services/Pets/petsService.service';
import { ModalService } from 'src/app/core/services/Modal/modal.service';
import { NavigationService } from 'src/app/core/services/Navigation/navigation.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: [],
})
export class PetComponent implements OnInit {
  public pet?: Observable<Pets>;
  public id: string = '';
  public img = new Image();

  constructor(
    private petsService: PetsService,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((value) => {
      this.id = value['id'];
    });
    this.pet = this.petsService.getPet(this.id);
  }

  // TODO Arreglar esto del PDF
  public onDownloadPet(pet:Pets) {
  
  }
  public onDeletePet(id: string) {
    this.petsService.deletePets(id).subscribe((value) => {
      if (value) {
        this.modalService.$message?.next('Mascota Eliminada');
        this.modalService.showModal('other');
        setTimeout(() => {
          this.navigationService.onNavigate('/parent-view');
        }, 1000);
      }
    });
  }
}
