import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Device, DeviceEntity } from '../../../Compound/Module/Masters/Device.model';

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
  constructor(private _router: Router) {
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
      isActive: null
    };
  }

  resultChanged(): void {
  }

  ExportToExcel(): void {
    alasql('SELECT assetGroupCode,assetGroupNameENG,assetGroupNameUNI,' +
      'isActive INTO XLSX("AssetGroupList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
