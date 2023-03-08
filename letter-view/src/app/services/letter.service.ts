import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { LetterForCreation } from '../models/api/LetterForCreation';
import { Letter } from '../models/Letter';

@Injectable({
  providedIn: 'root'
})
export class LetterService {
  private apiUrl: string = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' 
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  public getLetters(userId: number): Observable<Letter[]>{
    return this.http.get<Letter[]>(
      `${this.apiUrl}/user/${userId}/letters`,
      this.httpOptions
    )
    .pipe(
      tap(
        letters => {
          letters.forEach(letter => this.convertDate(letter))
        }
      ),
      catchError(this.handleError('getLetters', []))
    )
  }

  public createLetter(userId: number, model: LetterForCreation) : Observable<Letter>{
    return this.http.post<Letter>(
      `${this.apiUrl}/user/${userId}/letter`,
      model,
      this.httpOptions
    )
    .pipe(
      tap(letter =>{
          letter.postTime = new Date(letter.postTime)
        }
      ),
      catchError(this.handleError<Letter>('createLetter'))
    )
  }

  public updateLetter(
    userId: number,
    letterId: number,
    model: LetterForCreation
  ) : Observable<Letter> {
    return this.http.put<Letter>(
      `${this.apiUrl}/user/${userId}/letter/${letterId}`,
      model,
      this.httpOptions
    )
    .pipe(
      tap(letter =>{
          letter.postTime = new Date(letter.postTime)
        }
      ),
      catchError(this.handleError<Letter>('updateLetter'))
    )
  }

  public deleteLetter(userId: number, letterId: number) : Observable<Letter> {
    return this.http.delete<Letter>(
      `${this.apiUrl}/user/${userId}/letter/${letterId}`,
      this.httpOptions
    )
    .pipe(
      tap(letter =>{
          this.convertDate(letter);
        }
      ),
      catchError(this.handleError<Letter>('deleteLetter'))
    )
  }



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> =>{
      console.log(error);
      return of(result as T);
    }
  }

  private convertDate(letter: Letter){
    letter.postTime = new Date(letter.postTime)
    let timeOffsetInMS:number = letter.postTime.getTimezoneOffset() * 60000;
    letter.postTime.setTime(letter.postTime.getTime() - timeOffsetInMS);
  }
  
}
