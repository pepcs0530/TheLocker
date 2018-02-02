import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgModule, Directive} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule,Router,Routes} from "@angular/router";
import { FormsModule } from '@angular/forms';

import { LockerService } from '../locker.service';
import { Member } from '../member';

import { PagerService } from '../pager.service';
import { Locker } from '../locker';


@NgModule({
  imports: [ BrowserModule,FormsModule ],
  declarations: [ KeycardsComponent ],
  bootstrap: [ KeycardsComponent ]
})

@Component({
  selector: 'app-keycards',
  templateUrl: './keycards.component.html',
  styleUrls: ['./keycards.component.css'],
  providers: [LockerService, PagerService]
})
export class KeycardsComponent implements OnInit {

  ses_value : string;
  ses_nameValue : string

  // array of all items to be paged
  private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  inputKeyId: any = { rfid_id: '' };

  constructor(private lockerService: LockerService, private pagerService: PagerService,
    private formBuilder: FormBuilder,
    private router: Router) { 
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
        /*if(atob(myRes[0]) == 'admin' && atob(myRes[1]) == '1234'){

        }else{
          this.router.navigate(['/']);
        }*/
      }
    }

  ngOnInit() {
  }

  logout(){
    document.cookie = 'sessionID' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    console.log('logout!');
    this.router.navigate(['/']);
  }

  readKeyId(): void {
    console.log('call rfid reader and get key id.');
    this.inputKeyId.rfid_id = 'RFID0001';
  }

  

}
