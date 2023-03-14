import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';

import { User } from '../models/User';
import { UserChooseService } from '../services/user/user-choose.service';
import { UsersChooseService } from '../services/user/users-choose.service';
import { UserService } from '../services/user/user.service';
import { Role } from '../models/Role.enum';

@Component({
  selector: 'app-main-user-page',
  templateUrl: './main-user-page.component.html',
  styleUrls: ['./main-user-page.component.css']
})
export class MainUserPageComponent implements OnInit {
  public loginUser?: User;

  constructor(
    private authService: AuthService,
    private userChooseService: UserChooseService,
    private usersChooseService: UsersChooseService,
    private userSerivce: UserService
  ) { }

  ngOnInit() {
    this.loginUser = this.authService.getLoginUser();
    this.userChooseService.nextUser(this.loginUser);
    if(this.loginUser.role === Role.admin) {
      this.userSerivce.GetUsers()
        .subscribe(
          (users) => {
            this.usersChooseService.nextUsers(users);
          }
        )
    }
  }
}
