import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

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
      Validators.minLength(4)
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ])
  });

  public hide: boolean = true;
  
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
    this.repeatPasswordInput?.invalid
  }
  
  public createPasswordConfirmValidator(): ValidatorFn {
    return () : ValidationErrors | null => {
      const repeatedPassword = this.repeatPasswordInput?.value;

      const password = this.passwordInput?.value;

      const passwordValid = repeatedPassword == password;
      
      return !passwordValid ? {passwordNotRepeated:true}: null;
    }
  }

  constructor() { 
    this.repeatPasswordInput?.addValidators(this.createPasswordConfirmValidator());
  }

  ngOnInit() {
  }

}
