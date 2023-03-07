import { Component, Input, OnInit } from '@angular/core';
import { Letter } from 'src/app/models/Letter';

@Component({
  selector: 'app-letter-list',
  templateUrl: './letter-list.component.html',
  styleUrls: ['./letter-list.component.css']
})
export class LetterListComponent implements OnInit {
  @Input()

  public letters: Letter[] = []; 
  
  constructor() { }

  ngOnInit() { }

  public getPostedLetters(): Letter[] | undefined{
    return this.letters?.filter(letter => letter.isPosted);
  }
  public getUnpostedLetters(): Letter[] | undefined{
    return this.letters?.filter(letter => !letter.isPosted);
  }

  public handleClick(){
    console.log('Post')
  }
}
