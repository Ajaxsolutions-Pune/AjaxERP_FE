import { Component, OnInit, Input } from '@angular/core';
import { JobLevel, JobLevelEntity } from '../../../Components/Module/HRMS/JobLevel.model';
import { JobLevelTransfarmer } from '../../../Components/Transformer/HRMS/JobLevel-Transfarmer';
import { environment } from '../../../Components/Module/environment';
import { Router, ActivatedRoute } from '@angular/router';

import * as alasql from 'alasql';
alasql['private'].externalXlsxLib = require('xlsx');


@Component({
  selector: 'app-job-level-list',
  templateUrl: './job-level-list.component.html',
  styleUrls: ['./job-level-list.component.scss']
})
export class JobLevelListComponent implements OnInit {

  @Input() questionInput: JobLevel;
  arrOject: JobLevel[];
  arrOjectEntity: JobLevelEntity[];

  WithoutFilterObj: JobLevel[];
  ResultOject: JobLevel[];
  SerachCri: number;
  bindObj: JobLevel;
  config: { itemsPerPage: any; currentPage: number; totalItems: any; };
  env = environment;
  constructor(private _router: Router,
    objTrans: JobLevelTransfarmer,
    private route: ActivatedRoute) {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';
    }
    this.arrOjectEntity = this.route.snapshot.data['JobLevelList'];
    this.arrOject = objTrans.JobLevelTransfarmers(this.arrOjectEntity);
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
      jobLevelCode: null,
      jobLevelName: null,
      reportingJobLevel: null,
      jobLevelStatus: '3',
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
    if (this.bindObj.jobLevelCode !== null && this.bindObj.jobLevelCode !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.jobLevelCode.toString().toLowerCase().indexOf(
          this.bindObj.jobLevelCode.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.jobLevelName !== null && this.bindObj.jobLevelName !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.jobLevelName.toString().toLowerCase().indexOf(
          this.bindObj.jobLevelName.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }

    if (this.bindObj.jobLevelStatus !== null && this.bindObj.jobLevelStatus.toString() !== '-1') {
      if (this.bindObj.jobLevelStatus.toString() === '3') {
        this.ResultOject = this.ResultOject.filter(SubResultProd =>
          SubResultProd.jobLevelStatus.toString() === 'Active' || SubResultProd.jobLevelStatus.toString() === 'Inactive');
      } else {
        this.ResultOject = this.ResultOject.filter(SubResultProd =>
          SubResultProd.jobLevelStatus.toString() === this.bindObj.jobLevelStatus.toString());
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
    alasql('SELECT jobLevelCode Job_Level_Code,jobLevelName Job_Level_Name,reportingJobLevel Reporting_Job_level,' +
      'jobLevelStatus Status INTO XLSX("JobLevelList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}

