import { Component, OnInit } from '@angular/core';
import { Role } from '../models/Role.enum';
import { User } from '../models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-main-user-page',
  templateUrl: './main-user-page.component.html',
  styleUrls: ['./main-user-page.component.css']
})
export class MainUserPageComponent implements OnInit {
  public isAdmin: boolean = false;
  public currentUser!: User;
  public loginUser!: User;
  public users: User[] = [];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loginUser = this.userService.currentUser;
    this.currentUser = this.loginUser;
    this.isAdmin = this.currentUser.role === Role.admin;
    if (this.isAdmin){
      
    }
  }

}
