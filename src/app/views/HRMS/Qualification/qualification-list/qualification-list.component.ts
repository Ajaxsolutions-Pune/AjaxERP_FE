import { Component, OnInit, Input } from '@angular/core';
import { Qualification, QualificationEntity } from '../../../../Components/Module/HRMS/Qualification.model';
import { Router, ActivatedRoute } from '@angular/router';
import { QualificationTransfarmer } from '../../../../Components/Transformer/HRMS/Qualification-Transfarmer';
import { environment } from '../../../../Components/Module/environment';

import * as alasql from 'alasql';
alasql['private'].externalXlsxLib = require('xlsx');

@Component({
  selector: 'app-qualification-list',
  templateUrl: './qualification-list.component.html',
  styleUrls: ['./qualification-list.component.css']
})
export class QualificationListComponent implements OnInit {

  @Input() questionInput: Qualification;
  arrOject: Qualification[];
  arrOjectEntity: QualificationEntity[];

  WithoutFilterObj: Qualification[];
  ResultOject: Qualification[];
  SerachCri: number;
  bindObj: Qualification;
  config: { itemsPerPage: any; currentPage: number; totalItems: any; };
  env = environment;
  constructor(private _router: Router,
    objTrans: QualificationTransfarmer,
    private route: ActivatedRoute) {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';
    }
    this.arrOjectEntity = this.route.snapshot.data['QualificationList'];
    this.arrOject = objTrans.QualificationTransfarmers(this.arrOjectEntity);
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
      qualificationCode: null,
      qualificationName: null,
      qualificationDescription: null,
      qualificationLevel: null,
      specialization: null,
      qualificationType: null,
      qualificationStatus: '3',
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
    // if (this.bindObj.qualificationName !== null && this.bindObj.qualificationName  !== '') {
    //   this.ResultOject = this.ResultOject.filter(SubResult =>
    //     SubResult.gradeSetName.toString().toLowerCase().indexOf(
    //       this.bindObj.gradeSetName.toString().toLowerCase()) !== -1);
    //   this.SerachCri = 1;
    //     }
    if (this.bindObj.qualificationCode !== null && this.bindObj.qualificationCode !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.qualificationCode.toString().toLowerCase().indexOf(
          this.bindObj.qualificationCode.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.qualificationName !== null && this.bindObj.qualificationName !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.qualificationName.toLowerCase().indexOf(this.bindObj.qualificationName.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }

    if (this.bindObj.qualificationStatus !== null && this.bindObj.qualificationStatus.toString() !== '-1') {
      if (this.bindObj.qualificationStatus.toString() === '3') {
        this.ResultOject = this.ResultOject.filter(SubResultProd =>
          SubResultProd.qualificationStatus.toString() === 'Active' || SubResultProd.qualificationStatus.toString() === 'Inactive');
      } else {
        this.ResultOject = this.ResultOject.filter(SubResultProd =>
          SubResultProd.qualificationStatus.toString() === this.bindObj.qualificationStatus.toString());
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
    alasql('SELECT qualificationCode Qualification_Code,qualificationName Qualification_Name,qualificationDescription Qualification_Description,' +
      'qualificationStatus Status INTO XLSX("QualificationList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}


