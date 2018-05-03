import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'The Locker Management';

  ngAfterViewInit(){
    var s=document.createElement("script");
    s.type="text/javascript";
    s.innerHTML="alert('done');"; //inline script
    //s.src="../../node_modules/rc522-rfid/main.js"; //external script
    s.src="../assets/rc522-rfid/main.js"; //external script
  }
}
