import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged, Observable, of, Subject } from 'rxjs';
import { LetterForCreation } from 'src/app/models/api/LetterForCreation';
import { LetterForUpdate } from 'src/app/models/api/LetterForUpdate';
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

  public date: Date = new Date();
  
  @Input()
  public subjectLetter!: Subject<Letter>
  @Input()
  public email: string = ''

  @Output()
  public create: EventEmitter<any> = new EventEmitter();
  @Output()
  public delete: EventEmitter<any> = new EventEmitter();
  @Output()
  public update: EventEmitter<any> = new EventEmitter();

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
  public sendLetter() {
    let createdFormLetter: LetterForCreation = {
      postTime: this.date,
      topic: this.topicInput?.value,
      body: this.bodyInput?.value
    }
    this.create.emit(createdFormLetter);
  }

  public deleteLetter(){
    let letterId: number = this.letter ? this.letter.id : -1
    if (letterId >= 0) {
      this.delete.emit(this.letter);
    }
    else {
      this.bodyInput?.setValue('');
      this.topicInput?.setValue('');
      this.date = new Date();
    }
  }

  public updateLetter(){
    let model : LetterForUpdate = {
      model: {
        postTime: this.date,
        topic: this.topicInput?.value,
        body: this.bodyInput?.value
      },
      id: this.letter ? this.letter.id : -1
    }
    this.update.emit(model);
  }

  public handleUpdateDate(date: Date){
    this.date = date;
  }

  ngOnInit() {
    this.emailInput?.setValue(this.email)
    this.subjectLetter.pipe(
      distinctUntilChanged()
    ).subscribe(
      (letter: Letter) =>{
        this.emailInput?.setValue(this.email)
        this.topicInput?.setValue(letter.topic)
        this.bodyInput?.setValue(letter.body)
        this.letter = letter;
        this.date = this.letter.postTime
      }
    );

  }
}
