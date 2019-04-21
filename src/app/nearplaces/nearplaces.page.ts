import { Component, OnInit } from '@angular/core';
import { Markerinfo } from '../interfaces/markerinfo';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nearplaces',
  templateUrl: './nearplaces.page.html',
  styleUrls: ['./nearplaces.page.scss'],
})
export class NearplacesPage implements OnInit {
  public nearPlaces: Array<Markerinfo>;

  constructor(private _apiService: ApiService, private _router: Router) {
    this.nearPlaces = [];
    setTimeout(() => {
      this.nearPlaces = this._apiService.searchNearbyMonuments(6);
    });
   }

  ngOnInit() {
  }

  // Function to anvigate to the detailscomponent tab from nearplaces tab
  seeDetails(item: any) {
    this._router.navigate(['/tabs/tab1/details', JSON.stringify(item)]);
  }
}
