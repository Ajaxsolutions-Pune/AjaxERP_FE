import { Component, OnInit, Input } from '@angular/core';
import { Region, RegionEntity } from '../../../Components/Module/Masters/Region.model';
import { Router, ActivatedRoute } from '@angular/router';
import { RegionTransfarmer } from '../../../Components/Transformer/Masters/Region-Transfarmer';
import * as alasql from 'alasql';
import { environment } from '../../../Components/Module/environment';
alasql['private'].externalXlsxLib = require('xlsx');

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.scss']
})
export class RegionListComponent implements OnInit {
  @Input() questionInput: Region;
  arrOject: Region[];
  arrOjectEntity: RegionEntity[];

  WithoutFilterObj: Region[];
  ResultOject: Region[];
  SerachCri: number;
  bindObj: Region;
  config: any;
  env = environment;
  constructor(private _router: Router,
    objTrans: RegionTransfarmer,
    private route: ActivatedRoute) {
      if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
        this._router.navigate(['login']);
      }
    this.arrOjectEntity = this.route.snapshot.data['RegionList'];
    this.arrOject = objTrans.RegionTransfarmers(this.arrOjectEntity);
    this.WithoutFilterObj = this.arrOject;
    this.config = {
      itemsPerPage: this.env.paginationPageSize,
      currentPage: 1,
      totalItems: this.arrOject.length
    };
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }
  ngOnInit() {
    this.WithoutFilterObj = this.arrOject;
    console.log(this.arrOject);
    this.bindObj = {
      regionCode: null,
      regionNameENG: null,
      regionNameUNI: null,
      isActive: '3',
      createdBy: localStorage.getItem('username'),
      createdDate:  null,
      modifiedBy: localStorage.getItem('username'),
      modifiedDate:  null,
    };
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.ResultOject = this.WithoutFilterObj;
    if (this.bindObj.regionNameENG !== null && this.bindObj.regionNameENG !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.regionNameENG.toLowerCase().indexOf(this.bindObj.regionNameENG.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.regionCode !== null && this.bindObj.regionCode.toString() !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.regionCode.toString().toLowerCase().indexOf(this.bindObj.regionCode.toString().toLowerCase()) !== -1);
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
    alasql('SELECT regionCode Region_Code,regionNameENG Region_Name,isActive Active' +
      ' INTO XLSX("RegionList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
