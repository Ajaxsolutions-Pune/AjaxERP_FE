import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../Components/Module/environment';
import { Job, JobEntity } from '../../../Components/Module/HRMS/Job.model';
import { Router, ActivatedRoute } from '@angular/router';
import { JobTransfarmer } from '../../../Components/Transformer/HRMS/Job-Transfarmer';

import * as alasql from 'alasql';
alasql['private'].externalXlsxLib = require('xlsx');

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {

  @Input() questionInput: Job;
  arrOject: Job[];
  arrOjectEntity: JobEntity[];
  WithoutFilterObj: Job[];
  ResultOject: Job[];
  SerachCri: number;
  bindObj: Job;
  config: { itemsPerPage: any; currentPage: number; totalItems: any; };
  env = environment;
  constructor(private _router: Router,
    objTrans: JobTransfarmer,
    private route: ActivatedRoute) {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';
    }
    this.arrOjectEntity = this.route.snapshot.data['JobList'];
    this.arrOject = objTrans.JobTransfarmers(this.arrOjectEntity);
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
      jobCode: null,
      jobName: null,
      jobProfile: null,
      gradeCode: null,
      jobDescription: null,
      startDate: null,
      jobLevel: null,
      jobStatus: '3',
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
    if (this.bindObj.jobCode !== null && this.bindObj.jobCode !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.jobCode.toString().toLowerCase().indexOf(
          this.bindObj.jobCode.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.jobName !== null && this.bindObj.jobName !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.jobName.toLowerCase().indexOf(this.bindObj.jobName.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }


    if (this.bindObj.jobLevel !== null && this.bindObj.jobLevel !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.jobLevel.toString().toLowerCase().indexOf(
          this.bindObj.jobLevel.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.jobStatus !== null && this.bindObj.jobStatus.toString() !== '-1') {
      if (this.bindObj.jobStatus.toString() === '3') {
        this.ResultOject = this.ResultOject.filter(SubResultProd =>
          SubResultProd.jobStatus.toString() === 'Active' || SubResultProd.jobStatus.toString() === 'Inactive');
      } else {
        this.ResultOject = this.ResultOject.filter(SubResultProd =>
          SubResultProd.jobStatus.toString() === this.bindObj.jobStatus.toString());
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
    alasql('SELECT jobCode Job_Code,jobName Job_Name,startDate Date,jobDescription Job_Description,' +
      'jobStatus Status INTO XLSX("JobList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}

