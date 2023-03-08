import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.css']
})
export class DateTimePickerComponent implements OnInit {
  @Input()
  public date: Date = new Date();


  @Output()
  public update: EventEmitter<any> = new EventEmitter();
  
  constructor() { }
  ngOnInit() {
  }

  dateUpdated(){
    this.update.emit(this.date);
    
    
  }
}
