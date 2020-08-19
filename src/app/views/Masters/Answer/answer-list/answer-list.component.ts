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
  objAnswer: Answer;
  constructor(private _router: Router,
    objTrans: AnswerTransfarmer,
    private answerService: AnswerService,
    private route: ActivatedRoute) {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      this._router.navigate(['login']);
    }
    this.answersEntity = this.route.snapshot.data['AnswerList'];
    this.answers = objTrans.AnswerTransfarmers(this.answersEntity);
    this.WithoutFilterAnswer = this.answers;
  }

  ngOnInit() {
    this.WithoutFilterAnswer = this.answers;
    this.objAnswer = {
      answer: null,
      answerId: null,
      isActive: '3'
    };
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.Resultanswer = this.WithoutFilterAnswer;
    if (this.objAnswer.answer !== null && this.objAnswer.answer !== '') {
      console.log(this.objAnswer.answer.toString().toLowerCase());
      this.Resultanswer = this.Resultanswer.filter(SubResult =>
        SubResult.answer.toLowerCase().indexOf(this.objAnswer.answer.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.objAnswer.answerId !== null && this.objAnswer.answerId.toString() !== '') {
      this.Resultanswer = this.Resultanswer.filter(SubResult =>
        SubResult.answerId.toString().toLowerCase().indexOf(this.objAnswer.answerId.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }

    if (this.objAnswer.isActive !== null && this.objAnswer.isActive.toString() !== '-1') {
      if (this.objAnswer.isActive.toString() === '3') {
        this.Resultanswer = this.Resultanswer.filter(SubResultProd =>
          SubResultProd.isActive.toString() === '1' || SubResultProd.isActive.toString() === '0');
      } else {
        this.Resultanswer = this.Resultanswer.filter(SubResultProd =>
          SubResultProd.isActive.toString() === this.objAnswer.isActive.toString());
      }
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
