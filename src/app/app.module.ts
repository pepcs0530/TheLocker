import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {ModalModule} from '../../src/ng2-bs4-modal/ng2-bs4-modal.module';

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
import { KeycardService } from './keycard.service';

import { EditMembersComponent } from './members/edit-members/edit-members.component';
import { AddMembersComponent } from './members/add-members/add-members.component';

import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { LoginComponent } from './login/login.component';
import { LockersComponent } from './lockers/lockers.component';
import { KeycardsComponent } from './keycards/keycards.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserDetailComponent,
    MessagesComponent,
    DashboardComponent,
    MembersComponent,
    EditMembersComponent,
    AddMembersComponent,
    LoginComponent,
    LockersComponent,
    KeycardsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    Ng2FilterPipeModule,
    ModalModule
  ],
  providers: [ UserService, MessageService, MemberService, KeycardService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }