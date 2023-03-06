import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTimePickerComponent } from './date-time-picker.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

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
