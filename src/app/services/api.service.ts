import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Markerinfo } from '../interfaces/markerinfo';
import * as utm from 'node_modules/utm/index.js';
import { Observable } from 'rxjs';
import { Vias } from '../interfaces/vias';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public placesLatLong: Array<Markerinfo>;
  public viasArray: Array<Vias>;

  constructor(private _http: HttpClient) {
    this.fill();
    this.parseCSV();
  }
  getMonumentJSON(): any {
    return this._http.get('./../../assets/monumentos-turisticos.json').pipe(map(data => data['features']));
  }

  getCoordinatesLatLong(valuex: string, valuey: string) {
    return utm.toLatLon(valuex, valuey, 30, 's');
  }

  getCSVContent():  Observable<any> {
    return this._http.get( './../../assets/vias.csv', {responseType: 'text'});
  }

  fill() {
    this.placesLatLong = [];
    this.getMonumentJSON().subscribe( data => {
      data.forEach(element => {
        const coords = this.getCoordinatesLatLong(element.geometry.coordinates[0], element.geometry.coordinates[1]);
        const marker = new Markerinfo(element.properties.nombre, coords.latitude, coords.longitude, element.properties.telefono);
        this.placesLatLong.push(marker);
      });
    });
  }

  parseCSV() {
    let rawTextContent = '';
    let rawTextContentArray = [];
    this.viasArray = [];
    this.getCSVContent().subscribe(data => {
      rawTextContent = data;
      rawTextContentArray = rawTextContent.split('\n');
      rawTextContentArray.forEach(element => {
        const aux = element.split(';');
        const via =  new Vias(aux[0], aux[1], aux[2], aux[3], aux[4]);
        this.viasArray.push(via);
      });
    });
  }

}
