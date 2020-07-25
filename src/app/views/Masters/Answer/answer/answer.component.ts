import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Answer } from '../../../../Compound/Module/Masters/Answer.model';
import { DefaultLayoutComponent } from '../../../../containers';

@Component({
  selector: 'app-answer',
  templateUrl: './Answer.component.html',
  styleUrls: ['./Answer.component.scss']
})
export class AnswerComponent implements OnInit {
  answer: Answer;
  str: string;
  answerList: Answer[];
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent, private router: Router) {
    const status = '';
  }
  ngOnInit() {
    this.answer = {
      AnswerID: null,
      Answer: null,
      Is_Active: null,
      Is_Auto: null,
      Sort_By: null,
    };
    status = '';
  }

}
