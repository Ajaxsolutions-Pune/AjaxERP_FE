import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Device } from '../../../Compound/Module/Masters/Device.model';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {
  @Input() DeviceInput:  Device;
  bindObj:  Device;
  constructor(private _router: Router) {
  }

  ngOnInit() {
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
}
