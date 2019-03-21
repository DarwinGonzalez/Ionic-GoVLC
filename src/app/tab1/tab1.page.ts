import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public monuments = [];
  constructor(
    private _apiService: ApiService,
    private _router: Router
    ) {
    this._apiService.getCSVContent().subscribe(data => console.log(data));
  }

  ngOnInit() {
    this.monuments = this._apiService.placesLatLong;
  }

  seeDetails(item: any) {
    this._router.navigate(['/tabs/tab1/details', JSON.stringify(item)]);
  }

}
