import {  Injectable } from '@angular/core';
import { LngLat, LngLatLike, Map } from 'mapbox-gl';

@Injectable({
  providedIn: 'root',
})
export class MapsService {
  constructor(
  ) {
    this.getUserLocation();

  }

  public userLocation?: LngLatLike = new LngLat(-3.6795450239783873, 40.189412710967794);
  public zoom: number = 12;
  
  private _map?: Map;

  public get map(): Map | undefined {
    return this._map;
  }
  public set map(value: Map | undefined) {
    this._map = value;
  }

  public isMapReady(): boolean {
    return !!this._map;
  }

  public getUserLocation(): Promise<LngLatLike> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {          
          this.userLocation = {lng: coords.longitude, lat: coords.latitude};
          resolve(this.userLocation);
        },
        (error) => {
          alert('No hay Gelocalizacion');
          console.log(error);
        }
      );
    });
  }
}
