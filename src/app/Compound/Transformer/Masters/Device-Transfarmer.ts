import { Injectable } from '@angular/core';
import { environment } from '../../Module/environment';
import { DeviceEntity, Device } from '../../Module/Masters/Device.model';

@Injectable()
export class DeviceTransfarmer {
    str: string;
    OjectEntity: DeviceEntity;
    Oject: Device;
    arrOject: Device[] = [];
    env = environment;
    constructor() {
        this.str = this.env.apiServiceIPPort;
    }
    DeviceTransfarmers(Entity: DeviceEntity[]): Device[] {
        this.arrOject = [];
        Entity.forEach(element => {
            this.Oject = new Device();
            this.Oject.deviceId = element.deviceId;
            this.Oject.imei1 = element.imei1;
            this.Oject.imei2 = element.imei2;
            this.Oject.deviceName = element.deviceName;
            this.Oject.model = element.model;
            this.Oject.osVersion = element.osVersion;
            this.Oject.appVersion = element.appVersion;
            this.Oject.uiVersion = element.uiVersion;
            this.Oject.processor = element.processor;
            this.Oject.ram = element.ram;
            this.Oject.storage = element.storage;
            this.Oject.statusIp = element.statusIp;
            this.Oject.lockTypeCode = element.lockTypeCode;
            this.Oject.sim1Provider = element.sim1Provider;
            this.Oject.sim2Provider = element.sim2Provider;
            this.Oject.sim1MobleNo = element.sim1MobleNo;
            this.Oject.sim2MobleNo = element.sim2MobleNo;
            this.Oject.isActive = element.isActive;
            this.arrOject.push(this.Oject);
        });
        return this.arrOject;
    }
    DeviceTransfarmerEntity(element: DeviceEntity): Device {
        console.log(element);
        this.Oject = new Device();
        this.Oject.deviceId = element.deviceId;
        this.Oject.imei1 = element.imei1;
        this.Oject.imei2 = element.imei2;
        this.Oject.deviceName = element.deviceName;
        this.Oject.model = element.model;
        this.Oject.osVersion = element.osVersion;
        this.Oject.appVersion = element.appVersion;
        this.Oject.uiVersion = element.uiVersion;
        this.Oject.processor = element.processor;
        this.Oject.ram = element.ram;
        this.Oject.storage = element.storage;
        this.Oject.statusIp = element.statusIp;
        this.Oject.lockTypeCode = element.lockTypeCode;
        this.Oject.sim1Provider = element.sim1Provider;
        this.Oject.sim2Provider = element.sim2Provider;
        this.Oject.sim1MobleNo = element.sim1MobleNo;
        this.Oject.sim2MobleNo = element.sim2MobleNo;
        this.Oject.isActive = element.isActive;
        if (element.isActive === '1') {
            this.Oject.isActive = 'true'.toString().trim();
        } else { this.Oject.isActive = ''.toString().trim(); }
        return this.Oject;
    }

    DeviceTransfarmer(element: Device): DeviceEntity {
        this.OjectEntity = new DeviceEntity();
        this.OjectEntity.deviceId = element.deviceId;
        this.OjectEntity.imei1 = element.imei1;
        this.OjectEntity.imei2 = element.imei2;
        this.OjectEntity.deviceName = element.deviceName;
        this.OjectEntity.model = element.model;
        this.OjectEntity.osVersion = element.osVersion;
        this.OjectEntity.appVersion = element.appVersion;
        this.OjectEntity.uiVersion = element.uiVersion;
        this.OjectEntity.processor = element.processor;
        this.OjectEntity.ram = element.ram;
        this.OjectEntity.storage = element.storage;
        this.OjectEntity.statusIp = element.statusIp;
        this.OjectEntity.lockTypeCode = element.lockTypeCode;
        this.OjectEntity.sim1Provider = element.sim1Provider;
        this.OjectEntity.sim2Provider = element.sim2Provider;
        this.OjectEntity.sim1MobleNo = element.sim1MobleNo;
        this.OjectEntity.sim2MobleNo = element.sim2MobleNo;
        this.OjectEntity.isActive = element.isActive;
         if (element.isActive === 'true') {  this.OjectEntity.isActive = '1';
             } else { this.OjectEntity.isActive = '0'; }
        if (element.isActive.toString().trim() === 'true') {
            this.OjectEntity.isActive = '1';
        } else {
            this.OjectEntity.isActive = '0';
        }
        console.log('OjectEntity');
        console.log(this.OjectEntity);
        return this.OjectEntity;
    }
}
