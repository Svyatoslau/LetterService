import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntryModule } from './entry/entry.module';
import { LetterModule } from './letter/letter.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainUserPageComponent } from './main-user-page/main-user-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { HttpInterceptorService } from './services/http-interceptor.service';

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
