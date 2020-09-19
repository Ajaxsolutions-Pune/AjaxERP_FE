import { Injectable } from '@angular/core';
import { environment } from '../../Module/environment';
import { ZoneEntity, Zone } from '../../Module/Masters/Zone.model';

@Injectable()
export class ZoneTransfarmer {
    str: string;
    OjectEntity: ZoneEntity;
    Oject: Zone;
    arrOject: Zone[] = [];
    env = environment;
    constructor() {
        this.str = this.env.apiServiceIPPort;
    }
    ZoneTransfarmers(Entity: ZoneEntity[]): Zone[] {
        this.arrOject = [];
        console.log(Entity);
        Entity.forEach(element => {
            this.Oject = new Zone();
            this.Oject.zoneCode = element.zoneCode;
            this.Oject.zoneNameENG = element.zoneNameENG;
            this.Oject.zoneNameUNI = element.zoneNameUNI;

            this.Oject.createdBy = element.createdBy;
            this.Oject.createdDate = element.createdDate;
            this.Oject.modifiedBy = element.modifiedBy;
            this.Oject.modifiedDate = element.modifiedDate;

            if (element.isActive === '1') {
                this.Oject.isActive = 'Active'.toString().trim();
            } else { this.Oject.isActive = 'Inactive'.toString().trim(); }
            this.arrOject.push(this.Oject);
        });
        return this.arrOject;
    }
    ZoneTransfarmerEntity(Entity: ZoneEntity): Zone {
        console.log(Entity);
        this.Oject = new Zone();
        this.Oject.zoneCode = Entity.zoneCode;
        this.Oject.zoneNameENG = Entity.zoneNameENG;
        this.Oject.zoneNameUNI = Entity.zoneNameUNI;

        this.Oject.createdBy = Entity.createdBy;
        this.Oject.createdDate = Entity.createdDate;
        this.Oject.modifiedBy = Entity.modifiedBy;
        this.Oject.modifiedDate = Entity.modifiedDate;

        if (Entity.isActive === '1') {
            this.Oject.isActive = 'true'.toString().trim();
        } else { this.Oject.isActive = ''.toString().trim(); }

        return this.Oject;
    }

    ZoneTransfarmer(zone: Zone): ZoneEntity {
        this.OjectEntity = new ZoneEntity();
        this.OjectEntity.zoneCode = zone.zoneCode;
        this.OjectEntity.zoneNameENG = zone.zoneNameENG;
        this.OjectEntity.zoneNameUNI = zone.zoneNameUNI;

        this.OjectEntity.createdBy = zone.createdBy;
        this.OjectEntity.createdDate = zone.createdDate;
        this.OjectEntity.modifiedBy = zone.modifiedBy;
        this.OjectEntity.modifiedDate = zone.modifiedDate;

        if (zone.isActive === 'true') {
            this.OjectEntity.isActive = '1';
        } else { this.OjectEntity.isActive = '0'; }
        if (zone.isActive.toString().trim() === 'true') {
            this.OjectEntity.isActive = '1';
        } else {
            this.OjectEntity.isActive = '0';
        }
        return this.OjectEntity;
    }
}
