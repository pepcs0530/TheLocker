import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RouterModule,Router,Routes } from '@angular/router';

import{ Cookie } from 'ng2-cookies/ng2-cookies';

import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MemberService]
})
export class LoginComponent implements OnInit {

  member: Member[];

  ses_value : string;
  ses_nameValue : string

  constructor( private formBuilder: FormBuilder,
    private router: Router, private memberService: MemberService) { 

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
        /*if(atob(myRes[0]) == 'admin' && atob(myRes[1]) == '1234'){
          this.router.navigate(['/members']);
        }else{
          this.router.navigate(['/']);
        }*/
        this.router.navigate(['/members']);
      }

    }

  ngOnInit() {
  }

  
  data = <any>{
  };

  formSubmit(){
    //alert('formSubmit');
    console.log(this.data);

    var uname = this.data.username;
    var pass = this.data.password;
    
    if(uname === undefined || pass === undefined){
      alert('กรุณากรอก username / password ให้ถูกต้อง');
      return false;
    }

    var key = btoa(btoa(uname) + '??' + btoa(pass));

    console.log(key);
    document.cookie = "sessionID="+ key + ';';

    console.log(this.getMemberByUsernamePassword(this.data));

    /*if(uname == "admin" && pass == "1234"){
      console.log('login successfully, welcome '+this.data.username);
      this.router.navigate(['/members'])
    }else{
      console.log('login failed, try again');
      this.data.username = "";
      this.data.password = "";
      this.router.navigate(['/'])
    }*/

  }

  //// get members by username password
  getMemberByUsernamePassword(data): any {

    console.log(data.username);
    console.log(data.password);

    const findMember ={
      mem_uname: this.data.username,
      mem_pass: this.data.password
    }

    return this.memberService.getMemberByUsernamePassword(findMember)
        .subscribe(
          /*resultArray => {
            //this.members = resultArray;
            console.log(resultArray);
            this.member = resultArray;
            console.log(this.member);
          },*/
          data => {
            console.log(data);
            if(data[0] != null){
              document.cookie += "userName="+data[0].mem_tname + "" + data[0].mem_fname + " " + data[0].mem_lname + ";";
              console.log('login successfully, welcome ' + data[0].mem_fname);
              this.router.navigate(['/members'])
            }else{
              console.log('login failed, try again');
              alert('กรุณาตรวจสอบ username / password');
              this.router.navigate(['/'])
            }
          },
          error => console.log("Error :: " + error)
        )    
  }
}
