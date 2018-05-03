import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Locker } from './locker';
import { Keycard } from './keycard';
import { CurrentTaggingKeycard } from './currentTaggingKeycard';
import { Member } from './member';
import 'rxjs/add/operator/map'; 
//import { Observable } from "rxjs/Observable";
import { Observable } from "rxjs";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Resolve } from '@angular/router/src/interfaces';
import { Config } from './config';

@Injectable()
export class KeycardService {

  // api url to get the list of keycards
  //private _getURL = "http://localhost:4001/api/";
  private _getURL :string;

  constructor(private http: Http, private config: Config) { 
    this._getURL = "http://"+config.db_host+":"+config.db_port+"/api/";
  }

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

  /// get list of keycard by condition
  getKeycardByCond(keyword:any): Observable<Keycard[]> {
    
    console.log(keyword);

    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(keyword);

    console.log(body);
    
    return this.http
      .post(this._getURL + 'searchKeycard/' , body, options )
      .map((res: Response) => res.json()
    );
      
  }

  /// get list of keycard for check duplicate
  getKeycardForCheckDup(keyword: any): Observable<Keycard[]> {

    console.log(keyword);

    const headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(keyword);

    console.log(body);
    
    return this.http
      .post(this._getURL + 'searchKeycardCheckDup/' , body, options )
      .map((res: Response) => res.json()
    );
      
  }

  /// add new keycard
  createKeycard(newKeycard) {

    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(newKeycard);
    
      return this.http
        .post(this._getURL + 'addKeycard/', body, options )
          //.map(res => res.json());
  }

  /// delete keycard
  deleteKeycard(rfidGen: number) {
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(this._getURL + 'deleteKeycard/' + rfidGen);

    /*const a = this.http.delete(this._getURL + 'deleteKeycard/' + rfidGen).map(res=> { return res.json() } );
    const b = this.http.get(this._getURL + 'qryKeycards/', options).map(res => {
      return <Keycard[]>res.json();
    })
    return Observable.concat(a,b);*/
  }

  /// get list of member by condition
  getRightMemberByCond(keyword:any): Observable<Member[]> {
    
    console.log(keyword);

    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(keyword);

    console.log(body);
    
    return this.http
      .post(this._getURL + 'searchRightMember/' , body, options )
      .map((res: Response) => res.json()
    );
      
}

  /// get list of current tagging keycards
  getCurrentTaggingKeycards(): Observable<CurrentTaggingKeycard[]> {
      
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .get(this._getURL + 'qryCurrentTaggingKeycard/', options)
      .map(res => {
        return <CurrentTaggingKeycard[]>res.json();
      })
        
  }

  /// delete list of current tagging keycards
  deleteCurrentTaggingKeycards() {
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(this._getURL + 'deleteCurrentTaggingKeycard');

  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}