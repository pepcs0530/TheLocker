import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Member } from './member';
import 'rxjs/add/operator/map'; 
import { Observable } from "rxjs/Observable";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Resolve } from '@angular/router/src/interfaces';

@Injectable()
export class MemberService {

  // api url to get the list of members
  private _getURL = "http://localhost:4001/api/";

  constructor(private http: Http) { }

  /// get list of members
  getMembers(): Observable<Member[]> {
    
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .get(this._getURL, options)
      .map(res => {
        return <Member[]>res.json();
      })
        
  }

  /// edit and update member details
  updateMember(updateMember:any,memGen): Observable<Member[]> {
    
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(updateMember);
    
    return this.http
      .put(this._getURL + 'edit/' + memGen, body, options )
      .map((res: Response) => res.json()
      );
  }

  /// edit and update member useflg to zero
  updateUseflgMember(updateMember:any,memGen): Observable<Member[]> {
    
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(updateMember);
    
    return this.http
      .put(this._getURL + 'updateUseflgMember/' + memGen, body, options )
      .map((res: Response) => res.json()
      );
  }

  /// get member by id
  getMemberById(memGen: number): Observable<Member[]> {

    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });
    
      return this.http
        .get(this._getURL + 'edit/' + memGen, options)
          .map(res => {
            return <Member[]>res.json();
        })
  
  }

  /// get member by username password
  getMemberByUsernamePassword(findMember: any): Observable<Member[]> {

    console.log(findMember);

    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(findMember);

    console.log(body);
    
    return this.http
      .post(this._getURL + 'find/' , body, options )
      .map((res: Response) => res.json()
      );
  
  }

  /// get member by useflg = 1
  getMemberByUseflg(): Observable<Member[]> {
    
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .get(this._getURL + 'qryUseflgMembers/' , options)
      .map(res => {
        return <Member[]>res.json();
      })
        
  }

  /// add new member
  createMember(newMember) {

    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(newMember);
    
      return this.http
        .post(this._getURL + 'add/', body, options )
          .map(res => res.json()
        );
  }

  /// delete member
  deleteMember(memGen: number) {
    return this.http.delete(this._getURL + 'delete/' +memGen);
  }


  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
