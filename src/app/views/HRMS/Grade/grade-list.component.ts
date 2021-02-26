import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../Components/Module/environment';
import { Grade, GradeEntity } from '../../../Components/Module/HRMS/Grade.model';
import { GradeTransfarmer } from '../../../Components/Transformer/HRMS/Grade-Transfarmer';

import * as alasql from 'alasql';
alasql['private'].externalXlsxLib = require('xlsx');

@Component({
  selector: 'app-grade-list',
  templateUrl: './grade-list.component.html',
  styleUrls: ['./grade-list.component.scss']
})
export class GradeListComponent implements OnInit {
  @Input() questionInput: Grade;
  arrOject: Grade[];
  arrOjectEntity: GradeEntity[];
  WithoutFilterObj: Grade[];
  ResultOject: Grade[];
  SerachCri: number;
  bindObj: Grade;
  config: { itemsPerPage: any; currentPage: number; totalItems: any; };
  env = environment;
  constructor(private _router: Router,
    objTrans: GradeTransfarmer,
    private route: ActivatedRoute) {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';
    }
    this.arrOjectEntity = this.route.snapshot.data['GradeList'];
    this.arrOject = objTrans.GradeTransfarmers(this.arrOjectEntity);
    this.WithoutFilterObj = this.arrOject;
    this.config = {
      itemsPerPage: this.env.paginationPageSize,
      currentPage: 1,
      totalItems: this.arrOject.length
    };
  }
  ngOnInit() {
    this.WithoutFilterObj = this.arrOject;
    this.bindObj = {
      ouCode: '12',
      gradeCode: null,
      gradeSetCode: null,
      gradeSetName: null,
      gradeName: null,
      gradeDescription: null,
      startDate: null,
      gradeStatus: '3',
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
    if (this.bindObj.gradeSetName !== null && this.bindObj.gradeSetName !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.gradeSetName.toString().toLowerCase().indexOf(
          this.bindObj.gradeSetName.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.gradeCode !== null && this.bindObj.gradeCode !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.gradeCode.toString().toLowerCase().indexOf(
          this.bindObj.gradeCode.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.gradeName !== null && this.bindObj.gradeName !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.gradeName.toLowerCase().indexOf(this.bindObj.gradeName.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }

    if (this.bindObj.gradeStatus !== null && this.bindObj.gradeStatus.toString() !== '-1') {
      if (this.bindObj.gradeStatus.toString() === '3') {
        this.ResultOject = this.ResultOject.filter(SubResultProd =>
          SubResultProd.gradeStatus.toString() === 'Active' || SubResultProd.gradeStatus.toString() === 'Inactive');
      } else {
        this.ResultOject = this.ResultOject.filter(SubResultProd =>
          SubResultProd.gradeStatus.toString() === this.bindObj.gradeStatus.toString());
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
    alasql('SELECT gradeCode Grade_Code,gradeName Grade_Name,startDate Date,gradeDescription Grade_Description,' +
      'gradeStatus Status INTO XLSX("GradeList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}

