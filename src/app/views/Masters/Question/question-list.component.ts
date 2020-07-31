import { Component, OnInit, Input } from '@angular/core';
import { Question, QuestionEntity } from '../../../Compound/Module/Masters/Question.model';
import { QuestionTransfarmer } from '../../../Compound/Transformer/Masters/Question-Transfarmer';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  @Input() questionInput: Question;
  arrOject: Question[];
  arrOjectEntity: QuestionEntity[];

  WithoutFilterObj: Question[];
  ResultOject: Question[];
  SerachCri: number;
  bindObj: Question;
  constructor(private _router: Router,
    objTrans: QuestionTransfarmer,
    private route: ActivatedRoute) {
    this.arrOjectEntity = this.route.snapshot.data['QuestionList'];
    this.arrOject = objTrans.QuestionTransfarmers(this.arrOjectEntity);
    this.WithoutFilterObj = this.arrOject;
  }

  ngOnInit() {
    this.WithoutFilterObj = this.arrOject;
    console.log(this.arrOject);
    this.bindObj = {
      isActive: null,
      qaTypeCode: null,
      question: null,
      questionId: null
    };
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.ResultOject = this.WithoutFilterObj;
    if (this.bindObj.question !== null && this.bindObj.question !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.question.toLowerCase().indexOf(this.bindObj.question.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.questionId !== null && this.bindObj.questionId.toString() !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.questionId.toString().toLowerCase().indexOf(this.bindObj.questionId.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.ResultOject = this.WithoutFilterObj;
    }
    this.arrOject = this.ResultOject;
  }

  ExportToExcel(): void {
    alasql('SELECT question_Code,question_Id,question_Name_ENg,question_Name_Uni,CreatedBy,ModifiedBy,' +
      'CreDate,ModDate,IsActive INTO XLSX("questionList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
