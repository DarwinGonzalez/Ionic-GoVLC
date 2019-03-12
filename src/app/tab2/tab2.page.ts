import { Component, ViewChild } from '@angular/core';
declare var google;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @ViewChild("map") mapElement;
  map: any;
  constructor(){}

  ngOnInit(): void {
    this.initMap();
  }

  initMap() {
    let coords = new google.maps.LatLng(39.4697495, -0.37739);
    let mapOptions: google.maps.MapOptions = {
      center: coords,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    let marker: google.maps.Marker = new google.maps.Marker({
      map: this.map,
      position: coords
    });
  }
}
