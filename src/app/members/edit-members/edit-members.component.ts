import { Component, OnInit } from '@angular/core';
import { Observable} from "rxjs/Observable";
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RouterModule,Router,Routes,ActivatedRoute } from "@angular/router";

import { MemberService } from '../../member.service';
import { Member } from '../../member';
import { IMyOptions } from 'mydatepicker';    

@Component({
  selector: 'app-edit-members',
  templateUrl: './edit-members.component.html',
  styleUrls: ['./edit-members.component.css']
})
export class EditMembersComponent implements OnInit {


  private myDatePickerOptions: IMyOptions = {
      dateFormat: 'dd/mm/yyyy',
  };  
  
  selDate:Object;
  
  editMembers: Member[];
  member: Member;
  editid: any;
  editgen: any;
  edittname: any;
  editfname: any;
  editlname: any;
  editage: any;
  editemail: any;
  edituseflg: any;
  title: string;
  memberForm: FormGroup;

  constructor(
    private __memberService: MemberService,
    private router: Router,
    private route: ActivatedRoute,) { }

  private onDateChanged(event){
    this.selDate = event.date;
  }

  /// update member data
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
      this.__memberService.updateMember(editMember,memGen).subscribe(
        data => {
         alert('ปรับปรุงข้อมูลเรียบร้อย');
        },
        error => {
          console.error("Error updating member!");
          return Observable.throw(error);
        }
      );
      this.router.navigate(['/members'])

      console.log("---END updateMember---")
  }

  ngOnInit() {
    console.log("---START ngOnInit update member data---")

    var id = this.route.params.subscribe(params => {
      var id = params['mem_gen'];
      console.log('log'+id)
      //console.log(id)
      this.title = id ? 'แก้ไขข้อมูลผู้ใช้' : 'เพิ่มข้อมูลผู้ใช้';

      if (id){
        this.__memberService.getMemberById(id)
        .subscribe(
          members =>{ 
            this.editMembers = members  
            //console.log(employees[0])
            this.editid = members[0].mem_id
            this.edittname = members[0].mem_tname
            this.editfname = members[0].mem_fname
            this.editlname = members[0].mem_lname
            this.editage = members[0].mem_age
            this.editemail = members[0].mem_email,
            this.edituseflg = members[0].mem_useflg
            this.editMembers.push(this.member = members[0])
            let tempdate = new Date(members[0].mem_birthdate); 
            this.selDate = {year: tempdate.getFullYear()
                , month: tempdate.getMonth() + 1
                , day: tempdate.getDate()}
            data => {}
          })
        
        this.editgen = id
       
      }
     
    });

    console.log("---END ngOnInit update member data---")
  }

}
