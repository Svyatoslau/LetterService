import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { EntryModule } from './entry/entry.module';
import { LetterModule } from './letter/letter.module';

import { AuthService } from './services/auth.service';
import { HttpInterceptorService } from './services/http-interceptor.service';

import { AppComponent } from './app.component';
import { MainUserPageComponent } from './main-user-page/main-user-page.component';

@NgModule({
  declarations: [	
    AppComponent,
      MainUserPageComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LetterModule,
    EntryModule,
    HttpClientModule,

    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
