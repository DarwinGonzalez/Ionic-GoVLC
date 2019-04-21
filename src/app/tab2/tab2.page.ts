import { ApiService } from './../services/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';

declare var google;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild('map') mapElement;
  map: any;

  constructor(private _apiService: ApiService){
    this._apiService.getMonumentJSON().subscribe( () => {
      this._apiService.placesLatLong.forEach(data => {
        if (data.telefono === '0') {
         this._apiService.createMarkers(
          data.nombre,
          data.latitude,
          data.longitude,
          this.map,
          'No hay un teléfono disponible',
          data.visitado);
        } else {
          this._apiService.createMarkers(
            data.nombre,
            data.latitude,
            data.longitude,
            this.map,
            data.telefono,
            data.visitado
          );
        }
      });
    });
  }

  ngOnInit(): void {
    this.initMap();
  }

  // Function that initialize the map
  initMap() {
    const coords = new google.maps.LatLng(39.4767088559305, -0.37814708266530195);

    const mapOptions: google.maps.MapOptions = {
      center: coords,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this._apiService.getUserLocation(this.map);
  }
}
