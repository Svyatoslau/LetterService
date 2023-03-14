import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { LetterChooseService } from '../letter/letter-choose.service';
import { LetterService } from '../letter/letter.service';
import { LettersChooseService } from '../letter/letters-choose.service';

import { Letter } from 'src/app/models/Letter';
import { User } from 'src/app/models/User';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserChooseService {
  public user$: Subject<User> = new Subject<User>;

  constructor(
    private letterService: LetterService,
    private lettersChooseService: LettersChooseService,
    private letterChooseService: LetterChooseService,
  ) { }


  public nextUser(user: User){
    this.user$.next(user);
    this.letterService.getLetters(user.id)
      .subscribe(
        (letters: Letter[]) => { 
          this.letterChooseService.nextEmptyLetter(user.email);
          this.lettersChooseService.nextLetters(letters);
        }
      )
  }
}