import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../Components/Module/environment';
import { Moduleobj, ModuleobjEntity } from '../../../Components/Module/Masters/Module.model';
import { ModuleobjTransfarmer } from '../../../Components/Transformer/Masters/Module-Transfarmer';

import * as alasql from 'alasql';
alasql['private'].externalXlsxLib = require('xlsx');
@Component({
  selector: 'app-Module-list',
  templateUrl: './Module-list.component.html',
  styleUrls: ['./Module1-list.component.scss']
})
export class ModuleListComponent implements OnInit {
  @Input() questionInput: Moduleobj;
  arrOject: Moduleobj[];
  arrOjectEntity: ModuleobjEntity[];

  WithoutFilterObj: Moduleobj[];
  ResultOject: Moduleobj[];
  SerachCri: number;
  bindObj: Moduleobj;
  config: any;
  env = environment;
  constructor(private _router: Router,
    objTrans: ModuleobjTransfarmer,
    private route: ActivatedRoute) {      
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href='login';
    }
    this.arrOjectEntity = this.route.snapshot.data['ModuleList'];
    this.arrOject = objTrans.ModuleobjTransfarmers(this.arrOjectEntity);
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
      moduleId: null,
      moduleName: null,
      imagePath: null,
      checkOrder: null,
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
    if(this.bindObj.moduleName !== null && this.bindObj.moduleName !== '') {
    this.ResultOject = this.ResultOject.filter(SubResult =>
      SubResult.moduleName.toLowerCase().indexOf(this.bindObj.moduleName.toString().toLowerCase())
      !== -1);
    this.SerachCri = 1;
  }
  if (this.bindObj.moduleId !== null && this.bindObj.moduleId.toString() !== '') {
    this.ResultOject = this.ResultOject.filter(SubResult =>
      SubResult.moduleId.toString().toLowerCase().indexOf(
        this.bindObj.moduleId.toString().toLowerCase()) !== -1);
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
  alasql('SELECT moduleId Module_Code,moduleName Modul_Name,' +
  'isActive Status INTO XLSX("ModuleList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
