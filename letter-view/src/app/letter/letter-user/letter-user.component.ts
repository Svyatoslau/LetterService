import { Component, Input, OnInit } from '@angular/core';
import { Role } from 'src/app/models/Role.enum';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-letter-user',
  templateUrl: './letter-user.component.html',
  styleUrls: ['./letter-user.component.css']
})
export class LetterUserComponent implements OnInit {
  @Input()
  public currentUser: User = {
    id: 4,
    email: 'ddd@ad',
    role: Role.admin
  };

  public users: User[] = [
    {
      id: 3,
      email: 'ddd@ad',
      role: Role.admin
    },
    {
      id: 1,
      email: 'cc@ad',
      role: Role.user
    },
    {
      id: 2,
      email: 'aa@a22',
      role: Role.user
    },
  ]

  constructor() {
   }
  
  public isAdmin(): boolean {
    return this.currentUser.role == Role.admin;
  }

  public newMessage() {
    console.log("new message");
  }

  public changeLetters(user: User) {
    console.log(user);
  }

  ngOnInit() {
  }

}
