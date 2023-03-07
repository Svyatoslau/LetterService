import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './entry/login/login.component';
import { RegistrationComponent } from './entry/registration/registration.component';
import { IsAuthenticatedGuard } from './is-authenticated.guard';
import { MainUserPageComponent } from './main-user-page/main-user-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'registr', component: RegistrationComponent},
  { 
    path: 'page',
    component: MainUserPageComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  { path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
