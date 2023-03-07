import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
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
      catchError(this.handleError('getLetters', []))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> =>{
      console.log(error);
      return of(result as T);
    }
  }

}
