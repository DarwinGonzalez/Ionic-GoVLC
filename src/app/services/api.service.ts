import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  getMonumentJSON(): any {
    return this._http.get('./../../assets/monumentos-turisticos.json').pipe(map(data => data['features']));
  }
}
