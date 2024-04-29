import { AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { Trainers } from 'src/app/core/models/Trainers/transformed/TrainerModel';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit, AfterViewInit {
  public display: any;
  public center!: google.maps.LatLngLiteral
  public zoom = 8;
  public markers: any = []
  public trainersLocations: any = [
    {
        "lat": "40.200999935919974",
        "lng": "-3.6892864938188925"
    },
    {
        "lat": "40.200999935919974",
        "lng": "-3.6892864938188925"
    },
    {
        "lat": "40.18740490125557",
        "lng": "-3.6759491679726586"
    }
]

  @Input() public trainers?: Trainers[] | null

  @Output() public selectedTrainer: EventEmitter<any> = new EventEmitter()

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(({coords}) => {
      this.center = {
        lat: coords.latitude,
        lng: coords.longitude,
      };

      
      
    });
  this.trainersLocations = this.trainers

  console.log(this.trainers);
  

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

  public addMarker(event: google.maps.MapMouseEvent) {
    console.log(event);
    this.markers.push({
      position: {
        lat: event.latLng?.lat(),
        lng: event.latLng?.lng()
      },
      label: 'Trainer',
      title: 'ewiurhewiurhweuir',
      options: { animation: google.maps.Animation.BOUNCE },
    })
  }

  public onSelectTrainer(event: google.maps.MapMouseEvent){
    console.log(event.latLng?.lat());
    console.log(event.latLng?.lng());
    // this.selectedTrainer.emit()
  }
}
