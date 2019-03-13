import { ApiService } from './../services/api.service';
import { Component, ViewChild } from '@angular/core';

declare var google;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @ViewChild('map') mapElement;
  map: any;

  constructor(private _apiService: ApiService){
    this._apiService.getMonumentJSON().subscribe( () => {
      this._apiService.placesLatLong.forEach(data => {
        console.log(data);
        if (data.telefono === '0') {
          this.setMarkers(data.nombre, data.latitude, data.longitude, 'No hay un teléfono disponible');
        } else {
          this.setMarkers(data.nombre, data.latitude, data.longitude, data.telefono);
        }
      });
    });

  }

  ngOnInit(): void {
    this.initMap();
  }

  initMap() {
    const coords = new google.maps.LatLng(39.4767088559305, -0.37814708266530195);
    const mapOptions: google.maps.MapOptions = {
      center: coords,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    const marker: google.maps.Marker = new google.maps.Marker({
      map: this.map,
      position: coords,
    });
  }

  setMarkers(nombre: string, lat: number, long: number, telefono?: string) {
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
      map: this.map,
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

  }
}
