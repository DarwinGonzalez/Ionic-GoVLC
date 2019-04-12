import { Markerinfo } from './../interfaces/markerinfo';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  public term: string;
  public searchPlaces: Array<Markerinfo>;

  constructor(private _apiService: ApiService, private _router: Router) {
    this.searchPlaces = [];
   }

  ngOnInit() {}

  // Functions that find places base on a term that the user input in this tab
  findPlaces(){
    console.log(this.term);
    this.searchPlaces = this._apiService.searchByMonumentName(this.term);
    console.log(this.searchPlaces);
  }

  // Function that clean the data of the last search
  cleanPlaces() {
    this.searchPlaces = [];
    this.term = '';
    this._apiService.removeSearchedPlacesContent();
  }

  // Fucntion that makes posible goes to the details page of a place that is near you
  seeDetails(item: any) {
    this._router.navigate(['/tabs/tab1/details', JSON.stringify(item)]);
  }

}
