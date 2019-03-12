import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public monuments = [];
  constructor(private _apiService: ApiService) {

  }

  ngOnInit() {
    this._apiService.getMonumentJSON().subscribe( data => {
      data.forEach(element => {
        this.monuments.push(element);
      });
    });
  }
}
