import { Component, OnInit } from '@angular/core';
import { Observable} from "rxjs/Observable";
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RouterModule,Router,Routes,ActivatedRoute } from "@angular/router";

import { MemberService } from '../../member.service';
import { Member } from '../../member';

@Component({
  selector: 'app-edit-members',
  templateUrl: './edit-members.component.html',
  styleUrls: ['./edit-members.component.css']
})
export class EditMembersComponent implements OnInit {

  editMembers: Member[];
  member: Member;
  editid: any;
  editgen: any;
  edittname: any;
  editfname: any;
  editlname: any;
  editage: any;
  editemail: any;
  title: string;
  memberForm: FormGroup;

  constructor(
    private __memberService: MemberService,
    private router: Router,
    private route: ActivatedRoute,) { }

  /// update member data
  updateMember(memGen) {

    console.log("---START updateMember---")
    
    const editMember ={
      mem_id: this.editid,
      mem_tname: this.edittname,
      mem_fname: this.editfname,
      mem_lname: this.editlname,
      mem_age: this.editage,
      mem_email: this.editemail
    }
      this.__memberService.updateMember(editMember,memGen).subscribe(
        data => {
          //console.log(data)
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
            this.editemail = members[0].mem_email
            this.editMembers.push(this.member = members[0])
            data => {}
          })
        
        this.editgen = id
       
      }
     
    });

    console.log("---END ngOnInit update member data---")
  }

}