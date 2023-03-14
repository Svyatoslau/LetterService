import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { UserChooseService } from 'src/app/services/user/user-choose.service';
import { LetterChooseService } from 'src/app/services/letter/letter-choose.service';

import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

import { User } from 'src/app/models/User';
import { Role } from 'src/app/models/Role.enum';

@Component({
  selector: 'app-letter-user',
  templateUrl: './letter-user.component.html',
  styleUrls: ['./letter-user.component.css']
})
export class LetterUserComponent implements OnInit {
  public loginUser?: User;
  public isAdmin: boolean = false;

  public users: User[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private userChooseService: UserChooseService,
    private letterChooseService: LetterChooseService,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loginUser = this.authService.getLoginUser()
    this.isAdmin = this.loginUser.role === Role.admin;
    if (this.isAdmin){
      this.userService.GetUsers()
        .subscribe(
          (users: User[]) =>{
            this.users  = users;
          }
        );
    }
  } 

  public newMessage() {
    this.letterChooseService.nextEmptyLetter();
  }

  public changeUser(user: User) {
    this.userChooseService.nextUser(user)
  }

  public logout(){
    this.authService.endSession();
    this.router.navigate(['/login']);
  }

  public openDialog(){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data:{
        message: 'Are you sure want to logout?',
        buttonText: {
          ok: 'Logout',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.logout()
      }
    })
  }

  public createAdmin() {

  }


}
