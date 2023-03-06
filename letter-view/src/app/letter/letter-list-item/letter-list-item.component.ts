import { Component, Input, OnInit } from '@angular/core';
import { Letter } from 'src/app/models/Letter';

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
  public chooseLetter() {
    console.log(this.letter.id)
  }
  
}
