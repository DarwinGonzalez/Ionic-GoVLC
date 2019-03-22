import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Markerinfo } from '../interfaces/markerinfo';
import { Observable } from 'rxjs';
import { Vias } from '../interfaces/vias';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import * as utm from 'node_modules/utm/index.js';

declare var google;
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public placesLatLong: Array<Markerinfo>;
  public visitedPlaces: Array<Markerinfo>;
  public viasArray: Array<Vias>;
  public marker: Markerinfo;
  public markersMap: Array<any>;

  constructor(private _http: HttpClient, private geolocation: Geolocation) {
    this.markersMap = [];
    this.visitedPlaces = [];
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
        const marker = new Markerinfo(
          element.properties.nombre,
          coords.latitude,
          coords.longitude,
          element.properties.codvia,
          element.properties.idnotes,
          element.properties.telefono);
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
      this.placesLatLong.forEach(element => {
        element.setVia(this.findStreetName(element.codvia));
      });
    });
  }

  findStreetName(codvia: string): Vias {
    let value: any;
    this.viasArray.forEach(element => {
      if (element.getCodvia() === codvia) {
       value = element;
      }
    });
    return value;
  }

  createMarkers(nombre: string, lat: number, long: number, mainMap: any, telefono?: string, visitado?: boolean) {
    const contentStringTelephone = `
    <div id="content">
      <h1 id="firstHeading" class="firstHeading">${nombre}</h1>
      <div id="bodyContent">
        <p><b>Teléfono:</b> ${telefono} <ion-button color="success">Llamar</ion-button></p>
        <p> Este lugar ha sido: ${visitado}</p>
      </div>
    </div>`;

    const contentStringNoTelephone = `
    <div id="content">
      <h1 id="firstHeading" class="firstHeading">${nombre}</h1>
      <div id="bodyContent">
        <p><b>Teléfono:</b> ${telefono}</p>
      </div>
    </div>`;

    const coords = new google.maps.LatLng(lat, long);
    const marker: google.maps.Marker = new google.maps.Marker({
      map: mainMap,
      position: coords,
    });

    if (telefono  === 'No hay un teléfono disponible') {
      const infowindow = new google.maps.InfoWindow({
        content: contentStringNoTelephone
      });
      marker.addListener('click', function() {
        infowindow.open(this.map, marker);
      });
    } else {
      const infowindow = new google.maps.InfoWindow({
        content: contentStringTelephone
      });
      marker.addListener('click', function() {
        infowindow.open(this.map, marker);
      });
    }

    this.markersMap.push(marker);
  }

  getUserLocation(mainMap: any) {
    this.geolocation.getCurrentPosition().then((resp) => {
      const coords = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      const contentString = `
      <div id="content">
        <h1 id="firstHeading" class="firstHeading">You are here!</h1>
        <div id="bodyContent">
          <p>This marker represents where you are in the map</p>
        </div>
      </div>`;

      const infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      const userMarker: google.maps.Marker = new google.maps.Marker({
        map: mainMap,
        position: coords,
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
      });

      userMarker.addListener('click', function() {
        infowindow.open(this.map, userMarker);
      });

     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

}
