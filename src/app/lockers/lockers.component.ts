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
  declarations: [ LockersComponent ],
  bootstrap: [ LockersComponent ]
})

@Component({
  selector: 'app-lockers',
  templateUrl: './lockers.component.html',
  styleUrls: ['./lockers.component.css'],
  providers: [LockerService, PagerService]
})
export class LockersComponent implements OnInit {

  lockers: Locker[];

  ses_value : string;
  ses_nameValue : string

  // array of all items to be paged
  private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

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
    this.getLockers()
  }

  logout(){
    document.cookie = 'sessionID' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    console.log('logout!');
    this.router.navigate(['/']);
  }

  //// get list of lockers
  getLockers(): void {
    console.log("---START getLockers()---")

   this.lockerService.getLockers()
        .subscribe(
            resultArray => {
              this.lockers = resultArray;
              console.log(resultArray);
              //this.filteredItems = resultArray;
              //console.log(this.filteredItems);
              //this.init();

              this.allItems = resultArray;

              // initialize to page 1
              this.setPage(1);
            },
            error => console.log("Error :: " + error)
        ) 
        this.router.navigate(['/lockers'])

        console.log("---END getLockers()---")
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);
    console.log(this.pager)

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(this.pagedItems)

    this.lockers = this.pagedItems;
  }

}
