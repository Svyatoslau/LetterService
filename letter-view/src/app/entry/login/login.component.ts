import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user/user.service';

import { ErrorLogin } from 'src/app/models/api/ErrorLogin';
import { UserLogin } from 'src/app/models/api/output/UserLogin';
import { SuccesfullLogin } from 'src/app/models/api/SuccesfullLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public signin: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  public hide: boolean = true;
  public isFormValid: boolean = true;
  public errorMessage: string = '';
  public refresh: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.signin.valueChanges
      .subscribe(
        (value) => {
          this.refresh = false;
        }
      )
  }

  public get emailInput() {
    return this.signin.get('email');
  }

  public get passwordInput() {
    return this.signin.get('password');
  }
  
  public pushForm(){
    let form: UserLogin = {
      email: this.emailInput?.value,
      password: this.passwordInput?.value
    }
     
    this.userService.loginUser(form)
      .subscribe(
        (value: SuccesfullLogin | ErrorLogin) => {
          //console.log(value)
          if (this.instanceOfSuccesfullLogin(value)){
            this.authService.authenticate(value);
            this.router.navigate(['/page'])
          }
          else {
            this.signin?.reset();
            this.emailInput?.setErrors(null);
            this.passwordInput?.setErrors(null);
            this.isFormValid = false,
            this.errorMessage = value.message
            this.refresh = true
          }
        }
      )
  }
  
  private instanceOfSuccesfullLogin(object: any): object is SuccesfullLogin {
    try{
      return 'user' in object && 'token' in object
    }
    catch {
      return false;
    }
  }
}
