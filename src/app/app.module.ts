import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MembersComponent } from './members/members.component';

import { UserService } from './user.service';
import { MessageService } from './message.service';
import { MemberService } from './member.service';
import { EditMembersComponent } from './members/edit-members/edit-members.component';
import { AddMembersComponent } from './members/add-members/add-members.component';

import { Ng2FilterPipeModule } from 'ng2-filter-pipe';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserDetailComponent,
    MessagesComponent,
    DashboardComponent,
    MembersComponent,
    EditMembersComponent,
    AddMembersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    Ng2FilterPipeModule
  ],
  providers: [ UserService, MessageService, MemberService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }