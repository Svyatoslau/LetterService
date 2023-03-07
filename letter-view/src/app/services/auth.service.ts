import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessToken: string = '';

  constructor() { }

  public authenticate(token: string){
    this.accessToken = token;
  }

  public endSession(){
    this.accessToken = '';
  }

  public IsAthenticated(): boolean {
    return this.accessToken !== '';
  }

  public GetToken(): string {
    return this.accessToken;
  }
}
