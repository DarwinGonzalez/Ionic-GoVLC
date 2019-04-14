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
  public searchedPlaces: Array<Markerinfo>;
  public nearPlaces: Array<Markerinfo>;
  public viasArray: Array<Vias>;
  public marker: Markerinfo;
  public markersMap: Array<any>;
  public userCoords: Array<any>;

  constructor(private _http: HttpClient, private geolocation: Geolocation) {
    this.markersMap = [];
    this.visitedPlaces = [];
    this.userCoords = [];
    this.fill();
    this.parseCSV();
    this.geolocation.getCurrentPosition().then((resp) => {
      this.userCoords.push(resp.coords.latitude);
      this.userCoords.push(resp.coords.longitude);
    });
    console.log(this.userCoords);
  }

  // Function that get the content of the JSON with the data and return features object
  getMonumentJSON(): any {
    return this._http.get('./../../assets/monumentos-turisticos.json').pipe(map(data => data['features']));
  }

  // Function that obtain coordinates in lat/long from utm coordinates
  getCoordinatesLatLong(valuex: string, valuey: string) {
    return utm.toLatLon(valuex, valuey, 30, 's');
  }

  // Function that returns the csv content
  getCSVContent():  Observable<any> {
    return this._http.get( './../../assets/vias.csv', {responseType: 'text'});
  }

  // Function that create the global object with all the data necesary
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

  // Function that parse the csv file and create the objects that are need it
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

  // Function that find the street name using the codvia
  findStreetName(codvia: string): Vias {
    let value: any;
    this.viasArray.forEach(element => {
      if (element.getCodvia() === codvia) {
       value = element;
      }
    });
    return value;
  }

  // Function that create markers object used by google maps API
  createMarkers(nombre: string, lat: number, long: number, mainMap: any, telefono?: string, visitado?: boolean) {
    const contentStringTelephone = `
    <div id="content">
      <h1 id="firstHeading" class="firstHeading">${nombre}</h1>
      <div id="bodyContent">
        <p><b>Teléfono:</b> ${telefono} <ion-button color="success">Llamar</ion-button></p>
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

  // Function that get the position of the user and make a marker for it
  getUserLocation(mainMap: any) {
    this.geolocation.getCurrentPosition().then((resp) => {
      const coords = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      this.userCoords.push(resp.coords.latitude);
      this.userCoords.push(resp.coords.longitude);

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

  // Function that remove the content of visited places object
  removeFromvisitedPlaces(item: Markerinfo) {
    this.visitedPlaces.splice(this.visitedPlaces.findIndex(element => element.getId() === item.getId()), 1);
  }

  // Function that search the monument by a term
  searchByMonumentName(term: string): Array<Markerinfo> {
    const values = [];
    this.placesLatLong.forEach(element => {
      if (((element.nombre).toLowerCase()).includes(term.toLowerCase())) {
       values.push(element);
      }
    });
    return values;
  }

  // Function that clean the content of searched places object
  removeSearchedPlacesContent() {
    this.searchedPlaces = [];
  }

  // Function that search near places base on a distance parameter
  searchNearbyMonuments(dist: number): Array<Markerinfo> {
    const values = [];
    this.placesLatLong.forEach(element => {
      if (this.distance(element.getLatitude(), element.getLongitude(), this.userCoords[0], this.userCoords[1] ) <= dist) {
       values.push(element);
      }
    });
    return values;
  }

  // Function that return the distance between the user position and a coordinates given
  distance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Earth's radius in Km
    return Math.acos(Math.sin(lat1) * Math.sin(lat2) +
                    Math.cos(lat1) * Math.cos(lat2) *
                    Math.cos(lon2 - lon1)) * R;
  }

  addImageToMonument(image: string, monument: Markerinfo){
    monument.images.push(image);
  }
}
