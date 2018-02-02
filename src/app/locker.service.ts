import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Locker } from './locker';
import 'rxjs/add/operator/map'; 
import { Observable } from "rxjs/Observable";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Resolve } from '@angular/router/src/interfaces';

@Injectable()
export class LockerService {

  // api url to get the list of lockers
  private _getURL = "http://localhost:4001/api/";

  constructor(private http: Http) { }

  /// get list of lockers
  getLockers(): Observable<Locker[]> {
    
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .get(this._getURL + 'qryLockers/', options)
      .map(res => {
        return <Locker[]>res.json();
      })
        
  }

}
