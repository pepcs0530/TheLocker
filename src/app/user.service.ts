import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { User } from './user';
import { USERS } from './mock-users';
import { MessageService } from './message.service';

@Injectable()
export class UserService {

  //constructor() { }
  constructor(private messageService: MessageService) { }

  getUser(id: number): Observable<User> {
    // Todo: send the message _after_ fetching the hero
    this.messageService.add(`UserService: fetched user id=${id}`);
    return of(USERS.find(user => user.id === id));
  }

  getUsers(): Observable<User[]> {
    // Todo: send the message _after_ fetching the heroes
    this.messageService.add('UserService: fetched users');
    return of(USERS);
  }

}
