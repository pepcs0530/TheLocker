import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgModule, Directive} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule,Router,Routes} from "@angular/router";
import { FormsModule } from '@angular/forms';

import { ReportService } from "../report.service";

@NgModule({
  imports: [ BrowserModule,FormsModule ],
  declarations: [ ReportsComponent ],
  bootstrap: [ ReportsComponent ]
})

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  providers: [ReportService]
})
export class ReportsComponent implements OnInit {

  ses_value : string;
  ses_nameValue : string;

  private stDate:Object;
  private enDate:Object;
  name : string;
  model = { options: '' };
  conditons = {};

  private onStDateChanged(event){
    this.stDate = event.date;
  }

  private onEnDateChanged(event){
    this.enDate = event.date;
  }

  constructor(private reportService: ReportService, private router: Router) { 
    var x = document.cookie.split(';');
      var i = 0;
      var cookieValue;
      var cookieNameValue;
      for(; i<x.length; i++){
        if(x[i].split('=')[0].trim() == 'sessionID'){
          cookieValue = x[i].split('=')[1];
          this.ses_value = cookieValue;
          cookieNameValue = x[i].split('=')[2];
          this.ses_nameValue = cookieNameValue;
          break;
        }
      }
      if(cookieValue === undefined){
        this.router.navigate(['/']);
      }else{
        var myRes = atob(cookieValue).split('??');
        console.log(myRes);
        console.log(cookieNameValue);
      }
  }

  ngOnInit() {
  }

  clear(){
    console.log(this.model.options);
    console.log(this.name);
    console.log(this.stDate);
    console.log(this.enDate);
    this.name = "";
    this.stDate = {};
    this.enDate = {};
    this.model = {options : ''};
  }

  logout(){
    document.cookie = 'sessionID' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    console.log('logout!');
    this.router.navigate(['/']);
  }

  print() {
    console.log(this.model.options);
    console.log(this.stDate);
    console.log(this.enDate);
    console.log(this.name);
    if(this.model.options == ''){
      alert('กรุณาเลือกประเภทรายงาน');
      return false;
    }

    if(this.stDate == undefined || this.enDate == undefined){
      alert('กรุณาระบุช่วงวันที่');
      return false;
    }

    console.log("---START generateReport()---");

    this.conditons = {
      username : this.ses_nameValue,
      reportType : this.model.options,
      stDate : this.stDate,
      enDate : this.enDate,
      name : this.name
    } 

    this.reportService.getReport(this.conditons);

    console.log("---END generateReport()---");
  }

}
