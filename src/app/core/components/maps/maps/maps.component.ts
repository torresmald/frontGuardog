import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { Map, LngLat, Marker, Popup } from 'mapbox-gl';
import { Trainers } from 'src/app/core/models/Trainers/transformed/TrainerModel';
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
  constructor(
    private trainersService: TrainerService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  public trainers!: Trainers[];
  @ViewChild('map') public divMap?: ElementRef;
  @ViewChild('divPopup') public divPopup!: ElementRef;
  public zoom: number = 12;
  public map?: Map;
  public marker?: Marker;
  public popUp?: Popup;
  public lngLat: LngLat = new LngLat(-3.6795450239783873, 40.189412710967794);
  public color!: string;
  public trainerInfo: mapboxgl.Popup = new mapboxgl.Popup();
  public isTrainerSelected: boolean = false;

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
    const imageHtml = document.createElement('img');
    imageHtml.src = trainer.image;
    imageHtml.style.width = '50px';
    imageHtml.style.borderRadius = '9999px';
    this.marker = new Marker({ element: imageHtml })
      .setLngLat(trainer.location)
      .setPopup(this.addPopup(trainer))
      .addTo(this.map!);
  }

  public addPopup(trainer: Trainers) {
    this.popUp = new Popup().setHTML(this.setHtmlPopup(trainer));

    this.popUp.on('open', () => {
      const button = document.querySelector('.popUp');
      if (button) return;
      this.addNewButton(trainer);
    });
    return this.popUp;
  }

  public setHtmlPopup(trainer: Trainers) {
    return `
      <div id="popUp" class="flex flex-col gap-1">
        <h2>${trainer.name}</h2>
        <span>Experience: ${trainer.experience}</span>
      </div>
    `;
  }

  public addNewButton(trainer: Trainers) {
    const popupContent: HTMLElement =
      this.el.nativeElement.querySelector('#popUp');
    if (!popupContent) return;
    const button = this.renderer.createElement('button');
    const buttonText = this.renderer.createText('Seleccionar');
    this.changeButtonStyles(button, buttonText, popupContent, trainer);
    return button;
  }

  onChangeZoom(method: string) {
    method === 'minus' ? this.map!.zoomOut() : this.map!.zoomIn();
  }

  public changeButtonStyles(
    button: HTMLElement,
    buttonText: string,
    popUp: HTMLElement,
    trainer: Trainers
  ) {
    const classes =
      'bg-blue-500 text-xs text-white rounded hover:bg-blue-700 p-1 popUp';
    const classesSelected =
      'bg-green-500 text-xs text-white rounded hover:bg-green-700 p-1 popUp';

    this.renderer.appendChild(button, buttonText);
    this.renderer.appendChild(popUp, button);
    this.renderer.setAttribute(button, 'class', classes);
    this.renderer.listen(button, 'click', () => {
      this.renderer.setProperty(button, 'textContent', 'Seleccionado');
      this.renderer.removeAttribute(button, 'class');
      this.renderer.setAttribute(button, 'class', classesSelected);
      this.onSelectTrainer(trainer);
    });
  }

  public onSelectTrainer(trainer: Trainers) {
    if (this.isTrainerSelected) return;
    this.trainersService.selectTrainer(trainer);
    this.isTrainerSelected = true;
    this.marker?.togglePopup()
    if(this.isTrainerSelected)
    this.popUp!.on('close', () => {      
    })
    
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }
}
