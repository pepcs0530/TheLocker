import { Component, OnInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgModule, Directive, Input, Output} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule,Router,Routes,ActivatedRoute} from "@angular/router";
import { FormsModule } from '@angular/forms';

import { AppModule } from '../app.module';
import { Observable } from "rxjs/Observable";

import { MemberService } from '../member.service';
import { Member } from '../member';

import { PagerService } from '../pager.service';

import {ModalModule} from '../../../src/ng2-bs4-modal/ng2-bs4-modal.module';

import { ModalComponent } from "../../ng2-bs4-modal/components/modal";

import { Ng2DropdownModule } from 'ng2-material-dropdown';

//import { AddEmployeesComponent } from '../add-employees/add-employees.component';

@NgModule({
  imports: [ BrowserModule,FormsModule ],
  declarations: [ MembersComponent ],
  bootstrap: [ MembersComponent ]
})

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers: [MemberService, PagerService]
})
export class MembersComponent implements OnInit {

  members: Member[];
  editMembers: Member[];
  member: Member;
  id: any;
  tname: string;
  fname: string;
  lname: string;
  age: string;
  email: string;

  birthDate:Object;

  selDate:Object;
  
  editid: any;
  editgen: any;
  edittname: any;
  editfname: any;
  editlname: any;
  editage: any;
  editemail: any;
  edituseflg: any;
  memberForm: FormGroup;

  title: string;

  //filter
  /*filteredItems : Member[];
  inputName : string = '';*/

  //pagination
  /*pages : number = 2;
  pageSize : number = 2;
  pageNumber : number = 0;
  currentIndex : number = 1;
  pagesIndex : Array<number>;
  pageStart : number = 1;*/

  // array of all items to be paged
  private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  //filter
  inputName: any = { mem_fname: '' };

  ses_value : string;
  ses_nameValue : string

  //dropdown pagesize
  pageSizeList: any;  
  inputPageSize:number=5; 

  constructor(private memberService: MemberService, private pagerService: PagerService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private elementRef:ElementRef,
    private router: Router) { 
      //this.filteredItems = this.members;

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

  /*init(){
    this.currentIndex = 1;
    this.pageStart = 1;
    this.pages = 2;

    console.log(this.filteredItems);

    this.pageNumber = parseInt(""+ (this.filteredItems.length / this.pageSize));
    if(this.filteredItems.length % this.pageSize != 0){
      this.pageNumber ++;
    }

    if(this.pageNumber  < this.pages){
          this.pages =  this.pageNumber;
    }
  
    this.refreshItems();
    console.log("this.pageNumber :  "+this.pageNumber);
  }*/

  click(member: Member): void {
    console.log('mem_gen : '+member.mem_gen);
  }

  logout(){
    document.cookie = 'sessionID' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    console.log('logout!');
    this.router.navigate(['/']);
  }

  //// get list of members
  getMembers(): void {
    console.log("---START getMembers()---")

   this.memberService.getMembers()
        .subscribe(
            resultArray => {
              this.members = resultArray;
              console.log(resultArray);

              //this.filteredItems = resultArray;
              //console.log(this.filteredItems);

              this.allItems = resultArray;

              // initialize to page 1
              this.setPage(1);
            },
            error => console.log("Error :: " + error)
        ) 
        this.router.navigate(['/members'])

        console.log("---END getMembers()---")
  }

  /// delete member 
  deleteMember(deleteMemberGen: number) {
    console.log("---START deleteMember()---")

    if (confirm("Are you sure you want to delete ?")) {
      this.memberService.deleteMember(deleteMemberGen).subscribe(
         data => {
          alert('ลบข้อมูลเรียบร้อย');
         },
         error => {
           console.error("Error deleting member!");
           return Observable.throw(error);
         }
      );
      this.getMembers();
    }

    console.log("---END deleteMember()---")
  }

  ngOnInit() {
    this.getMembers();
    this.getPageList();  
  }

  /*refreshItems(){
    this.members = this.filteredItems.slice((this.currentIndex - 1)*this.pageSize, (this.currentIndex) * this.pageSize);
    this.pagesIndex =  this.fillArray();
  }*/

  /*fillArray(): any{
    var obj = new Array();
    for(var index = this.pageStart; index< this.pageStart + this.pages; index ++) {
        obj.push(index);
    }
    return obj;
  }*/

  /*FilterByName(){
    this.filteredItems = [];
    if(this.inputName != ""){
      this.members.forEach(element => {
              if(element.mem_fname.toUpperCase().indexOf(this.inputName.toUpperCase())>=0){
                this.filteredItems.push(element);
             }
          });
    }else{
       this.filteredItems = this.members;
    }
    console.log(this.filteredItems);
    console.log(this.filteredItems.length);
    this.init();
  }*/

 /*prevPage(){
  if(this.currentIndex>1){
     this.currentIndex --;
  } 
  if(this.currentIndex < this.pageStart){
     this.pageStart = this.currentIndex;
  }
  this.refreshItems();
 }*/

 /*nextPage(){
  if(this.currentIndex < this.pageNumber){
        this.currentIndex ++;
  }
  if(this.currentIndex >= (this.pageStart + this.pages)){
     this.pageStart = this.currentIndex - this.pages + 1;
  }

  this.refreshItems();
 }*/

 /*setPage(index : number){
    this.currentIndex = index;
    this.refreshItems();
 }*/

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

  @ViewChild('modal')
    modal: ModalComponent;
    modalEdit: ModalComponent;
    //modal : ElementRef;
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
      //this.createMember();
    }

    dismissed() {
        this.output = '(dismissed)';
    }

    opened() {
        this.output = '(opened)';
    }

    navigate() {
        this.router.navigateByUrl('/hello');
    }

    open() {
      this.modal.open();
    }

    editMember(id:any){
      if (id){
        this.memberService.getMemberById(id)
        .subscribe(
          members => {
            this.editMembers = members;
            // console.log(employees[0])
            this.editid = members[0].mem_id;
            this.edittname = members[0].mem_tname;
            this.editfname = members[0].mem_fname;
            this.editlname = members[0].mem_lname;
            this.editage = members[0].mem_age;
            this.editemail = members[0].mem_email;
            this.edituseflg = members[0].mem_useflg;
            this.editMembers.push(this.member = members[0]);
            const tempdate = new Date(members[0].mem_birthdate);
            this.selDate = {year: tempdate.getFullYear()
                , month: tempdate.getMonth() + 1
                , day: tempdate.getDate()};
            // tslint:disable-next-line:no-unused-expression
            data => {};
          });

        this.editgen = id;

      }
    }

    createMember() {
      console.log("---START createMember---")

      const newMember ={
        mem_id: this.id,
        mem_tname: this.tname,
        mem_fname: this.fname,
        mem_lname: this.lname,
        mem_age: this.age,
        mem_email: this.email,
        mem_useflg: "1",
        mem_birthdate: this.birthDate["year"]
        +"-"+
        (this.birthDate["month"] < 10 ? '0'+this.birthDate["month"] : this.birthDate["month"])
        +"-"+
        (this.birthDate["day"] < 10 ? '0'+this.birthDate["day"] : this.birthDate["day"])
      }

      this.memberService.createMember(newMember).subscribe(
        data => {
          alert('เพิ่มข้อมูลเรียบร้อย');
          this.getMembers();
        },
        error => {
          console.error("Error adding member!");
          return Observable.throw(error);
        }
      );
      //this.router.navigate(['/members'])

      console.log("---END createMember---")
    }

    updateMember(memGen) {

      console.log("---START updateMember---")
      const editMember ={
        mem_id: this.editid,
        mem_tname: this.edittname,
        mem_fname: this.editfname,
        mem_lname: this.editlname,
        mem_age: this.editage,
        mem_email: this.editemail,
        mem_uselfg: this.edituseflg,
        mem_birthdate: this.selDate["year"]
        +"-"+
        (this.selDate["month"] < 10 ? '0'+this.selDate["month"] : this.selDate["month"])
        +"-"+
        (this.selDate["day"] < 10 ? '0'+this.selDate["day"] : this.selDate["day"])
      }
        this.memberService.updateMember(editMember,memGen).subscribe(
          data => {
           alert('ปรับปรุงข้อมูลเรียบร้อย');
           this.getMembers();
          },
          error => {
            console.error("Error updating member!");
            return Observable.throw(error);
          }
        );
        //this.router.navigate(['/members'])
  
        console.log("---END updateMember---")
    }

    /*private onDateChanged(event){
      this.birthDate = event.date;
    }*/

    private onBirthDateChanged(event){
      this.birthDate = event.date;
    }

    private onSelDateChanged(event){
      this.selDate = event.date;
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
      //alert(this.inputPageSize);
      this.setPage(1);
    } 

    data = <any>{
    };
    searchMember(keyword:string){
      
      this.data = {
        keyword : keyword
      }
      //alert(this.data.keyword);
      console.log("---START searchMember()---")

      const findMember ={
        keyword: this.data.keyword
      }

        this.memberService.getMemberByCond(findMember)
        .subscribe(

            ////////////////////////////

          data => {
            console.log(data);
            if(data[0] != null){
              //document.cookie += "userName="+data[0].mem_tname + "" + data[0].mem_fname + " " + data[0].mem_lname + ";";
              //console.log('login successfully, welcome ' + data[0].mem_fname);
              //this.router.navigate(['/members'])
              this.allItems = data;

              // initialize to page 1
              this.setPage(1); 
            }else{
              //console.log('login failed, try again');
              alert('ไม่พบข้อมูล');
              //this.router.navigate(['/'])
            }
          },
          error => console.log("Error :: " + error)
            //////////////////////////
        ) 
        //this.router.navigate(['/members'])
        //this.getMembers();        
      
        console.log("---END searchMember()---")
    }
}
