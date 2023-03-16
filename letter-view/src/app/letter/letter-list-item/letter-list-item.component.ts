import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

import { LetterCrudService } from 'src/app/services/letter/letter-crud.service';

import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

import { Letter } from 'src/app/models/Letter';
import { LetterChooseService } from 'src/app/services/letter/letter-choose.service';



@Component({
  selector: 'app-letter-list-item',
  templateUrl: './letter-list-item.component.html',
  styleUrls: ['./letter-list-item.component.css']
})
export class LetterListItemComponent {
  @Input()
  public letter!: Letter; 

  constructor(
    private dialog: MatDialog,
    private letterCrudService: LetterCrudService,
    private letterChooseService: LetterChooseService,
  ) { }
  
  public getFormatDate() : string {
    return (moment(this.letter.postTime)).format('DD-MMM-YYYY HH:mm:ss')
  }

  public deleteLetter(){
    this.letterCrudService.deleteLetter(this.letter);
  }

  public clickLetter(){
    this.letterChooseService.nextLetter(this.letter);
  }

  public openDeleteDialog(){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data:{
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Delete',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteLetter()
      }
    })
  }
}
