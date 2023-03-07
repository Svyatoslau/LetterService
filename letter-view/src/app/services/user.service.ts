import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ErrorLogin } from '../models/api/ErrorLogin';
import { UserLogin } from '../models/api/output/UserLogin';
import { SuccesfullLogin } from '../models/api/SuccesfullLogin';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUser!: User;

  private apiUrl: string;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' 
    })
  };
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }
  
  public loginUser(form: UserLogin): Observable<SuccesfullLogin | ErrorLogin> {
    return this.http.post<SuccesfullLogin | ErrorLogin>(
      `${this.apiUrl}/user/login`,
      form,
      this.httpOptions
    )
    .pipe(
      catchError((error: any): Observable<ErrorLogin> => { 
        return of(error.error as ErrorLogin);
      })
    );
  }

  public GetUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`)
      .pipe(
        catchError((this.handleError<User[]>("getUsers", [])))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> =>{
      console.log(error);
      return of(result as T);
    }
  }

}
