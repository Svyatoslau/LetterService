import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output 
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LetterChooseService } from '../services/letter/letter-choose.service';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html'
})
export class DateTimePickerComponent implements OnInit {

  public minDate: Date = new Date();

  @Output()
  public update: EventEmitter<any> = new EventEmitter();
  
  public datePicker: FormGroup = new FormGroup(
  {
    date: new FormControl('', [])
  }
 )

  public get dateInput() {
    return this.datePicker.get('date');
  }

  constructor(
    private letterChoose: LetterChooseService
  ) { }
  ngOnInit() {
    this.dateInput?.setValue(new Date())
    this.letterChoose.letter$
      .subscribe(
        (letter) => {
          this.dateInput?.setValue(letter.postTime);
        }
      )
    this.dateInput?.valueChanges
      .subscribe(
        (value) => {
          this.dateUpdated();
        }
      )
  }

  dateUpdated(){
    this.update.emit(this.dateInput?.value);
  }


}
