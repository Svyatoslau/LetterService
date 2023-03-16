import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LetterCountService {
  private countLetters: number = 0
  constructor() { }

  public getCountLetters() {
    return this.countLetters;
  }
  public setCountLetters(countLetters: number) {
    this.countLetters = countLetters;
  }
  public addCountLetter(increment: number) {
    this.countLetters += increment;
  }
}
