import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UsersChooseService {
  public users$: Subject<User[]> = new Subject<User[]>;
  constructor() { }
  
  public nextUsers(users: User[]){
    this.users$.next(users);
  }
}

