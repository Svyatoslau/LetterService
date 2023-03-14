import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { distinctUntilChanged, Subject } from 'rxjs';

import { LetterChooseService } from 'src/app/services/letter/letter-choose.service';
import { AuthService } from 'src/app/services/auth.service';
import { LetterCrudService } from 'src/app/services/letter/letter-crud.service';
import { UserChooseService } from 'src/app/services/user/user-choose.service';

import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

import { LetterForCreation } from 'src/app/models/api/LetterForCreation';
import { LetterForUpdate } from 'src/app/models/api/LetterForUpdate';
import { Letter } from 'src/app/models/Letter';

@Component({
  selector: 'app-letter-detail',
  templateUrl: './letter-detail.component.html',
  styleUrls: ['./letter-detail.component.css']
})
export class LetterDetailComponent implements OnInit {
  public letterForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    topic: new FormControl('', []),
    body: new FormControl('', [
      Validators.required
    ])
  });

  public date: Date = new Date();

  public letter?: Letter;
  constructor(
    private dialog: MatDialog,
    private letterChooseService: LetterChooseService,
    private letterCrudService: LetterCrudService,
    private userChooseService: UserChooseService,
    private authService: AuthService
  ) { }

  public get emailInput() {
    return this.letterForm.get('email');
  }

  public get topicInput() {
    return this.letterForm.get('topic');
  }

  public get bodyInput(){
    return this.letterForm.get('body');
  }
  public sendLetter() {
    let createdFormLetter: LetterForCreation = {
      postTime: this.date,
      topic: this.topicInput?.value,
      body: this.bodyInput?.value
    }
    this.letterCrudService.createLetter(createdFormLetter);
  }

  public openSendDialog() {
    let currentDate = new Date();

    if (this.date.getTime() < currentDate.getTime()) {
      this.date = currentDate;

      const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
        data:{
          message: 'Choosed date in past. Are you want send letter now?',
          buttonText: {
            ok: 'Send',
            cancel: 'Cancel'
          },
          color: 'primary'
        }
      });
  
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
            this.sendLetter()
        }
      })
    }
    else {
      this.sendLetter()
    }
    
  }

  public updateLetter() {
    let model : LetterForUpdate = {
      model: {
        postTime: this.date,
        topic: this.topicInput?.value,
        body: this.bodyInput?.value
      },
      id: this.letter ? this.letter.id : -1
    }
    this.letterCrudService.updateLetter(model);
  }

  public handleUpdateDate(date: Date){
    this.date = date;
  }

  ngOnInit() {
    this.emailInput?.setValue(this.authService.getLoginUser().email)
    this.userChooseService.user$
      .subscribe(
        (user) => {
          this.emailInput?.setValue(user.email)
        }
      );
    
    this.letterChooseService.letter$
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(
        (letter: Letter) => {
          this.bodyInput?.reset()
          
          this.topicInput?.setValue(letter.topic)
          this.bodyInput?.setValue(letter.body)
          this.letter = letter;
          this.date = this.letter.postTime
        }
    );

  }
}
