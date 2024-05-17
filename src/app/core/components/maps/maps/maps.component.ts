import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { Map, LngLat, Marker } from 'mapbox-gl';
import { Trainers } from 'src/app/core/models/Trainers/transformed/TrainerModel';
import { Observable } from 'rxjs';
import { TrainerService } from 'src/app/core/services/Trainers/trainersService.service';

(mapboxgl as any).accessToken = environment.apiMapboxKey;

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements AfterViewInit, OnDestroy {
  constructor(private trainersService: TrainerService) {}

  public trainers!: Trainers[];
  @ViewChild('map') public divMap?: ElementRef;
  public zoom: number = 12;
  public map?: Map;
  public lngLat: LngLat = new LngLat(-3.6795450239783873, 40.189412710967794);
  public color!: string;
  public trainerInfo: mapboxgl.Popup = new mapboxgl.Popup();

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'El elemento no fue encontrado';
    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat,
      zoom: this.zoom,
    });
    this.trainersService.getTrainers().subscribe((trainers: Trainers[]) => {
      this.trainers = trainers;
      trainers.forEach((trainer: Trainers) => {
        this.addMarker(trainer);
      });
    });
  }
  public addMarker(trainer: Trainers) {
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    this.color = color;
    this.trainerInfo = new mapboxgl.Popup().setHTML(`<h2>${trainer.name}</h2><br><span>Experience: ${trainer.experience}</span>`);
    const imageHtml = document.createElement('img');
    imageHtml.src = trainer.image;
    imageHtml.style.width = '50px';
    imageHtml.style.borderRadius = '9999px';
    const marker = new Marker({ color, element: imageHtml, })
      .setLngLat(trainer.location)
      .setPopup(this.trainerInfo)
      .addTo(this.map!);
    console.log(marker.getPopup());
  }

  onChangeZoom(method: string) {
    method === 'minus' ? this.map!.zoomOut() : this.map!.zoomIn();
  }

  public listenersMap() {
    this.map?.on('zoom', (event) => {
      if (this.map) this.zoom = this.map?.getZoom();
    });

    this.map?.on('move', () => {
      if (!this.map) return;
      this.lngLat = this.map.getCenter();
    });
  }

  public zoomChanged(value: string) {
    this.map?.zoomTo(Number(value));
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }
}
