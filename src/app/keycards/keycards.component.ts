import { Component, OnInit, ViewChild  } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgModule, Directive} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule,Router,Routes} from "@angular/router";
import { FormsModule } from '@angular/forms';

import { LockerService } from '../locker.service';
import { Member } from '../member';
import { Keycard } from '../keycard';

import { PagerService } from '../pager.service';
import { Locker } from '../locker';

import { MemberService } from '../member.service';
import { KeycardService } from '../keycard.service';

import {ModalModule} from '../../../src/ng2-bs4-modal/ng2-bs4-modal.module';

import { ModalComponent } from "../../ng2-bs4-modal/components/modal";


@NgModule({
  imports: [ BrowserModule, FormsModule, ModalModule ],
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

  members: Member[];
  //filter
  inputName: any = { mem_fname: '' };

   // array of all items to be paged 2
   private allItems2: any[];

   // pager object
   pager2: any = {};
 
   // paged items
   pagedItems2: any[];
   keycards: Keycard[];

  constructor(private lockerService: LockerService, 
    private pagerService: PagerService,
    private memberService: MemberService,
    private keycardService: KeycardService,
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

  getMemberByUseflg(): void {
    console.log("---START getMemberByUseflg()---")

   this.memberService.getMemberByUseflg()
        .subscribe(
            resultArray => {
              this.members = resultArray;
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
        //this.router.navigate(['/members'])

        console.log("---END getMemberByUseflg()---")
  }

  addRightMember(addRightMemberGen: number): void {
    console.log("---START addRightMember()---");

    //this.router.navigate(['/lockers']);
    this.modal.close();
    console.log("addRightMemberGen : ", addRightMemberGen);

    console.log("---END addRightMember()---");
  }

  click2(keycard: Keycard): void {
    console.log('rfid_gen : '+keycard.rfid_gen);
  }

  click(member: Member): void {
    console.log('mem_gen : '+member.mem_gen);
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

    this.members = this.pagedItems;
  }

  setPage2(page: number) {
    if (page < 1 || page > this.pager2.totalPages) {
        return;
    }

    // get pager object from service
    this.pager2 = this.pagerService.getPager(this.allItems2.length, page);
    console.log(this.pager2)

    // get current page of items
    this.pagedItems2 = this.allItems2.slice(this.pager2.startIndex, this.pager2.endIndex + 1);
    console.log(this.pagedItems2)

    this.keycards = this.pagedItems2;
  }

  //// get list of keycards
  getKeycards(): void {
    console.log("---START getKeycards()---")

   this.keycardService.getKeycards()
        .subscribe(
            resultArray => {
              this.keycards = resultArray;
              console.log(resultArray);
              //this.filteredItems = resultArray;
              //console.log(this.filteredItems);
              //this.init();

              this.allItems2 = resultArray;

              // initialize to page 1
              this.setPage2(1);
            },
            error => console.log("Error :: " + error)
        ) 
        this.router.navigate(['/keycards'])

        console.log("---END getKeycards()---")
  }

  ngOnInit() {
    this.getKeycards();
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

  
  @ViewChild('modal')
    modal: ModalComponent;
    items: string[] = ['item1', 'item2', 'item3'];
    selected: string;
    output: string;

    index: number = 0;
    backdropOptions = [true, false, 'static'];

    animation: boolean = true;
    keyboard: boolean = true;
    backdrop: string | boolean = true;

    closed() {
      this.output = '(closed) ' + this.selected;
    }

    dismissed() {
        this.output = '(dismissed)';
        this.getKeycards();
    }

    opened() {
        this.output = '(opened)';
        this.getMemberByUseflg();
    }

    navigate() {
        this.router.navigateByUrl('/hello');
    }

    open() {
        this.modal.open();
    }

}
