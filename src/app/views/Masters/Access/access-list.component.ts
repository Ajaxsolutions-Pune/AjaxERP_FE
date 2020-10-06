import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../Components/Module/environment';
import { Access, AccessEntity } from '../../../Components/Module/Masters/Access.model';
import { AccessTransfarmer } from '../../../Components/Transformer/Masters/Access-Transfarmer';

import * as alasql from 'alasql';
alasql['private'].externalXlsxLib = require('xlsx');

@Component({
  selector: 'app-access-list',
  templateUrl: './access-list.component.html',
  styleUrls: ['./access-list.component.scss']
})
export class AccessListComponent implements OnInit {
  @Input() questionInput: Access;
  arrOject: Access[];
  arrOjectEntity: AccessEntity[];

  WithoutFilterObj: Access[];
  ResultOject: Access[];
  SerachCri: number;
  bindObj: Access;
  config: any;
  env = environment;
  constructor(private _router: Router,
    objTrans: AccessTransfarmer,
    private route: ActivatedRoute) {      
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href='login';
    }
    this.arrOjectEntity = this.route.snapshot.data['AccessList'];
    this.arrOject = objTrans.AccessTransfarmers(this.arrOjectEntity);
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
      accessId: null,
      accessName: null,
      isActive: '3',
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
    if(this.bindObj.accessName !== null && this.bindObj.accessName !== '') {
    this.ResultOject = this.ResultOject.filter(SubResult =>
      SubResult.accessName.toLowerCase().indexOf(this.bindObj.accessName.toString().toLowerCase())
      !== -1);
    this.SerachCri = 1;
  }
  if (this.bindObj.accessId !== null && this.bindObj.accessId.toString() !== '') {
    this.ResultOject = this.ResultOject.filter(SubResult =>
      SubResult.accessId.toString().toLowerCase().indexOf(
        this.bindObj.accessId.toString().toLowerCase()) !== -1);
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
  alasql('SELECT accessId access_Code,accessName Access_Name,' +
  'isActive Status INTO XLSX("AssetList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
