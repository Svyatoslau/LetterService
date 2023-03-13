import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Letter } from '../../models/Letter';

@Injectable({
  providedIn: 'root'
})
export class LetterChooseService {
  public letter$: Subject<Letter> = new Subject<Letter>();
  
  constructor() { }

  public nextEmptyLetter() {
    this.letter$.next(this.getEmptyLetter());
  }

  public nextLetter(letter: Letter) {
    this.letter$.next(letter);
  }

  private getEmptyLetter() : Letter {
    return {
      id: -1,
      isPosted: false,
      body: '',
      postTime: new Date(),
      topic: ''
    }
  }
}
