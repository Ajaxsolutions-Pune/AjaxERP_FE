import { Injectable } from '@angular/core';
import { environment } from '../../Module/environment';
import { RegionEntity, Region } from '../../Module/Masters/Region.model';

@Injectable()
export class RegionTransfarmer {
    str: string;
    OjectEntity: RegionEntity;
    Oject: Region;
    arrOject: Region[] = [];
    env = environment;
    constructor() {
        this.str = this.env.apiServiceIPPort;
    }
    RegionTransfarmers(Entity: RegionEntity[]): Region[] {
        this.arrOject = [];
        Entity.forEach(element => {
            this.Oject = new Region();
            this.Oject.regionCode = element.regionCode;
            this.Oject.regionNameENG = element.regionNameENG;
            this.Oject.regionNameUNI = element.regionNameUNI;
            this.Oject.isActive = element.isActive;
            this.arrOject.push(this.Oject);
        });
        return this.arrOject;
    }
    RegionTransfarmerEntity(Entity: RegionEntity): Region {
        console.log(Entity);
        this.Oject = new Region();
        this.Oject.regionCode = Entity.regionCode;
        this.Oject.regionNameENG = Entity.regionNameENG;
        this.Oject.regionNameUNI = Entity.regionNameUNI;
        if (Entity.isActive === '1') {
            this.Oject.isActive = 'true'.toString().trim();
        } else { this.Oject.isActive = ''.toString().trim(); }

        return this.Oject;
    }

    RegionTransfarmer(qaType1: Region): RegionEntity {
        this.OjectEntity = new RegionEntity();
        this.OjectEntity.regionCode = qaType1.regionCode;
        this.OjectEntity.regionNameENG = qaType1.regionNameENG;
        this.OjectEntity.regionNameUNI = qaType1.regionNameUNI;
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
