import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pets } from 'src/app/core/models/Pets/transformed/PetModel';
import { PetsService } from 'src/app/core/services/Pets/petsService.service';
import { ModalService } from 'src/app/core/services/Modal/modal.service';
import { NavigationService } from 'src/app/core/services/Navigation/navigation.service';
import { Observable } from 'rxjs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
    this.img.src = '../../../assets/home/logo.png';
    
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF();
    const options = {
      background: 'white',
      scale: 3
    };    
    
    if(DATA)
    html2canvas(DATA, options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');

      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      // doc.addImage(this.img, 'PNG', 0, 0, 0, 0, undefined, 'FAST');
      doc.addImage(this.img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => { 
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });
  
  }
  public onDeletePet(id: string) {
    this.petsService.deletePets(id).subscribe((value) => {
      if (value) {
        this.modalService.$message?.next('Mascota Eliminada');
        this.modalService.showModal();
        setTimeout(() => {
          this.navigationService.onNavigate('/parent-view');
        }, 1000);
      }
    });
  }
}
