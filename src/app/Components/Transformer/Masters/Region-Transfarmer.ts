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

            this.Oject.createdBy = element.createdBy;
            this.Oject.createdDate = element.createdDate;
            this.Oject.modifiedBy = element.modifiedBy;
            this.Oject.modifiedDate = element.modifiedDate;
            this.Oject.sortBy = element.sortBy;

            if (element.isActive === '1') {
                this.Oject.isActive = 'Active'.toString().trim();
            } else { this.Oject.isActive = 'Inactive'.toString().trim(); }
            this.arrOject.push(this.Oject);
        });
        return this.arrOject;
    }
    RegionTransfarmerEntity(Entity: RegionEntity): Region {
        this.Oject = new Region();
        this.Oject.regionCode = Entity.regionCode;
        this.Oject.regionNameENG = Entity.regionNameENG;
        this.Oject.regionNameUNI = Entity.regionNameUNI;

        this.Oject.createdBy = Entity.createdBy;
        this.Oject.createdDate = Entity.createdDate;
        this.Oject.modifiedBy = Entity.modifiedBy;
        this.Oject.modifiedDate = Entity.modifiedDate;
        this.Oject.sortBy = Entity.sortBy;
        if (Entity.isActive === '1') {
            this.Oject.isActive = 'true'.toString().trim();
        } else { this.Oject.isActive = ''.toString().trim(); }

        return this.Oject;
    }

    RegionTransfarmer(element: Region): RegionEntity {
        this.OjectEntity = new RegionEntity();
        this.OjectEntity.regionCode = element.regionCode;
        this.OjectEntity.regionNameENG = element.regionNameENG;
        this.OjectEntity.regionNameUNI = element.regionNameUNI;

        this.OjectEntity.createdBy = element.createdBy;
        this.OjectEntity.createdDate = element.createdDate;
        this.OjectEntity.modifiedBy = element.modifiedBy;
        this.OjectEntity.modifiedDate = element.modifiedDate;
        this.OjectEntity.sortBy = element.sortBy;

        if (element.isActive === 'true') {
            this.OjectEntity.isActive = '1';
        } else { this.OjectEntity.isActive = '0'; }
        if (element.isActive.toString().trim() === 'true') {
            this.OjectEntity.isActive = '1';
        } else {
            this.OjectEntity.isActive = '0';
        }
        return this.OjectEntity;
    }
}
