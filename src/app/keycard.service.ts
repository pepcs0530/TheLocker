import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Locker } from './locker';
import { Keycard } from './keycard';
import 'rxjs/add/operator/map'; 
import { Observable } from "rxjs/Observable";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Resolve } from '@angular/router/src/interfaces';

@Injectable()
export class KeycardService {

  // api url to get the list of keycards
  private _getURL = "http://localhost:4001/api/";

  constructor(private http: Http) { }

  /// get list of keycards
  getKeycards(): Observable<Keycard[]> {
    
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .get(this._getURL + 'qryKeycards/', options)
      .map(res => {
        return <Keycard[]>res.json();
      })
        
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}