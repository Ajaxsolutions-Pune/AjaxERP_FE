import { Component, OnInit, Input } from '@angular/core';
import { Question, QuestionEntity } from '../../../Components/Module/Masters/Question.model';
import { QuestionTransfarmer } from '../../../Components/Transformer/Masters/Question-Transfarmer';
import { Router, ActivatedRoute } from '@angular/router';
import * as alasql from 'alasql';
import { environment } from '../../../Components/Module/environment';
alasql['private'].externalXlsxLib = require('xlsx');


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
  config: any;
  env = environment;
  constructor(private _router: Router,
    objTrans: QuestionTransfarmer,
    private route: ActivatedRoute) {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      this._router.navigate(['login']);
    }
    this.arrOjectEntity = this.route.snapshot.data['QuestionList'];
    this.arrOject = objTrans.QuestionTransfarmers(this.arrOjectEntity);
    this.WithoutFilterObj = this.arrOject;
    this.config = {
      itemsPerPage: this.env.paginationPageSize,
      currentPage: 1,
      totalItems: this.arrOject.length
    };
  }

  ngOnInit() {
    this.WithoutFilterObj = this.arrOject;
    console.log(this.arrOject);
    this.bindObj = {
      isActive: '3',
      qaTypeCode: null,
      question: null,
      questionId: null,
      createdBy: null,
      createdDate: null,
      modifiedBy: null,
      modifiedDate: null,
    };
  }

  pageChanged(event) {
    this.config.currentPage = event;
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
    if (this.bindObj.isActive !== null && this.bindObj.isActive.toString() !== '-1') {
      if (this.bindObj.isActive.toString() === '3') {
        this.ResultOject = this.ResultOject.filter(SubResultProd =>
          SubResultProd.isActive.toString() === 'Active' || SubResultProd.isActive.toString() === 'Inactive');
      } else {
        this.ResultOject = this.ResultOject.filter(SubResultProd =>
          SubResultProd.isActive.toString() === this.bindObj.isActive.toString());
      }
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.ResultOject = this.WithoutFilterObj;
    }
    this.arrOject = this.ResultOject;
    this.config = {
      itemsPerPage: this.env.paginationPageSize,
      currentPage: 1,
      totalItems: this.arrOject.length
    };
  }

  ExportToExcel(): void {
    alasql('SELECT question Question,questionId Question_Id,' +
      'qaTypeCode Question_Type_Code,isActive Is_Active INTO XLSX("questionList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
