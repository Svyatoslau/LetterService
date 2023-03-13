import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from '../app-routing.module';

import { UserService } from '../services/user/user.service';
import { AuthService } from '../services/auth.service';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    LoginComponent,
    RegistrationComponent
  ],
  exports: [
    LoginComponent,
    RegistrationComponent
  ],
  providers: [
    UserService,
    AuthService
  ]
})
export class EntryModule { }
