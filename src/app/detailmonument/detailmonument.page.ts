import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Markerinfo } from '../interfaces/markerinfo';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-detailmonument',
  templateUrl: './detailmonument.page.html',
  styleUrls: ['./detailmonument.page.scss'],
})
export class DetailmonumentPage implements OnInit {

  public monument: Markerinfo;
  constructor(private route: ActivatedRoute, private callNumber: CallNumber) {
    this.route.params.subscribe( params => {
      const object = JSON.parse(params['object']);
      this.monument = object;
    });
   }

  ngOnInit() {

  }

  makeCall(telefono: string) {
    this.callNumber.callNumber(telefono, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }
}
