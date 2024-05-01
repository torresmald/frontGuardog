import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule, MapMarker } from '@angular/google-maps';
import { Trainers } from 'src/app/core/models/Trainers/transformed/TrainerModel';
import { Observable } from 'rxjs';
import { Location } from 'src/app/core/models/Trainers/api/apiTrainerModel';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit, AfterViewInit {
  public display: any;
  public center!: google.maps.LatLngLiteral;
  public zoom = 8;
  public markers: any = [];
  public mapLoaded: boolean = false;
  public trainersLocations: any[] = [];
  public trainersLoaded?: Trainers[];
  @Input() public trainers?: Observable<Trainers[]>;
  //@Input() public trainers?: Trainers[] | null
  @ViewChildren('markersArray') markersArray?: QueryList<ElementRef>;

  @Output() public selectedTrainer: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    try {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        this.center = {
          lat: coords.latitude,
          lng: coords.longitude,
        };
      });

      this.trainers?.subscribe((trainers: Trainers[]) => {
        this.trainersLoaded = trainers;
        trainers.forEach((trainer) => {
          const location = {
            location: {
              lat: trainer.location.lat,
              lng: trainer.location.lng,
            },
            options: {
              animation: google.maps.Animation.BOUNCE,
              icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            },
          };
          this.trainersLocations.push(location);
        });
      });

      // this.trainersLocations = this.trainers
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      this.mapLoaded = true;
    }, 2000);

    // this.markers = [{
    //   position: {
    //     lat: this.center?.lat ,
    //     lng: this.center?.lng
    //   },
    //   options: { animation: google.maps.Animation.BOUNCE },
    // }]
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.markersArray?.forEach((marker) => {
        console.log(marker.nativeElement);
      });
    }, 1000); // Espera 1 segundo antes de acceder a los marcadores
  }

  public moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }
  public move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  // public addMarker(event: google.maps.MapMouseEvent) {
  //   console.log(event);
  //   this.markers.push({
  //     position: {
  //       lat: event.latLng?.lat(),
  //       lng: event.latLng?.lng()
  //     },
  //     label: 'Trainer',
  //     title: 'ewiurhewiurhweuir',
  //     options: { animation: google.maps.Animation.BOUNCE },
  //   })
  // }

  public onSelectTrainer(event: google.maps.MapMouseEvent, index: number) {
    console.log(this.trainersLocations[index]);
    this.trainersLocations[index]['options']['icon'] = 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
    const location = {
      lat: event.latLng?.lat(),
      lng: event.latLng?.lng(),
    };
    const selectedTrainer = this.trainersLoaded?.find((trainer) => {
      return (
        trainer.location.lat == location.lat &&
        trainer.location.lng == location.lng
      );
    });
    this.selectedTrainer.emit(selectedTrainer?._id);
  }
}
