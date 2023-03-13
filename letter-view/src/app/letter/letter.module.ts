import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select'
import { MatDialogModule } from '@angular/material/dialog';

import { DateTimePickerModule } from '../date-time-picker/date-time-picker.module';
import { AppRoutingModule } from '../app-routing.module';

import { AuthService } from '../services/auth.service';

import { LetterDetailComponent } from './letter-detail/letter-detail.component';
import { LetterListComponent } from './letter-list/letter-list.component';
import { LetterListItemComponent } from './letter-list-item/letter-list-item.component';
import { LetterUserComponent } from './letter-user/letter-user.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { LetterChooseService } from '../services/letter/letter-choose.service';

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
    AppRoutingModule,
    MatDialogModule
  ],
  declarations: [
    LetterDetailComponent,
    LetterListComponent,
    LetterListItemComponent,
    LetterUserComponent,
    ConfirmationDialogComponent
  ],
  exports: [
    LetterDetailComponent,
    LetterListComponent,
    LetterListItemComponent,
    LetterUserComponent
  ],
  providers: [
    AuthService,
    LetterChooseService
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ]
})
export class LetterModule { }
