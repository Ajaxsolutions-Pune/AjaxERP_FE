import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Device, DeviceEntity } from '../../../Components/Module/Masters/Device.model';
import { DeviceTransfarmer } from '../../../Components/Transformer/Masters/Device-Transfarmer';
import { environment } from '../../../Components/Module/environment';
import * as alasql from 'alasql';
alasql['private'].externalXlsxLib = require('xlsx');

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {
  @Input() DeviceInput: Device;
  arrOject: Device[];
  arrOjectEntity: DeviceEntity[];

  WithoutFilterObj: Device[];
  ResultOject: Device[];
  SerachCri: number;
  bindObj: Device;
  config: any;
  env = environment;
  constructor(private _router: Router,
    objTrans: DeviceTransfarmer,
    private route: ActivatedRoute) {
      if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
        this._router.navigate(['login']);
      }
     this.arrOjectEntity = this.route.snapshot.data['DeviceList'];
     this.arrOject = objTrans.DeviceTransfarmers(this.arrOjectEntity);
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
      deviceId: null,
      imei1: null,
      imei2: null,
      deviceName: null,
      model: null,
      osVersion: null,
      appVersion: null,
      uiVersion: null,
      processor: null,
      ram: null,
      storage: null,
      statusIp: null,
      lockTypeCode: null,
      sim1Provider: null,
      sim2Provider: null,
      sim1MobleNo: null,
      sim2MobleNo: null,
      isActive: '3',
      createdBy: null,
      createdDate: null,
      modifiedBy: null,
      modifiedDate: null,
      isTracking: null,
      trackingIntervalMin: null,
    };
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.ResultOject = this.WithoutFilterObj;
    if (this.bindObj.deviceName !== null && this.bindObj.deviceName !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.deviceName.toLowerCase().indexOf(this.bindObj.deviceName.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.deviceId !== null && this.bindObj.deviceId.toString() !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.deviceId.toString().toLowerCase().indexOf(this.bindObj.deviceId.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.isActive !== null && this.bindObj.isActive.toString() !== '-1') {
      if (this.bindObj.isActive.toString() === '3') {
        this.ResultOject = this.ResultOject.filter(SubResultProd =>
          SubResultProd.isActive.toString() === 'Active'
          || SubResultProd.isActive.toString() === 'Inactive');
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
    alasql('SELECT deviceId,imei1,imei2,deviceName,model,osVersion,appVersion,' +
      'isActive INTO XLSX("DeviceList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
