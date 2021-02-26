import { Component, OnInit, Input } from '@angular/core';
import { QualificationLevel, QualificationLevelEntity } from '../../../Components/Module/HRMS/QualificationLevel.model';
import { environment } from '../../../Components/Module/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { QualificationLevelTransfarmer } from '../../../Components/Transformer/HRMS/QualificationLevel-Transfarmer';
//import { GradeTransfarmer } from '../../../Components/Transformer/HRMS/Grade-Transfarmer';
import * as alasql from 'alasql';
alasql['private'].externalXlsxLib = require('xlsx');

@Component({
  selector: 'app-qualification-level-list',
  templateUrl: './qualification-level-list.component.html',
  styleUrls: ['./qualification-level-list.component.scss']
})
export class QualificationLevelListComponent implements OnInit {
  @Input() questionInput: QualificationLevel;
  arrOject: QualificationLevel[];
  arrOjectEntity: QualificationLevelEntity[];

  WithoutFilterObj: QualificationLevel[];
  ResultOject: QualificationLevel[];
  SerachCri: number;
  bindObj: QualificationLevel;
  config: { itemsPerPage: any; currentPage: number; totalItems: any; };
  env = environment;
  constructor(private _router: Router,
    objTrans: QualificationLevelTransfarmer,
    private route: ActivatedRoute) {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';
    }
    this.arrOjectEntity = this.route.snapshot.data['QualificationLevelList'];
    this.arrOject = objTrans.QualificationLevelTransfarmers(this.arrOjectEntity);
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
      qualificationLevelName: null,
      qualificationLevelDesc: null,
      qualificationLevelCode: null,
      qualificationLevelStatus: '3',
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
    if (this.bindObj.qualificationLevelCode !== null && this.bindObj.qualificationLevelCode !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.qualificationLevelCode.toString().toLowerCase().indexOf(
          this.bindObj.qualificationLevelCode.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.qualificationLevelName !== null && this.bindObj.qualificationLevelName !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.qualificationLevelName.toString().toLowerCase().indexOf(
          this.bindObj.qualificationLevelName.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    // if (this.bindObj.qualificationLevelStatus !== null && this.bindObj.qualificationLevelStatus !== '') {
    //   this.ResultOject = this.ResultOject.filter(SubResult =>
    //     SubResult.qualificationLevelStatus.toLowerCase().indexOf(this.bindObj.qualificationLevelStatus.toString().toLowerCase()) !== -1);
    //   this.SerachCri = 1;
    // }

    if (this.bindObj.qualificationLevelStatus !== null && this.bindObj.qualificationLevelStatus.toString() !== '-1') {
      if (this.bindObj.qualificationLevelStatus.toString() === '3') {
        this.ResultOject = this.ResultOject.filter(SubResultProd =>
          SubResultProd.qualificationLevelStatus.toString() === 'Active' || SubResultProd.qualificationLevelStatus.toString() === 'Inactive');
      } else {
        this.ResultOject = this.ResultOject.filter(SubResultProd =>
          SubResultProd.qualificationLevelStatus.toString() === this.bindObj.qualificationLevelStatus.toString());
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
    alasql('SELECT qualificationLevelCode Qualification_Level__Code,qualificationLevelName Qualification_Level_Name,qualificationLevelDesc Qualification_Level_Description,' +
      'qualificationLevelStatus Status INTO XLSX("QualificationLevelList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
