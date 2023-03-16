import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { LetterService } from '../services/letter/letter.service';
import { LetterCountService } from '../services/letter/letter-count.service';
import { UserChooseService } from '../services/user/user-choose.service';
import { UsersChooseService } from '../services/user/users-choose.service';
import { UserService } from '../services/user/user.service';

import { User } from '../models/User';
import { Role } from '../models/Role.enum';
import { Letter } from '../models/Letter';

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
    private userSerivce: UserService,
    private letterService: LetterService,
    private letterCountService: LetterCountService
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
        );
      
      this.letterService.getAllLetters()
        .subscribe(
          (letters: Letter[]) => {
            this.letterCountService
              .setCountLetters(letters.length);
          }
        )
    }
    
  }
}
