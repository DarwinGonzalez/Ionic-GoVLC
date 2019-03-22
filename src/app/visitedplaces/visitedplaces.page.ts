import { Component, OnInit } from '@angular/core';
import { Markerinfo } from '../interfaces/markerinfo';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visitedplaces',
  templateUrl: './visitedplaces.page.html',
  styleUrls: ['./visitedplaces.page.scss'],
})
export class VisitedplacesPage implements OnInit {

  public visited: Array<Markerinfo>;

  constructor(private _apiService: ApiService, private _router: Router) {
    this.visited = this._apiService.visitedPlaces;
   }

  ngOnInit() {
  }

  seeDetails(item: any) {
    this._router.navigate(['/tabs/tab1/details', JSON.stringify(item)]);
  }

}
