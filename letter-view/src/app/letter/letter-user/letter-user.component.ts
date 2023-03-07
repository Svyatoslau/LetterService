import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

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

  @Output()
  public change: EventEmitter<any> = new EventEmitter();
  @Input()
  public users: User[] = [];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() { } 

  public newMessage() {
    console.log("new message");
  }

  public changeLetters(user: User) {
    this.change.emit(user);
  }

  public logout(){
    this.authService.endSession();
    this.router.navigate(['/login']);
  }

  public createAdmin() {

  }
}
