import { Component, OnInit } from '@angular/core';

import { LettersChooseService } from 'src/app/services/letter/letters-choose.service';

import { Letter } from 'src/app/models/Letter';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-letter-list',
  templateUrl: './letter-list.component.html',
  styleUrls: ['./letter-list.component.css']
})
export class LetterListComponent implements OnInit {
  public filterLetters: Letter[] = []; 
  public letters: Letter[] = [];
  public filterForm: FormGroup = new FormGroup({
    filter: new FormControl('', [])
  })

  constructor(
    private lettersChooseService: LettersChooseService,
  ) { }

  public get filterInput(){
    return this.filterForm.get('filter');
  }

  ngOnInit() {
    this.lettersChooseService.letters$
      .subscribe(
        (letters) => {
          this.letters = letters;
          this.filterLetters = this.letters;
          this.filterInput?.setValue('');
        }
      )
    
    this.filterInput?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
      )
      .subscribe(
        (filter: string) => {
          console.log(filter);
          this.filterLetters = this.letters
            .filter(letter => 
              letter.topic
                .toLocaleLowerCase()
                .includes(filter.toLowerCase())
            )
        }
      )
  }

  public getPostedLetters(): Letter[] | undefined{
    return this.filterLetters
      ?.filter(letter => letter.isPosted)
      .sort((a, b) => b.postTime.getTime() - a.postTime.getTime());
  }
  public getUnpostedLetters(): Letter[] | undefined{
    return this.filterLetters
      ?.filter(letter => !letter.isPosted)
      .sort((a, b) => b.postTime.getTime() - a.postTime.getTime());
  }
}
