import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/Role.enum';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-letter-user',
  templateUrl: './letter-user.component.html',
  styleUrls: ['./letter-user.component.css']
})
export class LetterUserComponent implements OnInit {
  @Input()
  public loginUser?: User;
  @Input()
  public isAdmin: boolean = false;

  public currentUser?: User;

  //public change: EventEmitter<any> = new EventEmitter();

  public users: User[] = []

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() { 
    this.currentUser = this.loginUser;
  } 

  public newMessage() {
    console.log("new message");
  }

  public changeLetters(user: User) {
    //this.change.emit()
    this.currentUser = user;
  }

  public logout(){
    this.authService.endSession();
    this.router.navigate(['/login']);
  }

  public createAdmin() {

  }
}
