import { Component, OnInit } from '@angular/core';
import { Letter } from 'src/app/models/Letter';

@Component({
  selector: 'app-letter-list',
  templateUrl: './letter-list.component.html',
  styleUrls: ['./letter-list.component.css']
})
export class LetterListComponent implements OnInit {
  public letters?: Letter[] = [
    {
      id: 1,
      topic: 'Test1',
      body: 'Hello dear freind',
      postTime: '13:40',
      isPosted: false
    },
    {
      id: 2,
      topic: 'Test2',
      body: 'Hello dear freind',
      postTime: '15:40',
      isPosted: false
    },
    {
      id: 3,
      topic: 'Test3',
      body: 'Hello dear freind my',
      postTime: '9:40',
      isPosted: true
    }
  ]; 

  public handleClick(){
    console.log('Post')
  }

  constructor() { }

  public getPostedLetters(): Letter[] | undefined{
    return this.letters?.filter(letter => letter.isPosted);
  }
  public getUnpostedLetters(): Letter[] | undefined{
    return this.letters?.filter(letter => !letter.isPosted);
  }


  ngOnInit() {
  }

}
