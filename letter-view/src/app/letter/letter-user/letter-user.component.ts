import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from 'src/app/services/auth.service';
import { UserChooseService } from 'src/app/services/user/user-choose.service';
import { LetterChooseService } from 'src/app/services/letter/letter-choose.service';

import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

import { User } from 'src/app/models/User';
import { Role } from 'src/app/models/Role.enum';
import { CreateUserDialogComponent } from '../create-user-dialog/create-user-dialog.component';
import { UsersChooseService } from 'src/app/services/user/users-choose.service';
import { LetterCountService } from 'src/app/services/letter/letter-count.service';

@Component({
  selector: 'app-letter-user',
  templateUrl: './letter-user.component.html',
  styleUrls: ['./letter-user.component.css']
})
export class LetterUserComponent implements OnInit {
  public loginUser?: User;
  public isAdmin: boolean = false;
  public user!: User; 
  public users: User[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private userChooseService: UserChooseService,
    private letterChooseService: LetterChooseService,
    private dialog: MatDialog,
    private usersChooseService: UsersChooseService,
    public letterCountService: LetterCountService
  ) {

  }

  ngOnInit() {
    this.loginUser = this.authService.getLoginUser()
    this.user = this.loginUser
    this.isAdmin = this.loginUser.role === Role.admin;
    if (this.isAdmin){
      this.usersChooseService.users$
        .subscribe(
          (users: User[]) =>{
            this.users  = users;
          }
        );
    }
    this.userChooseService.user$
      .subscribe(
        (user) => {
          this.user = user;
        }
      )
    
  } 

  public newMessage() {
    this.letterChooseService.nextEmptyLetter(this.user.email);
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

  public openCreateUserDialog() {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      data: {
        users: this.users
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        
      }
    })
  }


}
