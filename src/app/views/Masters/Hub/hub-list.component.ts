import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../Components/Module/environment';
import { Hub, HubEntity } from '../../../Components/Module/Masters/Hub.model';
import { HubTransfarmer } from '../../../Components/Transformer/Masters/Hub-Transfarmer';
import * as alasql from 'alasql';
alasql['private'].externalXlsxLib = require('xlsx');

@Component({
  selector: 'app-hub-list',
  templateUrl: './hub-list.component.html',
  styleUrls: ['./hub-list.component.scss']
})
export class HubListComponent implements OnInit {
  @Input() questionInput: Hub;
  arrOject: Hub[];
  arrOjectEntity: HubEntity[];

  WithoutFilterObj: Hub[];
  ResultOject: Hub[];
  SerachCri: number;
  bindObj: Hub;
  config: any;
  env = environment;
  constructor(private _router: Router,
    objTrans: HubTransfarmer,
    private route: ActivatedRoute) {
      if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
        this._router.navigate(['login']);
      }
    this.arrOjectEntity = this.route.snapshot.data['HubList'];
    this.arrOject = objTrans.HubTransfarmers(this.arrOjectEntity);
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
      hubCode: null,
      hubGroupCode: null,
      hubNameENG: null,
      hubTypeCode: null,
      sortBy: null,
      tlCode: null,
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
    if (this.bindObj.hubNameENG !== null && this.bindObj.hubNameENG !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.hubNameENG.toLowerCase().indexOf(this.bindObj.hubNameENG.toString().toLowerCase())
         !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.hubCode !== null && this.bindObj.hubCode.toString() !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.hubCode.toString().toLowerCase().indexOf(
          this.bindObj.hubCode.toString().toLowerCase()) !== -1);
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
    alasql('SELECT hubCode HUB_Code,hubNameENG HUB_Name,' +
      'isActive Status INTO XLSX("AssetGroupList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
