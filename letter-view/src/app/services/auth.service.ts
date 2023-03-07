import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { SuccesfullLogin } from '../models/api/SuccesfullLogin';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessToken: string = '';
  private loginUser!: User;

  constructor() {
    let rawUserDate = sessionStorage.getItem(environment.userKey);
    if (rawUserDate !== null){
      try{
        let userdDate: SuccesfullLogin = JSON.parse(rawUserDate);
        this.loginUser = userdDate.user;
        this.accessToken = userdDate.token;
      }
      catch{
        console.log('Not found session');
      }
    }
  }

  
  public authenticate(model: SuccesfullLogin){
    sessionStorage.setItem(environment.userKey, JSON.stringify(model));
    this.accessToken = model.token;
    this.loginUser = model.user;
  }

  public endSession(){
    this.accessToken = '';
    sessionStorage.removeItem(environment.userKey);
  }

  public IsAthenticated(): boolean {
    return this.accessToken !== '';
  }

  public GetToken(): string {
    return this.accessToken
  }

  public getLoginUser(): User {
    return this.loginUser;
  }
}
