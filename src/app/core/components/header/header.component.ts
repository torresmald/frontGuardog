import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isMobile: boolean = false;
  public isLightMode: boolean = true;
  public theme?: string;
  public language: string = 'es';
  public scrollNav: boolean = false
  public animationAllowed: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const windowHeight = window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY;
    const scrollPercentage = (scrollPosition / (pageHeight - windowHeight)) * 100;
    if (scrollPercentage >= 20) 
      this.scrollNav = true;
    else
      this.scrollNav = false
  }   

  ngOnInit(): void {
    const userPrefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    const userPrefersLight =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: light)').matches;
    if (userPrefersDark) {
      this.theme = 'dark';
    }
    if (userPrefersLight) {
      this.theme = 'light';
    }
  }

  public openMenuMobile() {
    this.isMobile = !this.isMobile;
  }

  public onChangeTheme() {
    this.isLightMode = !this.isLightMode;
    console.log(this.isLightMode);
  }
  public onChangeLanguage() {
    if (this.language === 'es') {
      this.language = 'uk'
    } else {
      this.language = 'es'
    }
    console.log(this.language);
  }
}
