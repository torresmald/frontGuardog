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
            },
          };
          this.trainersLocations.push(location);
        });
      });

      // this.trainersLocations = this.trainers
    } catch (error) {
      console.log(error);
    }

  

    // this.markers = [{
    //   position: {
    //     lat: this.center?.lat ,
    //     lng: this.center?.lng
    //   },
    //   options: { animation: google.maps.Animation.BOUNCE },
    // }]
  }
  ngAfterViewInit(): void {
  }

  public moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }
  public move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }


  public onSelectTrainer(event: google.maps.MapMouseEvent, index: number) {

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
