import { Component, OnInit } from '@angular/core';

import { LetterChooseService } from 'src/app/services/letter/letter-choose.service';
import { LettersChooseService } from 'src/app/services/letter/letters-choose.service';

import { Letter } from 'src/app/models/Letter';

@Component({
  selector: 'app-letter-list',
  templateUrl: './letter-list.component.html',
  styleUrls: ['./letter-list.component.css']
})
export class LetterListComponent implements OnInit {
  public letters: Letter[] = []; 

  constructor(
    private letterFilterService: LetterChooseService,
    private lettersChooseService: LettersChooseService
  ) { }

  ngOnInit() {
    this.lettersChooseService.letters$
      .subscribe(
        (letters) => {
          this.letters = letters;
        }
      )
  }

  public getPostedLetters(): Letter[] | undefined{
    return this.letters
      ?.filter(letter => letter.isPosted)
      .sort((a, b) => b.postTime.getTime() - a.postTime.getTime());
  }
  public getUnpostedLetters(): Letter[] | undefined{
    return this.letters
      ?.filter(letter => !letter.isPosted)
      .sort((a, b) => b.postTime.getTime() - a.postTime.getTime());
  }

  public handleClick(letter: Letter){
   this.letterFilterService.nextLetter(letter);
  }
}
