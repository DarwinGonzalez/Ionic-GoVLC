import { Markerinfo } from './../interfaces/markerinfo';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  public term: string;
  public searchPlaces: Array<Markerinfo>;
  constructor(private _apiService: ApiService) {
    this.searchPlaces = [];
   }

  ngOnInit() {

  }

  findPlaces(){
    console.log(this.term);
    this.searchPlaces = this._apiService.searchByMonumentName(this.term);
    console.log(this.searchPlaces);
  }

  cleanPlaces() {
    this.searchPlaces = [];
    this.term = '';
    this._apiService.removeSearchedPlacesContent();
  }

}
