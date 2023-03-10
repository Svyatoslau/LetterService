import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorMessage } from 'src/app/models/api/ErrorMessage';
import { UserLogin } from 'src/app/models/api/output/UserLogin';
import { SuccesfullLogin } from 'src/app/models/api/SuccesfullLogin';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public register: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  public hide: boolean = true;
  public isFormValid: boolean = true;
  public errorMessage: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) { 
    this.register?.addValidators(this.createPasswordConfirmValidator());
  }

  public get emailInput() {
    return this.register.get('email');
  }

  public get passwordInput() {
    return this.register.get('password');
  }

  public get repeatPasswordInput() {
    return this.register.get('confirmPassword');
  } 
  
  public pushForm(){
    let form: UserLogin = {
      email: this.emailInput?.value,
      password: this.passwordInput?.value
    }
     
    this.userService.registrUser(form)
      .subscribe(
        (value: User | ErrorMessage) => {
          //console.log(value)
          if (this.instanceOfSuccesfullLogin(value)){
            this.router.navigate(['/login'])
          }
          else {
            this.register.reset();
            this.isFormValid = false,
            this.errorMessage = value.message
          }
        }
      )
  }
  
  public createPasswordConfirmValidator(): ValidatorFn {
    return () : ValidationErrors | null => {
      const repeatedPassword = this.repeatPasswordInput?.value;

      const password = this.passwordInput?.value;

      const passwordValid = repeatedPassword == password;

      return !passwordValid ? {passwordNotRepeated:true}: null;
    }
  }

  private instanceOfSuccesfullLogin(object: any): object is User {
    try{
      return 'id' in object && 'email' in object && 'role' in object
    }
    catch {
      return false;
    }
  }
  

  ngOnInit() {
  }

}
