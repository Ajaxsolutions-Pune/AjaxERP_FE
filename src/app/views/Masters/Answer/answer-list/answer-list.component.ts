import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Answer } from '../../../../Compound/Module/Masters/Answer.model';
import { AnswerTransfarmer } from '../../../../Compound/Transformer/Masters/Answer-Transfarmer';

@Component({
  selector: 'app-answer-list',
  templateUrl: './Answer-list.component.html',
  styleUrls: ['./Answer-list.component.scss']
})
export class AnswerListComponent implements OnInit {
  @Input() AnswerInput: Answer;
  Answers: Answer[];

  WithoutFilterAnswer: Answer[];
  Resultanswer: Answer[];
  SerachCri: number;
  answer: Answer;
  constructor(private _router: Router,
    objTrans: AnswerTransfarmer,
    private route: ActivatedRoute) {
    this.Answers = this.route.snapshot.data['AnswerList'];
  }

  ngOnInit() {
    this.WithoutFilterAnswer = this.Answers;
    console.log(this.Answers);
    this.answer = {
      Answer: null,
      AnswerID: null,
      Is_Active: null,
      Is_Auto: null,
      Sort_By: null
    };
    console.log(this.Answers);
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.Resultanswer = this.WithoutFilterAnswer;
    if (this.answer.Answer !== null && this.answer.Answer !== '') {
      this.Resultanswer = this.Resultanswer.filter(SubResult =>
        SubResult.Answer.toLowerCase().indexOf(this.answer.Answer.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.answer.AnswerID !== null && this.answer.AnswerID.toString() !== '') {
      this.Resultanswer = this.Resultanswer.filter(SubResult =>
        SubResult.AnswerID.toString().toLowerCase().indexOf(this.answer.AnswerID.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.Resultanswer = this.WithoutFilterAnswer;
    }
    this.Answers = this.Resultanswer;
  }

  ExportToExcel(): void {
    alasql('SELECT Answer_Code,Answer_Id,Answer_Name_ENg,Answer_Name_Uni,CreatedBy,ModifiedBy,' +
      'CreDate,ModDate,IsActive INTO XLSX("AnswerList.xlsx",{headers:true}) FROM ?', [this.Answers]);
  }
}
