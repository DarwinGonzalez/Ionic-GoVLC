import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Markerinfo } from '../interfaces/markerinfo';

@Component({
  selector: 'app-detailmonument',
  templateUrl: './detailmonument.page.html',
  styleUrls: ['./detailmonument.page.scss'],
})
export class DetailmonumentPage implements OnInit {

  public monument: Markerinfo;
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe( params => {
      const object = JSON.parse(params['object']);
      this.monument = new Markerinfo(object.nombre, object.latitude, object.longitude, object.telefono);
      console.log(this.monument);
    });
   }

  ngOnInit() {

  }

}
