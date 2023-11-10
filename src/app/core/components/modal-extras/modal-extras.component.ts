import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-extras',
  templateUrl: './modal-extras.component.html',
  styleUrls: ['./modal-extras.component.scss']
})
export class ModalExtrasComponent {

  public isLightMode: boolean = false;
  public language: string = 'es';

  public onChangeLanguage() {
    if (this.language === 'es') {
      this.language = 'uk';
    } else {
      this.language = 'es';
    }
    console.log(this.language);
  }

  public changeTheme(){
    this.isLightMode = !this.isLightMode
  }

}
