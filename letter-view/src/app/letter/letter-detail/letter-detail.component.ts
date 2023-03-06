import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Letter } from 'src/app/models/Letter';

@Component({
  selector: 'app-letter-detail',
  templateUrl: './letter-detail.component.html',
  styleUrls: ['./letter-detail.component.css']
})
export class LetterDetailComponent implements OnInit {
  public letterForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    topic: new FormControl('', [
      Validators.required
    ]),
    body: new FormControl('', [
      Validators.required
    ])
  });

  public date: string = "";

  @Input()
  public letter?: Letter;

  constructor() { }

  public get emailInput() {
    return this.letterForm.get('email');
  }

  public get topicInput() {
    return this.letterForm.get('topic');
  }

  public get bodyInput(){
    return this.letterForm.get('body');
  }
  public pushLetter() {

  }

  public deleteLetter(){

  }

  public handleUpdateDate(date:string){
    this.date = date;
  }

  ngOnInit() {
  }
}
