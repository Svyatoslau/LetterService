import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetterDetailComponent } from './letter-detail/letter-detail.component';
import { LetterListComponent } from './letter-list/letter-list.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DateTimePickerModule } from '../date-time-picker/date-time-picker.module';
import {MatListModule} from '@angular/material/list';
import { LetterListItemComponent } from './letter-list-item/letter-list-item.component';
import { LetterUserComponent } from './letter-user/letter-user.component';
import {MatSelectModule} from '@angular/material/select'
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    DateTimePickerModule,
    MatListModule,
    MatSelectModule,
    AppRoutingModule
  ],
  declarations: [
    LetterDetailComponent,
    LetterListComponent,
    LetterListItemComponent,
    LetterUserComponent
  ],
  exports: [
    LetterDetailComponent,
    LetterListComponent,
    LetterListItemComponent,
    LetterUserComponent
  ]
})
export class LetterModule { }
