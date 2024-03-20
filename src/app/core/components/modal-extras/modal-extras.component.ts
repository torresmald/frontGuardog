import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-modal-extras',
  templateUrl: './modal-extras.component.html',
  styleUrls: ['./modal-extras.component.scss'],
})
export class ModalExtrasComponent implements OnInit{
  public isLightMode: boolean = false;
  public language: string = 'es';
  public lang?: string;
  public langs: string[] = [];
  public theme?: string 


  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
    translate.use('es'), this.translate.addLangs(['es', 'en']);
    this.langs = this.translate.getLangs();
    this.lang = this.translate.currentLang;
  }
  ngOnInit(): void {
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const userPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    if (userPrefersDark) {
      this.theme = 'dark'
    }
    if (userPrefersLight) {
      this.theme = 'light'
    }
  }
  public onChangeLanguage() {
    this.lang === 'es' ? this.lang = 'en' : this.lang = 'es'
    this.translate.use (this.lang);
  }

  public changeTheme() {
    this.isLightMode = !this.isLightMode;
    if(this.theme === 'dark'){
      document.documentElement.className = 'light';
      this.theme = 'light'

    }else {
      document.documentElement.className = 'dark';
      this.theme = 'dark'
    }
    console.log(this.theme);
    
  }
  
  public setThema() {
    

   
  }
}
