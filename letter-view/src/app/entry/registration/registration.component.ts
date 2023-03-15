import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { 
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  ValidatorFn 
} from '@angular/forms';

import { UserService } from 'src/app/services/user/user.service';

import { ErrorMessage } from 'src/app/models/api/ErrorMessage';
import { UserLogin } from 'src/app/models/api/output/UserLogin';
import { User } from 'src/app/models/User';
import { Role } from 'src/app/models/Role.enum';
import { UserForCreation } from 'src/app/models/api/user-for-creation';

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
    ]),
    role: new FormControl('', [])
  });

  public hide: boolean = true;
  public isFormValid: boolean = true;
  public errorMessage: string = '';
  public userCreated: boolean = false
  @Input()
  public isAdmin: boolean = false;
  @Output()
  public create: EventEmitter<any> = new EventEmitter();

  constructor(
    private userService: UserService,
    private router: Router
  ) { 
    this.register?.addValidators(this.createPasswordConfirmValidator());

  }

  ngOnInit(): void {
    this.roleInput?.setValue(Role.user);
  }

  public get roleInput() {
    return this.register.get('role');
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
 
  public getRole(value: string){
    if (value ==='admin'){
      return Role.admin
    }
    return Role.user
  } 
  
  public pushForm(){
    if (this.isAdmin) {
      this.createUser()
    }
    else {
      this.registrUser()
    }
    
  }
  public createUser() {
    let model: UserForCreation = {
      email: this.emailInput?.value,
      password: this.passwordInput?.value,
      role: this.roleInput?.value
    }
    this.userService.createUser(model)
      .subscribe(
        (value: User | ErrorMessage) => {
          //console.log(value)
          if (this.instanceOfSuccesfullLogin(value)){
            this.create.emit(value);
            this.userCreated = true;
            this.isFormValid = true;
          }
          else {
            this.isFormValid = false,
            this.userCreated = false
            this.errorMessage = value.message
          }
        }
      )
    
  }

  public registrUser(){
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
}
