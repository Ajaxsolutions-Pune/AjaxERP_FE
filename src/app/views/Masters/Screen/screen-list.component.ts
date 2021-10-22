import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as alasql from 'alasql';
import { environment } from '../../../Components/Module/environment';
import { ScreenObj, ScreenObjEntity } from '../../../Components/Module/Masters/Screen.model';
import { ScreenObjTransfarmer } from '../../../Components/Transformer/Masters/Screen-Transfarmer';
alasql['private'].externalXlsxLib = require('xlsx');

@Component({
  selector: 'app-screen-list',
  templateUrl: './screen-list.component.html',
  styleUrls: ['./screen-list.component.scss']
})
export class ScreenListComponent implements OnInit {
  @Input() questionInput: ScreenObj;
  arrOject: ScreenObj[];
  arrOjectEntity: ScreenObjEntity[];

  WithoutFilterObj: ScreenObj[];
  ResultOject: ScreenObj[];
  SerachCri: number;
  bindObj: ScreenObj;
  config: any;
  env = environment;
  constructor(private _router: Router,
    objTrans: ScreenObjTransfarmer,
    private route: ActivatedRoute) {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';
    }
    this.arrOjectEntity = this.route.snapshot.data['ScreenList'];
    this.arrOject = objTrans.ScreenTransfarmers(this.arrOjectEntity);
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
      screenID:null,
      parentID: null,
      screenName: null,
      actionPath: null,
      is_Active: '3',
      createdBy: null,
      createdDate: null,
      modifiedBy: null,
      modifiedDate: null
    }
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }
  resultChanged(): void {
    this.SerachCri = 0;
    this.ResultOject = this.WithoutFilterObj;
    if (this.bindObj.screenName !== null && this.bindObj.screenName !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.screenName.toLowerCase().indexOf(this.bindObj.screenName.toString().toLowerCase())
        !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.screenID !== null && this.bindObj.screenID.toString() !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.screenID.toString().toLowerCase().indexOf(
          this.bindObj.screenID.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.is_Active !== null && this.bindObj.is_Active.toString() !== '-1') {
      if (this.bindObj.is_Active.toString() === '3') {
        this.ResultOject = this.ResultOject.filter(SubResultProd =>
          SubResultProd.is_Active.toString() === 'Active' || SubResultProd.is_Active.toString() === 'Inactive');
      } else {
        this.ResultOject = this.ResultOject.filter(SubResultProd =>
          SubResultProd.is_Active.toString() === this.bindObj.is_Active.toString());
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
    alasql('SELECT screenId Screen_Code,screenName Screen_Name,' +
      'isActive Status INTO XLSX("ScreenList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
