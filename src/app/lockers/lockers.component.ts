import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgModule, Directive} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Router, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LockerService } from '../locker.service';
import { Member } from '../member';

import { PagerService } from '../pager.service';
import { Locker } from '../locker';

import { Observable } from 'rxjs/Observable';

import { ReportService } from '../report.service';

import {ModalModule} from '../../../src/ng2-bs4-modal/ng2-bs4-modal.module';

import { ModalComponent } from '../../ng2-bs4-modal/components/modal';

@NgModule({
  imports: [ BrowserModule, FormsModule ],
  declarations: [ LockersComponent ],
  bootstrap: [ LockersComponent ]
})

@Component({
  selector: 'app-lockers',
  templateUrl: './lockers.component.html',
  styleUrls: ['./lockers.component.css'],
  providers: [LockerService, PagerService, ReportService]
})
export class LockersComponent implements OnInit {

  lockers: Locker[];
  editLockers: Locker[];

  ses_value: string;
  ses_nameValue: string;

  // array of all items to be paged
  private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  //filter
  inputName: any ;

  //dropdown pagesize
  pageSizeList: any;  
  inputPageSize:number=5; 


  editId: any;
  editGen: any;
  editName: any;
  editStatus: any;
  editRfidGen: any;
  lockerForm: FormGroup;

  constructor(private lockerService: LockerService, private pagerService: PagerService, private reportService: ReportService,
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
    this.getLockers();
    this.getPageList();
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
    this.pager = this.pagerService.getPager(this.allItems.length, page, this.inputPageSize);
    console.log(this.pager)

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(this.pagedItems)

    this.lockers = this.pagedItems;
  }

  /// call report 
  report1() {
    

    /*console.log("---START report()---")
    this.lockerService.callReport().subscribe(
      data => {
        alert('ออกรายงาน');
      },
      error => {
        console.error("Error call report!");
        //return Observable.throw(error);
      }
    )
    ;

    console.log("---END report()---")*/

    console.log("---START report()---");

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:5488/api/report', true)
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
    xhr.responseType = 'arraybuffer'
    xhr.onload = function(e) {
        console.log(this);
        if (xhr.status == 200) {
            console.log(window);
            //window.open("data:application/pdf;base64," + window.btoa(String.fromCharCode.apply(null, new Uint8Array(xhr.response))), '_blank');
            
            //window.open("https://www.w3schools.com");

            // var html = '<html>' +
            // '<style>html,body {padding:0;margin:0;} iframe {width:100%;height:100%;border:0}</style>' +
            // '<body>' +                                
            // '<iframe type="application/pdf" src="' +  '"data:application/pdf;base64,"' + window.btoa(String.fromCharCode.apply(null, new Uint8Array(xhr.response))) + '"></iframe>' +
            // '</body></html>';

            // var a = window.open("about:blank", "Report");
            // a.document.write(html);
            // a.document.close();

            //window.location.href = ("data:application/pdf;base64," + window.btoa(String.fromCharCode.apply(null, new Uint8Array(xhr.response))));


            //-------------------------------------------------------------------------------------------

            //openWindowWithPost("http://localhost:5488/api/report/Invoice", {
            //    p: "view.map",
            //    coords: encodeURIComponent(coords)
            //});

            //openWindowWithPost(url, data) {
              /*var form = document.createElement("form");
              form.target = "_blank";
              form.method = "POST";
              form.action = "http://localhost:5488/api/report/Invoice";
              form.style.display = "none";

              var data = {
                    p: "view.map",
                    coords: encodeURIComponent("data:application/pdf;base64," + window.btoa(String.fromCharCode.apply(null, new Uint8Array(xhr.response))))
              }
          
              for (var key in data) {
                  var input = document.createElement("input");
                  input.type = "hidden";
                  input.name = key;
                  input.value = data[key];
                  form.appendChild(input);
              }
          
              document.head.setAttribute("Content-Type", "application/pdf");
              document.body.appendChild(form);
              form.submit();
              document.body.removeChild(form);*/
            //}

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
            win.document.title = "My Title";
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

    console.log("---END report()---");
  }

  report() {
    console.log("---START generateReport()---");

    //this.reportService.getReport();

    console.log("---END generateReport()---");
  }

  data = <any>{
  };
  searchLocker(keyword:string){
    
    console.log("---START searchLocker()---")
    this.data = {
      keyword : keyword
    }
    const findMember ={
      keyword: this.data.keyword
    }

    this.lockerService.getLockerByCond(findMember)
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
    console.log("---END searchLocker()---")
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

  selectPageSize(){
    // alert(this.inputPageSize);
    this.setPage(1);
  }

  click(locker: any) {
    // alert(locker);
  }

  editLocker(id: any) {
    if (id) {
      this.lockerService.getLockerByPk(id)
        .subscribe(
          lockers => {
            this.editLockers = lockers;
            this.editId = lockers[0].loc_id;
            this.editName = lockers[0].loc_name;
            this.editStatus = lockers[0].loc_status;
            this.editRfidGen = lockers[0].rfid_gen;
          }
        );

        this.editGen = id;
    }
  }

  updateLocker(id: any) {
    console.log('---START updateLocker---');

    const editLocker = {
      loc_status: this.editStatus,
      mem_gen: null
    };
    this.lockerService.updateLocker(editLocker, id).subscribe(
      data => {
        alert('ปรับปรุงข้อมูลเรียบร้อย');
        this.getLockers();
       },
       error => {
         console.error('Error updating locker!');
         return Observable.throw(error);
       }
    );

    console.log('---END updateLocker---');
  }

  setStatus(status: string) {
    this.editStatus = status;
    // alert(this.editStatus);
  }

  // tslint:disable-next-line:member-ordering
  @ViewChild('modal')
    modal: ModalComponent;
    // tslint:disable-next-line:member-ordering
    modalEdit: ModalComponent;
    // modal : ElementRef;
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
      // this.createMember();
    }

    dismissed() {
        this.output = '(dismissed)';
    }

    opened() {
        this.output = '(opened)';
    }

    navigate() {
        this.router.navigateByUrl('/');
    }

    open() {
      this.modal.open();
    }

}
