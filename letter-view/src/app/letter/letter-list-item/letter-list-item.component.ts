import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

import { Letter } from 'src/app/models/Letter';

@Component({
  selector: 'app-letter-list-item',
  templateUrl: './letter-list-item.component.html',
})
export class LetterListItemComponent {
  @Input()
  public letter!: Letter; 
  
  constructor() { }
  
  public getFormatDate() : string {
    return (moment(this.letter.postTime)).format('DD-MMM-YYYY HH:mm:ss')
  }
}
