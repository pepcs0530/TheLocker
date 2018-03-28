import { Component, OnInit, group, Input, Output } from '@angular/core';
import { MemberService } from '../../member.service';
import { Member } from '../../member';
import { Observable } from "rxjs/Observable";
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgModule, Directive } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule,Router,Routes,ActivatedRoute } from "@angular/router";

import { FormsModule } from '@angular/forms';
import { MembersComponent } from '../../members/members.component';

import { IMyOptions } from 'mydatepicker';    

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.css']
})

@NgModule({
  imports: [ BrowserModule,FormsModule ],
  declarations: [ AddMembersComponent ],
  bootstrap: [ AddMembersComponent ],
  
})

export class AddMembersComponent implements OnInit {

    member: Member;
    id: any;
    tname: string;
    fname: string;
    lname: string;
    age: any;
    email: string;
    title: string;

    private myDatePickerOptions: IMyOptions = {
        dateFormat: 'dd/mm/yyyy',
    };  

    private birthDate:Object;

    //public model: any = { date: { year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDay() } };
    //public model: any = { date: { year: 2018, month: 9, day: 2 } };

    //public model: any = {}

  constructor(
    formBuilder: FormBuilder,
    private __memberService: MemberService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  //// adding new member
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

      this.__memberService.createMember(newMember).subscribe(
        data => {
          alert('เพิ่มข้อมูลเรียบร้อย');
        },
        error => {
          console.error("Error adding member!");
          return Observable.throw(error);
        }
      );
    
    this.router.navigate(['/members'])

    console.log("---END createMember---")
  }

  ngOnInit() {
    console.log("---START ngOnInit add member data---")

    var id = this.route.params.subscribe(params => {
      var id = params['mem_gen'];
      console.log("id = "+id)
      this.title = id ? 'แก้ไขข้อมูลผู้ใช้' : 'เพิ่มข้อมูลผู้ใช้';

    });

    console.log("---END ngOnInit add member data---")

    //let date = new Date();
    /*let now = new Date();

    let options = {  
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };

    now.toLocaleString('thai', options); 

    console.log(now.toLocaleString('thai', options));
    console.log(new Date().getFullYear());
    console.log(new Date().getMonth() + 1);
    console.log(new Date().getDate());*/

    //this.model = { date: { year: new Date().getFullYear(), month: new Date().getMonth()+1, day: new Date().getDate() } };
    this.birthDate = { year: new Date().getFullYear(), month: new Date().getMonth()+1, day: new Date().getDate() }
  }

  private onDateChanged(event){
    this.birthDate = event.date;
  }

}
