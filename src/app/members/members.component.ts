import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgModule, Directive} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule,Router,Routes} from "@angular/router";
import { FormsModule } from '@angular/forms';

import { AppModule } from '../app.module';
import { Observable } from "rxjs/Observable";

import { MemberService } from '../member.service';
import { Member } from '../member';

import { PagerService } from '../pager.service';

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

  constructor(private memberService: MemberService, private pagerService: PagerService,
    private formBuilder: FormBuilder,
    private router: Router) { 
      //this.filteredItems = this.members;

      var x = document.cookie.split(';');
      var i = 0;
      var cookieValue;
      for(; i<x.length; i++){
        if(x[i].split('=')[0].trim() == 'sessionID'){
          cookieValue = x[i].split('=')[1];
          break;
        }
      }
      if(cookieValue === undefined){
        this.router.navigate(['/']);
      }else{
        var myRes = atob(cookieValue).split('??');
        console.log(myRes);
        if(atob(myRes[0]) == 'admin' && atob(myRes[1]) == '1234'){

        }else{
          this.router.navigate(['/']);
        }
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
              //this.init();

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
    this.getMembers()
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
    this.pager = this.pagerService.getPager(this.allItems.length, page);
    console.log(this.pager)

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(this.pagedItems)

    this.members = this.pagedItems;
  }

}
