import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/Loading/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loader',
  styleUrls: ['./loader.component.scss'],
  templateUrl: './loader.component.html',
})
export class LoaderComponent implements OnInit {
  public showLoading: Observable<boolean> = new Observable<boolean>();

  constructor(private loadingService: LoadingService) {
  }
  ngOnInit(): void {
    this.showLoading = this.loadingService.shouldShowLoading$
  }
}
