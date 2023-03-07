import { Component, OnInit } from '@angular/core';
import { Role } from '../models/Role.enum';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
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

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loginUser = this.authService.getLoginUser();
    this.currentUser = this.loginUser;
    this.isAdmin = this.currentUser.role === Role.admin;
    if (this.isAdmin){
      this.userService.GetUsers()
        .subscribe(
          (users: User[]) =>{
            this.users = users;
          }
        );
    }
  }

}
