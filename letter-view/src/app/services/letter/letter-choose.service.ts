import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/User';

import { Letter } from '../../models/Letter';
import { UserChooseService } from '../user/user-choose.service';

@Injectable({
  providedIn: 'root'
})
export class LetterChooseService {
  public letter$: Subject<Letter> = new Subject<Letter>();
  public user!: User
  constructor() { }

  public nextEmptyLetter(userEmails: string) {
    this.letter$.next(this.getEmptyLetter(userEmails));
  }

  public nextLetter(letter: Letter) {
    this.letter$.next(letter);
  } 

  private getEmptyLetter(userEmails: string) : Letter {
    return {
      id: -1,
      isPosted: false,
      body: '',
      postTime: new Date(),
      topic: '',
      emails: userEmails
    }
  }
}
