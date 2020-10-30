import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../Components/Module/environment';
import { MasterDrp } from '../../../Components/Module/Masters/MasterDrp.model';
import { UserDeviceReg, UserDeviceRegEntity } from '../../../Components/Module/Masters/UserDeviceReg.model';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import { UserDeviceRegTransfarmer } from '../../../Components/Transformer/Masters/UserDeviceReg-Transfarmer';

import * as alasql from 'alasql';
alasql['private'].externalXlsxLib = require('xlsx');

@Component({
  selector: 'app-user-device-reg-list',
  templateUrl: './user-device-reg-list.component.html',
  styleUrls: ['./user-device-reg-list.component.scss']
})
export class UserDeviceRegListComponent implements OnInit {
  @Input() questionInput: UserDeviceReg;
  arrOject: UserDeviceReg[];
  statusDrp: MasterDrp[];
  arrOjectEntity: UserDeviceRegEntity[];

  WithoutFilterObj: UserDeviceReg[];
  ResultOject: UserDeviceReg[];
  SerachCri: number;
  bindObj: UserDeviceReg;
  config: any;
  env = environment;
  constructor(private _router: Router,
    objTrans: UserDeviceRegTransfarmer,
    private globalService: GlobalService,
    private route: ActivatedRoute) {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';
    }
    this.arrOjectEntity = this.route.snapshot.data['UserDeviceRegList'];
    this.arrOject = objTrans.userDeviceRegTransfarmers(this.arrOjectEntity);
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
      appSource: null,
      approveFlag: null,
      deviceId: null,
      deviceRegNo: null,
      emailId: null,
      employeeId: null,
      firstName: null,
      id: null,
      isActive: '3',
      isApproved: '3',
      lastName: null,
      loginId: null,
      mobileNo: null,
      ouCode: null,
      password: null,
      createdBy: null,
      createdDate: null,
      modifiedBy: null,
      modifiedDate: null,
    };
    this.globalService.fillMasterDrp('UDAPS').subscribe(
      (par) => {
        this.statusDrp = par;
      },
      (err: any) => console.log(err));
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }
  resultChanged(): void {
    this.SerachCri = 0;
    this.ResultOject = this.WithoutFilterObj;
    if (this.bindObj.firstName !== null && this.bindObj.firstName !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.firstName.toLowerCase().indexOf(this.bindObj.firstName.toString().toLowerCase())
        !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.employeeId !== null && this.bindObj.employeeId.toString() !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.employeeId.toString().toLowerCase().indexOf(
          this.bindObj.employeeId.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.isApproved !== null && this.bindObj.isApproved.toString() !== '-1') {
      if (this.bindObj.isApproved.toString() === '3') {
        this.ResultOject = this.ResultOject.filter(SubResultProd =>
          SubResultProd.isApproved.toString() !== '-1');
      } else {
        this.ResultOject = this.ResultOject.filter(SubResult =>
          SubResult.isApproved.toString().toLowerCase().indexOf(
            this.bindObj.isApproved.toString().toLowerCase()) !== -1);
      }
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
    alasql('SELECT deviceRegNo Device_Reg_No,emailId Email,employeeId Employee_Id,firstName Name,' +
      'isApproved Status INTO XLSX("AssetList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
