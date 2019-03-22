import { Component } from '@angular/core';
import { Markerinfo } from '../interfaces/markerinfo';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public visited: Array<Markerinfo>;

  constructor(private _apiService: ApiService, private _router: Router) {
    this.visited = this._apiService.visitedPlaces;
  }

  seeDetails(item: any) {
    this._router.navigate(['/tabs/tab1/details', JSON.stringify(item)]);
  }

}
