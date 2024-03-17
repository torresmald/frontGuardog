import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-modal-extras',
  templateUrl: './modal-extras.component.html',
  styleUrls: ['./modal-extras.component.scss'],
})
export class ModalExtrasComponent {
  public isLightMode: boolean = false;
  public language: string = 'es';
  public lang?: string;
  public langs: string[] = [];

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
    translate.use('es'), this.translate.addLangs(['es', 'en']);
    this.langs = this.translate.getLangs();
    this.lang = this.translate.currentLang;
  }

  public onChangeLanguage() {
    this.lang === 'es' ? this.lang = 'en' : this.lang = 'es'
    this.translate.use (this.lang);
  }

  public changeTheme() {
    this.isLightMode = !this.isLightMode;
  }
}
