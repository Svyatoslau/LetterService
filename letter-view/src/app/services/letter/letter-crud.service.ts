import { Injectable } from '@angular/core';
import { LetterForCreation } from 'src/app/models/api/LetterForCreation';

import { LetterChooseService } from './letter-choose.service';
import { LetterService } from './letter.service';

import { Letter } from 'src/app/models/Letter';
import { UserChooseService } from '../user/user-choose.service';
import { User } from 'src/app/models/User';
import { LetterForUpdate } from 'src/app/models/api/LetterForUpdate';
import { LettersChooseService } from './letters-choose.service';

@Injectable({
  providedIn: 'root'
})
export class LetterCrudService {
  private user!: User;
  private letters!: Letter[];
  
  constructor(
    private letterService: LetterService,
    private letterChooseService: LetterChooseService,
    private userChooseService: UserChooseService,
    private lettersChooseService: LettersChooseService
  ) 
  {
    userChooseService.user$
      .subscribe(
        (user) => {
          this.user = user;
        }
      );
    
    lettersChooseService.letters$
      .subscribe(
        (letters) => {
          this.letters = letters;
        }
      )
  }

  public createLetter(model: LetterForCreation) {
    this.letterService.createLetter(this.user.id, model)
      .subscribe(
        (letter: Letter) => {
          console.log(letter)
          this.letters.push(letter);
          this.letterChooseService.nextLetter(letter);
        }
      )
  }

  public deleteLetter(letterForDelete: Letter) {
    this.letterService.deleteLetter(this.user.id, letterForDelete.id)
      .subscribe(
        letter => {
          this.letterChooseService.nextEmptyLetter(this.user.email);
          this.lettersChooseService
            .nextLetters(this.letters.filter(l => l.id !== letter.id));
        }
      )
  }

  public updateLetter(letterForUpdate: LetterForUpdate){
    if(letterForUpdate.id < 0) return;
    
    this.letterService.updateLetter(
      this.user.id,
      letterForUpdate.id,
      letterForUpdate.model
    )
    .subscribe(
      letter => {
        let letterUpdate = this.letters.find(l => l.id === letter.id);
        if (letterUpdate){
          letterUpdate=letter;
          this.letterChooseService.nextLetter(letterUpdate);
          this.lettersChooseService
            .nextLetters(this.letters.filter(l => l.id !== letter.id));
          this.letters.push(letterUpdate);
        }
      }
    )
  }
  
}
