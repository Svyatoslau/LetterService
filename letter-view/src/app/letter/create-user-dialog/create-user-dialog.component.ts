import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/User';
import { UsersChooseService } from 'src/app/services/user/users-choose.service';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.css']
})
export class CreateUserDialogComponent {
  message: string = "CreateUser?"
  confirmButtonText = "Create"
  cancelButtonText = "Cancel"
  color: string = 'primary'
  users: User[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<CreateUserDialogComponent>,
    private usersChooseService: UsersChooseService
  ) {
    
    if(data) {
      this.users = data.users;
    }
  }

  public onConfirmClick(): void {
    this.dialogRef.close(true);
  }

  public addUser(user: User) {
    this.users.push(user)
    this.usersChooseService.nextUsers(this.users);
  }
}
