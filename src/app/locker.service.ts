import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Locker } from './locker';
import 'rxjs/add/operator/map'; 
import { Observable } from "rxjs/Observable";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Resolve } from '@angular/router/src/interfaces';
import { Config } from './config';

@Injectable()
export class LockerService {

  // api url to get the list of lockers
  //private _getURL = "http://localhost:4001/api/";
  private _getURL :string;

  constructor(private http: Http, private config: Config) { 
    this._getURL = "http://"+config.db_host+":"+config.db_port+"/api/";
  }

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

  /// call report
  callReport() {

    console.log("callReport");

    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8', "Access-Control-Allow-Origin": "*" });
    let options = new RequestOptions({ 
      headers: headers, 
      body : {
        "template": { "shortid" : "rkJTnK2ce" },
        "data" : { 
          "number": "123 ทดสอบ",
          "seller": {
              "name": "Next Step Webs, Inc.",
              "road": "12345 Sunny Road",
              "country": "Sunnyville, TX 12345"
          },
          "buyer": {
              "name": "Acme Corp.",
              "road": "16 Johnson Road",
              "country": "Paris, France 8060"
          },
          "items": [{
              "name": "การ์ดจอ",
              "price": 300
          },
          {
              "name": "แรม",
              "price": 500
          },
          {
              "name": "คีย์บอร์ด",
              "price": 1500
          }]
        },
        "options": { 
          "saveResult" : "true",
          "Content-Disposition" : "attachment; filename=myreport.pdf"
         }
      } });
    //let body = JSON.stringify(findMember);

    let body = {
        
    }

    //console.log(body);
    
    return this.http
      .post('http://localhost:5488/api/report/Invoice' , body, options )
      .map((res: Response) => res.json()
      );
  
  }

  /// get list of locker by condition
  getLockerByCond(keyword:any): Observable<Locker[]> {
    
    console.log(keyword);

    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(keyword);

    console.log(body);
    
    return this.http
      .post(this._getURL + 'searchLocker/' , body, options )
      .map((res: Response) => res.json()
    );
      
  }

  /// get locker by pk
  getLockerByPk(locGen: number): Observable<Locker[]> {

    const headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    const options = new RequestOptions({ headers: headers });

      return this.http
        .get(this._getURL + 'getLockerByPk/' + locGen, options)
          .map(res => {
            return <Locker[]>res.json();
        });

  }

  /// edit and update locker details
  updateLocker(updateLocker: any, locGen) {

    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(updateLocker);

    console.log('update', updateLocker);

  return this.http
    .put(this._getURL + 'editLocker/' + locGen, body, options );
    //.map((res: Response) => res.json());
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }



}
