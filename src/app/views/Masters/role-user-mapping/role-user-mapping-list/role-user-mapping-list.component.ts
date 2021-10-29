import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RoleUserMapping, RoleUserMappingEntity } from '../../../../Components/Module/Masters/RoleUserMapping.model';
import { environment } from '../../../../Components/Module/environment';
import { RoleUserMappingTransfarmer } from '../../../../Components/Transformer/Masters/Role-User-Mapping-Transfarmer';
import * as alasql from 'alasql';
alasql['private'].externalXlsxLib = require('xlsx');
@Component({
  selector: 'app-role-user-mapping-list',
  templateUrl: './role-user-mapping-list.component.html',
  styleUrls: ['./role-user-mapping-list.component.scss']
})
export class RoleUserMappingListComponent implements OnInit {
  @Input() questionInput: RoleUserMapping;
  arrOject: RoleUserMapping[];
  arrOjectEntity: RoleUserMappingEntity[];

  WithoutFilterObj: RoleUserMapping[];
  ResultOject: RoleUserMapping[];
  SerachCri: number;
  bindObj: RoleUserMapping;
  config: any;
  env = environment;
  constructor(private _router: Router,
    objTrans: RoleUserMappingTransfarmer,
    private route: ActivatedRoute) {
      if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
        window.location.href='login';
      }
      this.arrOjectEntity = this.route.snapshot.data['RoleUserMappingList'];
      this.arrOject = objTrans.RoleUserMappingTransfarmers(this.arrOjectEntity);
      this.WithoutFilterObj = this.arrOject;
      this.config = {
        itemsPerPage: this.env.paginationPageSize,
        currentPage: 1,
        totalItems: this.arrOject.length
      }; }


  ngOnInit() {
    this.WithoutFilterObj = this.arrOject;
    this.bindObj = {
      roleLoginTrnId: null,
      roleId: null,
      loginId: null,
      roleBelongsTo: null,
      effectiveFromDate: null,
      effectiveToDate: null,
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
    if(this.bindObj.roleId !== null && this.bindObj.roleId !== '') {
    this.ResultOject = this.ResultOject.filter(SubResult =>
      SubResult.roleId.toLowerCase().indexOf(this.bindObj.roleId.toString().toLowerCase())
      !== -1);
    this.SerachCri = 1;
  }
  if (this.bindObj.loginId !== null && this.bindObj.loginId.toString() !== '') {
    this.ResultOject = this.ResultOject.filter(SubResult =>
      SubResult.loginId.toString().toLowerCase().indexOf(
        this.bindObj.loginId.toString().toLowerCase()) !== -1);
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
// ExportToExcel(): void {
//   alasql('SELECT accessId access_Code,accessName Access_Name,' +
//   'isActive Status INTO XLSX("AssetList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
//   }

}
