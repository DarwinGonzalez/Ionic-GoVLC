import { ApiService } from './../services/api.service';
import { Component, ViewChild } from '@angular/core';
import * as utm from 'node_modules/utm/index.js';

declare var google;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @ViewChild("map") mapElement;
  map: any;

  public placesLatLong = [];

  constructor(private _apiService: ApiService){
    this._apiService.getMonumentJSON().subscribe( data => {
      data.forEach(element => {
        this.placesLatLong.push(element.properties.nombre, this.getCoordinatesLatLong(element.geometry.coordinates[0],element.geometry.coordinates[1]));
      });
      console.log(this.placesLatLong);
    });
  }

  ngOnInit(): void {
    this.initMap();
  }

  initMap() {
    let coords = new google.maps.LatLng(39.4767088559305, -0.37814708266530195);
    let mapOptions: google.maps.MapOptions = {
      center: coords,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    let marker: google.maps.Marker = new google.maps.Marker({
      map: this.map,
      position: coords,
    });
  }

  setMarkers() {
    // https://developers.google.com/maps/documentation/javascript/markers
  }

  getCoordinatesLatLong(valuex: string, valuey: string) {
    return utm.toLatLon(valuex, valuey, 30, 's');
  }
}
