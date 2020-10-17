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
      screenId: null,
      moduleId: null,
      screenName: null,
      workMode: null,
      checkOrder: null,
      imagePath: null,
      associateScreenId: null,
      associateLevel: null,
      isSubLinks: null,
      actionName: null,
      menuLink: null,
      isActive: '3',
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
    if (this.bindObj.screenId !== null && this.bindObj.screenId.toString() !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.screenId.toString().toLowerCase().indexOf(
          this.bindObj.screenId.toString().toLowerCase()) !== -1);
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
    alasql('SELECT screenId Screen_Code,screenName Screen_Name,' +
      'isActive Status INTO XLSX("ScreenList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
