import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Letter } from 'src/app/models/Letter';
import * as moment from 'moment';

@Component({
  selector: 'app-letter-list-item',
  templateUrl: './letter-list-item.component.html',
  styleUrls: ['./letter-list-item.component.css']
})
export class LetterListItemComponent implements OnInit {
  @Input()
  public letter!: Letter; 
  
  constructor() { }

  ngOnInit() {
  }
  
  public getFormatDate() : string {
    return (moment(this.letter.postTime)).format('DD-MMM-YYYY HH:mm:ss')
  }
}
