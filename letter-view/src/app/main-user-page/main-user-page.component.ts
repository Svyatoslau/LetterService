import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Letter } from '../models/Letter';
import { Role } from '../models/Role.enum';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { LetterService } from '../services/letter.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-main-user-page',
  templateUrl: './main-user-page.component.html',
  styleUrls: ['./main-user-page.component.css']
})
export class MainUserPageComponent implements OnInit {
  public isAdmin: boolean = false;
  public loginUser?: User;
  public users: User[] = [];
  public letters: Letter[] = [];
  public subjectLetter: Subject<Letter> = new Subject<Letter>;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private letterService: LetterService
  ) { }

  ngOnInit() {
    this.loginUser = this.authService.getLoginUser();
    this.letterService.getLetters(this.loginUser.id)
    .subscribe(
      (letters: Letter[]) => {
        this.letters = letters;
        this.subjectLetter.next(letters[0]);
        console.log(letters[0]);
      }
    )
    this.isAdmin = this.loginUser.role === Role.admin;
    if (this.isAdmin){
      this.userService.GetUsers()
        .subscribe(
          (users: User[]) =>{
            this.users = users;
          }
        );
    }
  }

  public changeLettersList(user: User){
    this.letterService.getLetters(user.id)
      .subscribe(
        (letters: Letter[]) => {
          this.letters = letters;
          this.subjectLetter.next(letters[0])
        }
      )
  }

  public changeLetterDetail(letter: Letter) {
    this.subjectLetter.next(letter);
  }
}
