import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Letter } from 'src/app/models/Letter';

@Component({
  selector: 'app-letter-list',
  templateUrl: './letter-list.component.html',
  styleUrls: ['./letter-list.component.css']
})
export class LetterListComponent implements OnInit {
  @Input()
  public letters: Letter[] = []; 

  @Output()
  public update: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  public getPostedLetters(): Letter[] | undefined{
    return this.letters?.filter(letter => letter.isPosted).sort((a, b) => b.postTime.getTime() - a.postTime.getTime());
  }
  public getUnpostedLetters(): Letter[] | undefined{
    return this.letters?.filter(letter => !letter.isPosted).sort((a, b) => b.postTime.getTime() - a.postTime.getTime());
  }

  public handleClick(letter: Letter){
    this.update.emit(letter);
  }
}
