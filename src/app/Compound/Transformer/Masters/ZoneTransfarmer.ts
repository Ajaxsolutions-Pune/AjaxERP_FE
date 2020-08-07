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
        Entity.forEach(element => {
            this.Oject = new Zone();
            this.Oject.zoneCode = element.zoneCode;
            this.Oject.zoneNameENG = element.zoneNameENG;
            this.Oject.zoneNameUNI = element.zoneNameUNI;
            this.Oject.isActive = element.isActive;
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
        if (Entity.isActive === '1') {
            this.Oject.isActive = 'true'.toString().trim();
        } else { this.Oject.isActive = ''.toString().trim(); }

        return this.Oject;
    }

    ZoneTransfarmer(qaType1: Zone): ZoneEntity {
        this.OjectEntity = new ZoneEntity();
        this.OjectEntity.zoneCode = qaType1.zoneCode;
        this.OjectEntity.zoneNameENG = qaType1.zoneNameENG;
        this.OjectEntity.zoneNameUNI = qaType1.zoneNameUNI;
         if (qaType1.isActive === 'true') {  this.OjectEntity.isActive = '1';
             } else { this.OjectEntity.isActive = '0'; }
        if (qaType1.isActive.toString().trim() === 'true') {
            this.OjectEntity.isActive = '1';
        } else {
            this.OjectEntity.isActive = '0';
        }
        return this.OjectEntity;
    }
}
