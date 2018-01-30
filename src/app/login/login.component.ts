import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RouterModule,Router,Routes } from '@angular/router';

import{ Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private formBuilder: FormBuilder,
    private router: Router) { 

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
          this.router.navigate(['/members']);
        }else{
          this.router.navigate(['/']);
        }
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
    var key = btoa(btoa(uname) + '??' + btoa(pass));

    console.log(key);
    document.cookie = "sessionID="+ key + ';';

    if(uname == "admin" && pass == "1234"){
      console.log('login successfully, welcome '+this.data.username);
      this.router.navigate(['/members'])
    }else{
      console.log('login failed, try again');
      this.data.username = "";
      this.data.password = "";
      this.router.navigate(['/'])
    }

  }
}
