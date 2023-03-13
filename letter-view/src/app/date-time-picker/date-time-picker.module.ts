import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';

import { DateTimePickerComponent } from './date-time-picker.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    BrowserAnimationsModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule
  ],
  declarations: [DateTimePickerComponent],
  exports: [
    DateTimePickerComponent
  ]
})
export class DateTimePickerModule { }
