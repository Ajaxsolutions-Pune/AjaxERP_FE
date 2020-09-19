import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Answer, AnswerEntity } from '../../../../Components/Module/Masters/Answer.model';
import { AnswerTransfarmer } from '../../../../Components/Transformer/Masters/Answer-Transfarmer';
import { AnswerService } from '../../../../Components/Services/Masters/AnswerService';
import * as alasql from 'alasql';
alasql['private'].externalXlsxLib = require('xlsx');
import { environment } from '../../../../Components/Module/environment';

@Component({
  selector: 'app-answer-list',
  templateUrl: './Answer-list.component.html',
  styleUrls: ['./Answer-list.component.scss']
})
export class AnswerListComponent implements OnInit {
  @Input() AnswerInput: Answer;
  answers: Answer[];
  answersEntity: AnswerEntity[];
  config: any;
  env = environment;

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
    this.config = {
      itemsPerPage:  this.env.paginationPageSize,
      currentPage: 1,
      totalItems: this.answers.length
    };
  }

  ngOnInit() {
    this.WithoutFilterAnswer = this.answers;
    this.objAnswer = {
      answer: null,
      answerId: null,
      createdBy: null,
      createdDate: null,
      modifiedBy: null,
      modifiedDate: null,
      isActive: '3'
    };
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }
  resultChanged(): void {
    this.SerachCri = 0;
    this.Resultanswer = this.WithoutFilterAnswer;
    if (this.objAnswer.answer !== null && this.objAnswer.answer !== '') {
      // console.log(this.objAnswer.answer.toString().toLowerCase());
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
          SubResultProd.isActive.toString() === 'Active'
          || SubResultProd.isActive.toString() === 'Inactive');
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
    this.config = {
      itemsPerPage: this.env.paginationPageSize,
      currentPage: 1,
      totalItems: this.answers.length
    };
  }

  ExportToExcel(): void {
    alasql('SELECT answerId Answer_Id,answer Answer,isActive Is_Active' +
      ' INTO XLSX("AnswerList.xlsx",{headers:true}) FROM ?', [this.answers]);


  }
}
