import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Markerinfo } from '../interfaces/markerinfo';
import * as utm from 'node_modules/utm/index.js';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public placesLatLong: Array<Markerinfo>;

  constructor(private _http: HttpClient) {
    this.fill();
  }
  getMonumentJSON(): any {
    return this._http.get('./../../assets/monumentos-turisticos.json').pipe(map(data => data['features']));
  }

  getCoordinatesLatLong(valuex: string, valuey: string) {
    return utm.toLatLon(valuex, valuey, 30, 's');
  }

  fill() {
    this.placesLatLong = [];
    this.getMonumentJSON().subscribe( data => {
      data.forEach(element => {
        const coords = this.getCoordinatesLatLong(element.geometry.coordinates[0],element.geometry.coordinates[1]);
        let marker = new Markerinfo(element.properties.nombre, coords.latitude, coords.longitude);
        this.placesLatLong.push(marker);
      });
    });
    console.log(this.placesLatLong);
  }

}
