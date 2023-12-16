import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pets } from 'src/app/core/models/Pets/transformed/PetModel';
import { PetsService } from 'src/app/core/services/Pets/petsService.service';
import * as pdfMake from 'pdfmake/build/pdfmake'
import * as pdf_Fonts from 'pdfmake/build/vfs_fonts'

(pdfMake as any).vfs = pdf_Fonts.pdfMake.vfs
@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss']
})
export class PetComponent implements OnInit {
  public pet?: Pets
  public id: string = ''
  constructor(private petsService: PetsService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe((value) => {
      this.id = value['id']
      
    })
      this.petsService.getPet(this.id).subscribe((value) => {        
        this.pet = value
        console.log(this.pet)
      })
  }
  public onDownloadPet(){
    const documentDefinition = {
      content: [
        `${this.pet?.name}`,
      ],
      
    };
    pdfMake.createPdf(documentDefinition).open();
  }
}
