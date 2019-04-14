import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Markerinfo } from '../interfaces/markerinfo';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ApiService } from '../services/api.service';
import { PictureSourceType, Camera, DestinationType } from '@ionic-native/Camera/ngx';

@Component({
  selector: 'app-detailmonument',
  templateUrl: './detailmonument.page.html',
  styleUrls: ['./detailmonument.page.scss']
})
export class DetailmonumentPage implements OnInit {
  public monument: Markerinfo;
  public image: string;
  constructor(
    private route: ActivatedRoute,
    private callNumber: CallNumber,
    private _apiService: ApiService, private Camera: Camera
  ) {
    this.route.params.subscribe(params => {
      const object = JSON.parse(params['object']);
      this._apiService.placesLatLong.forEach(element => {
        if (element.getId() === object.id) {
          this.monument = element;
        }
      });
    });
  }

  ngOnInit() {}

  // Function use to make a call if the monument have it available
  makeCall(telefono: string) {
    this.callNumber
      .callNumber(telefono, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  // Functio to change the state if a monument is visited or not
  changeVisitado(value: boolean) {
    this.monument.setVisitado(!value);
    if (!value === true) {
      this._apiService.visitedPlaces.push(this.monument);
    } else {
      this._apiService.removeFromvisitedPlaces(this.monument);
    }
  }

  takePicture(){
    this.Camera.getPicture({
      destinationType: this.Camera.DestinationType.DATA_URL,
      targetWidth: 320,
      targetHeight: 320
  }).then((data) => {

      this.image = "data:image/jpeg;base64," + data;
      this._apiService.addImageToMonument(this.image, this.monument);
      console.log(this.monument);

  }, (error) => {

      console.log(error);
  });
  }
}
