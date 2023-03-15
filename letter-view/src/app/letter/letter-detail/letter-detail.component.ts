import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { distinctUntilChanged } from 'rxjs';

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
      Validators.required
    ]),
    topic: new FormControl('', []),
    body: new FormControl('', [
      Validators.required
    ])
  });

  public date: Date = new Date();

  @ViewChild('formLetter') form!: NgForm;

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
    console.log('send');
    
    let createdFormLetter: LetterForCreation = {
      postTime: this.date,
      topic: this.topicInput?.value,
      body: this.bodyInput?.value,
      emails: this.emailInput?.value
    }
    
    this.letterCrudService.createLetter(createdFormLetter);
  }

  public openSendDialog() {
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
        if(!this.letter || this.letter?.isPosted || this.letter.id == -1){
          this.sendLetter();
        }
        else {
          this.updateLetter();
        }
      }
    });
  }

  public onSubmit(){
    let currentDate = new Date();

    console.log('onSubmit');

    if (this.date.getTime() < currentDate.getTime()) {
      this.date = currentDate;
      this.openSendDialog();
    }
    else{
      if(!this.letter || this.letter?.isPosted || this.letter.id == -1){
        this.sendLetter();
      }
      else {
        this.updateLetter();
      }
    }
  }

  public updateLetter() {
    console.log('update')
    let model : LetterForUpdate = {
      model: {
        postTime: this.date,
        topic: this.topicInput?.value,
        body: this.bodyInput?.value,
        emails: this.emailInput?.value
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
          if(letter.id === -1) {
            this.form.resetForm();
          }
          this.emailInput?.setValue(letter.emails)
          this.topicInput?.setValue(letter.topic)
          this.bodyInput?.setValue(letter.body)
          this.letter = letter;
          this.date = this.letter.postTime
        }
    );

  }
}
