import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map'; 
import { Observable } from "rxjs/Observable";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Resolve } from '@angular/router/src/interfaces';
import { Config } from './config';

@Injectable()
export class ReportService {

  //private _getURL = "http://localhost:5488/api/report";
  private _getURL :string;

  constructor(private http: Http, private config: Config) { 
      this._getURL = "http://"+config.report_host+":"+config.report_port+"/api/report";
  }

  getReport(conditions:any) {
  
    console.log("---START getReport()---");

    console.log("conditions", conditions);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', this._getURL, true)
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
    xhr.responseType = 'arraybuffer'
    xhr.onload = function(e) {
        console.log(this);
        if (xhr.status == 200) {
            console.log(window);
            //window.open("data:application/pdf;base64," + window.btoa(String.fromCharCode.apply(null, new Uint8Array(xhr.response))), '_blank');

            //-------------------------------------------------------------------------------------------

            var base64PDF = window.btoa(String.fromCharCode.apply(null, new Uint8Array(xhr.response)));

            var objbuilder = '';
              objbuilder += ('<object width="100%" height="100%"      data="data:application/pdf;base64,');
              objbuilder += (base64PDF);
              objbuilder += ('" type="application/pdf" class="internal">');
              objbuilder += ('<embed src="data:application/pdf;base64,');
              objbuilder += (base64PDF);
              objbuilder += ('" type="application/pdf" />');
              objbuilder += ('</object>');
            }

            var win = window.open("","_blank","titlebar=yes");
            win.document.title = "The Locker Report";
            win.document.write('<html><head><title>Report</title></head><body>');
            win.document.write(objbuilder);
            win.document.write('</body></html>');
            //layer = jQuery(win.document);

            //-------------------------------------------------------------------------------------------
    }
    
    xhr.send(JSON.stringify({
      template: {
          shortid: 'rkSiVeatM',
          recipe: 'phantom-pdf'
      },
      data: {
           
        "number": "123 ทดสอบ",
        "seller": {
            "name": "นาย อภิวิชญ์  สังข์เมือง",
            "road": "ID00001",
            "country": "012-345-6789"
        },
        "buyer": {
            "name": "Acme Corp.",
            "road": "16 Johnson Road",
            "country": "Paris, France 8060"
        },
        "items": [{
            "name": "การ์ดจอ123",
            "price": 300
        },
        {
            "name": "แรม123",
            "price": 500
        },
        {
            "name": "คีย์บอร์ด123",
            "price": 1500
        }]
      },
      "options": { 
        "saveResult" : "true",
        "Content-Disposition" : "attachment; filename=myreport.pdf"
       }
    }))

    console.log("---END getReport()---");
  }

}
