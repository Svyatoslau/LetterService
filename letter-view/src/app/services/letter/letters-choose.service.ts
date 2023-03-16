import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Letter } from 'src/app/models/Letter';

@Injectable({
  providedIn: 'root'
})
export class LettersChooseService {
  public letters$: Subject<Letter[]> = new Subject<Letter[]>;

  constructor() { }

  public nextLetters(letters: Letter[]) {
    this.letters$.next(letters);
    
  }
}
