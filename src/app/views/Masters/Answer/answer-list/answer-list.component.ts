import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Answer, AnswerEntity } from '../../../../Compound/Module/Masters/Answer.model';
import { AnswerTransfarmer } from '../../../../Compound/Transformer/Masters/Answer-Transfarmer';
import { AnswerService } from '../../../../Compound/Services/Masters/AnswerService';

@Component({
  selector: 'app-answer-list',
  templateUrl: './Answer-list.component.html',
  styleUrls: ['./Answer-list.component.scss']
})
export class AnswerListComponent implements OnInit {
  @Input() AnswerInput: Answer;
  answers: Answer[];
  answersEntity: AnswerEntity[];

  WithoutFilterAnswer: Answer[];
  Resultanswer: Answer[];
  SerachCri: number;
  answer: Answer;
  constructor(private _router: Router,
    objTrans: AnswerTransfarmer,
    private answerService: AnswerService,
    private route: ActivatedRoute) {
    this.answersEntity = this.route.snapshot.data['AnswerList'];
    this.answers =  objTrans.AnswerTransfarmers(this.answersEntity);
    this.WithoutFilterAnswer = this.answers;
  }

  ngOnInit() {
    this.WithoutFilterAnswer = this.answers;
    this.answer = {
      answer: null,
      answerId: null,
      isActive: null
    };
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.Resultanswer = this.WithoutFilterAnswer;
    if (this.answer.answer !== null && this.answer.answer !== '') {
      this.Resultanswer = this.Resultanswer.filter(SubResult =>
        SubResult.answer.toLowerCase().indexOf(this.answer.answer.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.answer.answerId !== null && this.answer.answerId.toString() !== '') {
      this.Resultanswer = this.Resultanswer.filter(SubResult =>
        SubResult.answerId.toString().toLowerCase().indexOf(this.answer.answerId.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.Resultanswer = this.WithoutFilterAnswer;
    }
    this.answers = this.Resultanswer;
  }

  ExportToExcel(): void {
    alasql('SELECT Answer_Code,Answer_Id,Answer_Name_ENg,Answer_Name_Uni,CreatedBy,ModifiedBy,' +
      'CreDate,ModDate,IsActive INTO XLSX("AnswerList.xlsx",{headers:true}) FROM ?', [this.answers]);
  }
}
