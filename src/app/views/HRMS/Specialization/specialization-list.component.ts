import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../Components/Module/environment';
import { Specialization, SpecializationEntity } from '../../../Components/Module/HRMS/Specialization.model';
import { SpecializationTransfarmer } from '../../../Components/Transformer/HRMS/Specialization-Transfarmer';

import * as alasql from 'alasql';
alasql['private'].externalXlsxLib = require('xlsx');

@Component({
  selector: 'app-specialization-list',
  templateUrl: './specialization-list.component.html',
  styleUrls: ['./specialization-list.component.scss']
})
export class SpecializationListComponent implements OnInit {

  @Input() questionInput: Specialization;
  arrOject: Specialization[];
  arrOjectEntity: SpecializationEntity[];

  WithoutFilterObj: Specialization[];
  ResultOject: Specialization[];
  SerachCri: number;
  bindObj: Specialization;
  config: { itemsPerPage: any; currentPage: number; totalItems: any; };
  env = environment;
  constructor(private _router: Router,
    objTrans: SpecializationTransfarmer,
    private route: ActivatedRoute) {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';
    }
    this.arrOjectEntity = this.route.snapshot.data['SpecializationList'];
    this.arrOject = objTrans.SpecializationTransfarmers(this.arrOjectEntity);
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
      specializationName: null,
      specializationDesc: null,
      specializationCode: null,
      specializationStatus: '3',
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
    if (this.bindObj.specializationCode !== null && this.bindObj.specializationCode !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.specializationCode.toString().toLowerCase().indexOf(
          this.bindObj.specializationCode.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.specializationName !== null && this.bindObj.specializationName !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.specializationName.toString().toLowerCase().indexOf(
          this.bindObj.specializationName.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }

    if (this.bindObj.specializationStatus !== null && this.bindObj.specializationStatus.toString() !== '-1') {
      if (this.bindObj.specializationStatus.toString() === '3') {
        this.ResultOject = this.ResultOject.filter(SubResultProd =>
          SubResultProd.specializationStatus.toString() === 'Active' || SubResultProd.specializationStatus.toString() === 'Inactive');
      } else {
        this.ResultOject = this.ResultOject.filter(SubResultProd =>
          SubResultProd.specializationStatus.toString() === this.bindObj.specializationStatus.toString());
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
    alasql('SELECT specializationCode Specialization_Code,specializationName Specialization_Name,specializationDesc Specialization_Description,' +
      'specializationStatus Status INTO XLSX("SpecializationList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
