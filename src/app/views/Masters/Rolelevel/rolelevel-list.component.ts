import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as alasql from 'alasql';
import { environment } from '../../../Components/Module/environment';
alasql['private'].externalXlsxLib = require('xlsx');
import { Rolelevel, RolelevelEntity } from '../../../Components/Module/Masters/Rolelevel.model';
import { RolelevelTransfarmer } from '../../../Components/Transformer/Masters/Role-level.Transfarmer';

@Component({
  selector: 'app-rolelevel-list',
  templateUrl: './rolelevel-list.component.html',
  styleUrls: ['./rolelevel-list.component.scss']
})
export class RolelevelListComponent implements OnInit {
  @Input() questionInput: Rolelevel;
  arrOject: Rolelevel[];
  arrOjectEntity: RolelevelEntity[];

  WithoutFilterObj: Rolelevel[];
  ResultOject: Rolelevel[];
  SerachCri: number;
  bindObj: Rolelevel;
  config: any;
  env = environment;
  constructor(private _router: Router,
    objTrans: RolelevelTransfarmer,
    private route: ActivatedRoute) {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      this._router.navigate(['login']);
    }
    this.arrOjectEntity = this.route.snapshot.data['RolelevelList'];
    this.arrOject = objTrans.RolelevelTransfarmers(this.arrOjectEntity);
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
      roleLevelDesc: null,
      roleLevelId: null,
      rolePriority: null,
      userType: null,
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
    if (this.bindObj.roleLevelDesc !== null && this.bindObj.roleLevelDesc !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.roleLevelDesc.toLowerCase().indexOf(this.bindObj.roleLevelDesc.toString().toLowerCase())
        !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.roleLevelId !== null && this.bindObj.roleLevelId.toString() !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.roleLevelId.toString().toLowerCase().indexOf(
          this.bindObj.roleLevelId.toString().toLowerCase()) !== -1);
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
    alasql('SELECT roleLevelId Rolelevel_Code,roleLevelDesc Rolelevel_Name,rolePriority Role_Priority,' +
      'isActive Status INTO XLSX("RoleLevelList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}

