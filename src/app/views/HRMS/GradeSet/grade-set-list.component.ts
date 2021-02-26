import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../Components/Module/environment';
import { GradeSet, GradeSetEntity } from '../../../Components/Module/HRMS/GradeSet.model';
import { GradeSetTransfarmer } from '../../../Components/Transformer/HRMS/GradeSet-Transfarmer';

import * as alasql from 'alasql';
alasql['private'].externalXlsxLib = require('xlsx');

@Component({
  selector: 'app-grade-set-list',
  templateUrl: './grade-set-list.component.html',
  styleUrls: ['./grade-set-list.component.scss']
})
export class GradeSetListComponent implements OnInit {

  @Input() questionInput: GradeSet;
  arrOject: GradeSet[];
  arrOjectEntity: GradeSetEntity[];

  WithoutFilterObj: GradeSet[];
  ResultOject: GradeSet[];
  SerachCri: number;
  bindObj: GradeSet;
  config:{ itemsPerPage: any; currentPage: number; totalItems: any; };
  env = environment;
  constructor(private _router: Router,
    objTrans: GradeSetTransfarmer,
    private route: ActivatedRoute) {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';
    }
    this.arrOjectEntity = this.route.snapshot.data['GradeSetList'];
    this.arrOject = objTrans.GradeSetTransfarmers(this.arrOjectEntity);
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
      ouCode: null,
      gradeSetCode:null,
      gradeSetName: null,
      gradeSetDescription: null,
      startDate: null,
      gradeSetStatus:'3',
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
    if (this.bindObj.gradeSetCode !== null && this.bindObj.gradeSetCode.toString() !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.gradeSetCode.toString().toLowerCase().indexOf(
          this.bindObj.gradeSetCode.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.gradeSetName !== null && this.bindObj.gradeSetName !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.gradeSetName.toLowerCase().indexOf(this.bindObj.gradeSetName.toString().toLowerCase())
        !== -1);
      this.SerachCri = 1;
    }
   
    if (this.bindObj.gradeSetStatus !== null && this.bindObj.gradeSetStatus.toString() !== '-1') {
      if (this.bindObj.gradeSetStatus.toString() === '3') {
        this.ResultOject = this.ResultOject.filter(SubResultProd =>
          SubResultProd.gradeSetStatus.toString() === 'Active' || SubResultProd.gradeSetStatus.toString() === 'Inactive');
      } else {
        this.ResultOject = this.ResultOject.filter(SubResultProd =>
          SubResultProd.gradeSetStatus.toString() === this.bindObj.gradeSetStatus.toString());
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
    alasql('SELECT  gradeSetCode GradeSet_Code ,gradeSetName GradeSet_Name,startDate Date,' +
        'gradeSetStatus Status  INTO XLSX("GradeSetList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
