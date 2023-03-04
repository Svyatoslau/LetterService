import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public signin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  public hide: boolean = true;

  
  public get emailInput() {
    return this.signin.get('email');
  }

  public get passwordInput() {
    return this.signin.get('password');
  }
  
  
  
  constructor() { }

  ngOnInit() {
  }

}
