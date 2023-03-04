import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public signin: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required,
    ])
  });

  public hide: boolean = true;
  public isFormValid: boolean = true;
  
  public get emailInput() {
    return this.signin.get('email');
  }

  public get passwordInput() {
    return this.signin.get('password');
  }
  
  public pushForm(){
    if (this.passwordInput?.invalid || this.emailInput?.invalid){
      this.isFormValid = false;
    }
  }
  



constructor() { }

  ngOnInit() {
  }

}
