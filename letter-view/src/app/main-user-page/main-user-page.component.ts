import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';

import { User } from '../models/User';
import { UserChooseService } from '../services/user/user-choose.service';

@Component({
  selector: 'app-main-user-page',
  templateUrl: './main-user-page.component.html',
  styleUrls: ['./main-user-page.component.css']
})
export class MainUserPageComponent implements OnInit {
  public loginUser?: User;

  constructor(
    private authService: AuthService,
    private userChooseService: UserChooseService
  ) { }

  ngOnInit() {
    this.loginUser = this.authService.getLoginUser();
    this.userChooseService.nextUser(this.loginUser);
  }
}
