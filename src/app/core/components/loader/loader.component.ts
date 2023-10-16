import { Component } from '@angular/core';
import { LoadingService } from '../../services/Loading/loading.service';

@Component({
  selector: 'app-loader',
  styleUrls: ['./loader.component.scss'],
  templateUrl: './loader.component.html',
})
export class LoaderComponent {
  public showLoading: boolean = false;

  constructor(private loadingService: LoadingService) {
    this.loadingService.shouldShowLoading$.subscribe((value) => {
      this.showLoading = value;
    });
  }
}
