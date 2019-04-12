import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Markerinfo } from '../interfaces/markerinfo';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-detailmonument',
  templateUrl: './detailmonument.page.html',
  styleUrls: ['./detailmonument.page.scss']
})
export class DetailmonumentPage implements OnInit {
  public monument: Markerinfo;
  constructor(
    private route: ActivatedRoute,
    private callNumber: CallNumber,
    private _apiService: ApiService
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
}
