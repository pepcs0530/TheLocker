import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgModule, Directive} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule,Router,Routes,ActivatedRoute} from "@angular/router";
import { FormsModule } from '@angular/forms';
import { Observable} from "rxjs/Observable";

import { LockerService } from '../locker.service';
import { Member } from '../member';
import { Keycard } from '../keycard';
import { CurrentTaggingKeycard } from '../currentTaggingKeycard';

import { PagerService } from '../pager.service';
import { Locker } from '../locker';

import { MemberService } from '../member.service';
import { KeycardService } from '../keycard.service';

import {ModalModule} from '../../../src/ng2-bs4-modal/ng2-bs4-modal.module';

import { ModalComponent } from "../../ng2-bs4-modal/components/modal";

//import rfid from 'node-rfid';
//import rfid = require('rc522-rfid');

//import { HttpEventService } from '../../../node_modules/angular2-http-event/http-event.service';

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

  //inputKeyId: any = { rfid_id: '' };
  inputKeyId: any = { };

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

   //filter-rfid
  inputName2: any = { mem_fname: '' };

  //dropdown pagesize
  pageSizeList: any;  
  inputPageSize:number=5; 

  pageSizeList2: any;  
  inputPageSize2:number=5; 

  constructor(private lockerService: LockerService, 
    private pagerService: PagerService,
    private memberService: MemberService,
    private keycardService: KeycardService,
    private formBuilder: FormBuilder,
    //private httpEvent: HttpEventService,
    private route: ActivatedRoute,
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
    console.log('---START getMemberByUseflg()---');

   this.memberService.getMemberByUseflg()
        .subscribe(
            resultArray => {
              this.members = resultArray;
              console.log(resultArray);
              // this.filteredItems = resultArray;
              // console.log(this.filteredItems);
              // this.init();

              this.allItems = resultArray;

              // initialize to page 1
              this.setPage(1);
            },
            error => console.log('Error :: ' + error)
        );
        // this.router.navigate(['/members'])

        console.log('---END getMemberByUseflg()---');
  }

  /// update useflg member data
  updateUseflgMember(memGen, memUseflg) {

    console.log("---START updateUseflgMember---")
    
    const editMember = {
      /*mem_id: this.editid,
      mem_tname: this.edittname,
      mem_fname: this.editfname,
      mem_lname: this.editlname,
      mem_age: this.editage,
      mem_email: this.editemail,*/
      mem_useflg: memUseflg
    }

    const newKeycard = {
      rfid_id: this.inputKeyId.rfid_id,
      rfid_status: '1',
      mem_gen: memGen
    };

      this.memberService.updateUseflgMember(editMember ,memGen).subscribe(
        data => {
          // console.log(data)
          alert('Update flg done.');
          alert(data);
        },
        error => {
          console.error('Error updating member!');
          return Observable.throw(error);
        }
      );
      //this.router.navigate(['/members'])

      console.log("---END updateUseflgMember---")
  }

  //// adding new keycard
  createKeycard(memGen) {

    console.log("---START createKeycard---")

    const newKeycard ={
      rfid_id: this.inputKeyId.rfid_id,
      rfid_status: "1",
      mem_gen: memGen
    }

      this.keycardService.createKeycard(newKeycard).subscribe(
        data => {
          alert(data);
          alert('เพิ่มข้อมูลเรียบร้อย');
          //console.log(data);
          this.getKeycards();
          return true;
        },
        error => {
          console.error("Error adding keycard!");
          return Observable.throw(error);
        }
      );
    
    //this.router.navigate(['/members'])
    //this.getKeycards();

    console.log("---END createKeycard---")
  }

  /// delete keycard
  deleteRightMember(deleteKeycardGen: number, deleteMemberGen: number) {
    console.log('---START deleteKeycard()---');

    if (confirm('Are you sure you want to delete ?')) {
      this.updateUseflgMember(deleteMemberGen, '1');
      this.keycardService.deleteKeycard(deleteKeycardGen).subscribe(
         data => {
          alert(data);
          alert('ลบข้อมูลเรียบร้อย');
          this.getKeycards();
          return true;
         },
         error => {
           console.error('Error deleting keycard!');
           return Observable.throw(error);
         }
      );
    }
    
    //this.getKeycards();
    //this.router.navigate(['/keycards'])
    console.log("---END deleteKeycard()---")
  }

  addRightMember(addRightMemberGen: number) {
    this.data = {
      keyword : this.inputKeyId.rfid_id
    }

    console.log('---START addRightMember()---');

    // this.router.navigate(['/lockers']);
    this.modal.close();
    console.log('addRightMemberGen : ', addRightMemberGen);

    // เช็ค rfid_id ซ้ำ
    const findMember = {
      keyword: this.data.keyword
    }
    this.keycardService.getKeycardForCheckDup(findMember).subscribe(
      data => {
        console.log(data);
        if(data[0] != null) {
          alert('key ซ้ำ');
          // return false;
        } else {
          

          this.createKeycard(addRightMemberGen);
          this.updateUseflgMember(addRightMemberGen, '0');

          this.keycardService.deleteCurrentTaggingKeycards().subscribe(
            data => {
            // alert(data);
            // alert('ลบข้อมูลเรียบร้อย');
            // this.getKeycards();
            this.inputKeyId.rfid_id = '';
            // return true;
            },
            error => {
              console.error('Error deleteCurrentTaggingKeycards!');
              return Observable.throw(error);
            }
        );
      }
    },
      error => console.log('Error :: ' + error)
    ) ;

    // this.getKeycards();

    console.log('---END addRightMember()---');
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
    this.pager = this.pagerService.getPager(this.allItems.length, page, this.inputPageSize);
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
    this.pager2 = this.pagerService.getPager(this.allItems2.length, page, this.inputPageSize2);
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

  data = <any>{
  };
  searchKeycard(keyword:string){
    
    console.log("---START searchKeycard()---")
    this.data = {
      keyword : keyword
    }
    const findMember ={
      keyword: this.data.keyword
    }

    this.keycardService.getKeycardByCond(findMember)
        .subscribe(
          data => {
            console.log(data);
            if(data[0] != null){
              this.allItems2 = data;
              this.setPage2(1); 
            }else{
              alert('ไม่พบข้อมูล');
            }
          },
          error => console.log("Error :: " + error)
        ) 
    console.log("---END searchKeycard()---")
  }

  searchRightMember(keyword:string){
    
    console.log("---START searchRightMember()---")
    this.data = {
      keyword : keyword
    }
    const findMember ={
      keyword: this.data.keyword
    }

    this.keycardService.getRightMemberByCond(findMember)
        .subscribe(
          data => {
            console.log(data);
            if(data[0] != null){
              this.allItems = data;
              this.setPage(1); 
            }else{
              alert('ไม่พบข้อมูล');
            }
          },
          error => console.log("Error :: " + error)
        ) 
    console.log("---END searchRightMember()---")

  }

  //dropdown pagesize
  getPageList(){   
    this.pageSizeList=[    
      {    
        "Id": 1,    
        "Name": "1"    
      },    
      {    
        "Id": 5,    
        "Name": "5"    
      },    
      {    
        "Id": 10,    
        "Name": "10"    
      },    
      {    
        "Id": 15,    
        "Name": "15"    
      },    
      {    
        "Id": 30,    
        "Name": "30"    
      },    
      {    
        "Id": 50,    
        "Name": "50"    
      }        
    ]  
  }

  getPageList2(){   
    this.pageSizeList2=[    
      {    
        "Id": 1,    
        "Name": "1"    
      },    
      {    
        "Id": 5,    
        "Name": "5"    
      },    
      {    
        "Id": 10,    
        "Name": "10"    
      },    
      {    
        "Id": 15,    
        "Name": "15"    
      },    
      {    
        "Id": 30,    
        "Name": "30"    
      },    
      {    
        "Id": 50,    
        "Name": "50"    
      }        
    ]  
  }

  selectPageSize(){
    //alert(this.inputPageSize);
    this.setPage(1);
  } 

  selectPageSize2(){
    //alert(this.inputPageSize);
    this.setPage2(1);
  } 

  ngOnInit() {
    this.getKeycards();
    this.getPageList2();

    // if(document.getElementById("testScript")){
    //   document.getElementById("testScript").remove();
    // }
    // var testScript = document.createElement("script");
    // testScript.setAttribute("id", "testScript");
    // testScript.setAttribute("src", "../../assets/rc522-rfid/main.js");
    // testScript.setAttribute("src", "../../assets/rc522-rfid/rfid.js");
    // testScript.setAttribute("src", "../../assets/rc522-rfid/rfid.js");
    // var content = "console.log('test rfid'); ";
    // var content = "alert('test rfid'); var rc522 = require('rc522-rfid'); ";
    // testScript.appendChild(document.createTextNode(content));
    // testScript.appendChild(document.createTextNode("alert('test rfid')1"));
    // testScript.appendChild(document.createTextNode("var rc522 = require('rc522-rfid);"));
    // testScript.appendChild(document.createTextNode("rc522(function(rfidSerialNumber){console.log(rfidSerialNumber);});"));
    // document.body.appendChild(testScript);

    
    //this.httpEvent.httpEventCenter.subscribe((type: HttpEventType) => {
      // event handler here...
    //});

    /*var id = this.route.params.subscribe(params => {
      var id = params['rfid_id'];
      console.log('log : '+id);
      if(id!=undefined){
        this.inputKeyId.rfid_id = "test";
      }
    });*/
  }

  logout(){
    document.cookie = 'sessionID' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    console.log('logout!');
    this.router.navigate(['/']);
  }

  readKeyId(): void {
    console.log('call rfid reader and get key id.');
    //this.inputKeyId.rfid_id = 'RFID0001';

    //var rfid=require('node-rfid');
 
    /* rfid.read(function(err,result){
        if(err) console.log("Sorry, some hardware error occurred"); //some kind of hardware/wire error
        console.log(result); //print rfid tag UID
    }); */

    this.keycardService.getCurrentTaggingKeycards()
        .subscribe(
            resultArray => {
              console.log(resultArray);
              if(resultArray[0] == undefined){
                alert('ไม่พบข้อมูล key');
                this.inputKeyId.rfid_id = '';
              }else{
                this.inputKeyId.rfid_id = resultArray[0].cur_tag_id;
              }
              
              //this.filteredItems = resultArray;
              //console.log(this.filteredItems);
              //this.init();

              //this.allItems2 = resultArray;

              // initialize to page 1
              //this.setPage2(1);
              
            },
            error => console.log("Error :: " + error)
        ) 

  }

  sleep (time) {
    console.log('sleep...');
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  checkKeyId(keyid:string){
    //alert(keyid);
    if(keyid == ''){
      alert('กรุณาระบุ keyid');
      return false;
    }else{
      return true;
    }
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
        this.getPageList();

        /*alert(this.inputKeyId.rfid_id);*/
        if(this.inputKeyId.rfid_id == ''){
          alert('กรุณาระบุ keyid');
          this.modal.close();
        }
    }

    navigate() {
        this.router.navigateByUrl('/hello');
    }

    open() {
        this.modal.open();
    }

}
