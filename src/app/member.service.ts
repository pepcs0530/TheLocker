import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Member } from './member';
import { Keycard } from './keycard';
import 'rxjs/add/operator/map'; 
//import { Observable } from "rxjs/Observable";
import { Observable } from "rxjs";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Resolve } from '@angular/router/src/interfaces';
import { Config } from './config';

@Injectable()
export class MemberService {

  // api url to get the list of members
  //private _getURL = "http://localhost:4001/api/";
  private _getURL :string;

  constructor(private http: Http, private config: Config) { 
    this._getURL = "http://"+config.db_host+":"+config.db_port+"/api/";
  }

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

  /// get list of member by condition
  getMemberByCond(keyword:any): Observable<Member[]> {
    
      console.log(keyword);

      let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
      let options = new RequestOptions({ headers: headers });
      let body = JSON.stringify(keyword);
  
      console.log(body);
      
      return this.http
        .post(this._getURL + 'search/' , body, options )
        .map((res: Response) => res.json()
      );
        
  }

  /// edit and update member details
  updateMember(updateMember:any,memGen) {
    
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(updateMember);

    console.log('update', updateMember);
    
    return this.http
      .put(this._getURL + 'edit/' + memGen, body, options )
      //.map((res: Response) => res.json());
  }

  /// edit and update member useflg to zero
  // updateUseflgMember(updateMember:any,newKeycard:any,memGen) {
    updateUseflgMember(updateMember: any, memGen) {
    
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(updateMember);
    // let body2 = JSON.stringify(newKeycard);

    console.log('update', updateMember);
    
    return this.http
      .put(this._getURL + 'updateUseflgMember/' + memGen, body, options );
      // .map((res: Response) => res.json());

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

    console.log('insert',newMember)
    
      return this.http
        .post(this._getURL + 'add/', body, options )
          //.map(res => res.json());
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
