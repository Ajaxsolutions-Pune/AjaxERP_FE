import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TransmissionLine, TransmissionLineEntity } from '../../../Components/Module/Masters/TransmissionLine.model';
import { environment } from '../../../Components/Module/environment';
import * as alasql from 'alasql';
import { TransmissionLineTransfarmer } from '../../../Components/Transformer/Masters/TransmissionLine-Transfarmer';
alasql['private'].externalXlsxLib = require('xlsx');

@Component({
  selector: 'app-transmission-line-list',
  templateUrl: './transmission-line-list.component.html',
  styleUrls: ['./transmission-line-list.component.scss']
})
export class TransmissionLineListComponent implements OnInit {
  @Input() questionInput: TransmissionLine;
  arrOject: TransmissionLine[];
  arrOjectEntity: TransmissionLineEntity[];

  WithoutFilterObj: TransmissionLine[];
  ResultOject: TransmissionLine[];
  SerachCri: number;
  bindObj: TransmissionLine;
  config: any;
  env = environment;
  constructor(private _router: Router,
    objTrans: TransmissionLineTransfarmer,
    private route: ActivatedRoute) {
      if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
        this._router.navigate(['login']);
      }
    this.arrOjectEntity = this.route.snapshot.data['TransmissionLineList'];
    this.arrOject = objTrans.TransmissionLineTransfarmers(this.arrOjectEntity);
    this.WithoutFilterObj = this.arrOject;
    this.config = {
      itemsPerPage: this.env.paginationPageSize,
      currentPage: 1,
      totalItems: this.arrOject.length
    };
  }
  ngOnInit() {
    this.WithoutFilterObj = this.arrOject;
    console.log(this.arrOject);
    this.bindObj = {
      ouCode: null,
      projectCode: null,
      sortBy: null,
      tlCode: null,
      tlGroupCode: null,
      tlNameENG: null,
      tlTypeCode: null,
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
    if (this.bindObj.tlNameENG !== null && this.bindObj.tlNameENG !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.tlNameENG.toLowerCase().indexOf(this.bindObj.tlNameENG.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.tlCode !== null && this.bindObj.tlCode.toString() !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.tlCode.toString().toLowerCase().indexOf(this.bindObj.tlCode.toString().toLowerCase()) !== -1);
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
    alasql('SELECT TransmissionLineCode Asset_Category_Code,assetGroupNameENG Asset_GroupName,' +
      'isActive INTO XLSX("AssetGroupList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
