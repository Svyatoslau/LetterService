import { Component, Input, OnInit } from '@angular/core';
import { Letter } from 'src/app/models/Letter';
import { User } from 'src/app/models/User';
import { LetterService } from 'src/app/services/letter.service';

@Component({
  selector: 'app-letter-list',
  templateUrl: './letter-list.component.html',
  styleUrls: ['./letter-list.component.css']
})
export class LetterListComponent implements OnInit {
  public letters: Letter[] = []; 
  @Input()
  public user!: User;

  constructor(private letterService: LetterService) { }

  ngOnInit() {
    this.letterService.getLetters(this.user.id)
      .subscribe(
        (letters: Letter[]) => {
          this.letters = letters;
        }
      )
  }

  public getPostedLetters(): Letter[] | undefined{
    return this.letters?.filter(letter => letter.isPosted);
  }
  public getUnpostedLetters(): Letter[] | undefined{
    return this.letters?.filter(letter => !letter.isPosted);
  }


  


  public handleClick(){
    console.log('Post')
  }
}
