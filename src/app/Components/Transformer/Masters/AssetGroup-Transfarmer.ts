import { Injectable } from '@angular/core';
import { environment } from '../../Module/environment';
import { AssetGroupEntity, AssetGroup } from '../../Module/Masters/AssetGroup.model';

@Injectable()
export class AssetGroupTransfarmer {
    str: string;
    OjectEntity: AssetGroupEntity;
    Oject: AssetGroup;
    arrOject: AssetGroup[] = [];
    env = environment;
    constructor() {
        this.str = this.env.apiServiceIPPort;
    }
    AssetGroupTransfarmers(Entity: AssetGroupEntity[]): AssetGroup[] {
        this.arrOject = [];
        Entity.forEach(element => {
            this.Oject = new AssetGroup();
            this.Oject.assetGroupCode = element.assetGroupCode;
            this.Oject.assetGroupNameENG = element.assetGroupNameENG;
            this.Oject.assetGroupNameUNI = element.assetGroupNameUNI;
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
    AssetGroupTransfarmerEntity(Entity: AssetGroupEntity): AssetGroup {
        console.log(Entity);
        this.Oject = new AssetGroup();
        this.Oject.assetGroupCode = Entity.assetGroupCode;
        this.Oject.assetGroupNameENG = Entity.assetGroupNameENG;
        this.Oject.assetGroupNameUNI = Entity.assetGroupNameUNI;
        this.Oject.createdBy = Entity.createdBy;
        this.Oject.createdDate = Entity.createdDate;
        this.Oject.modifiedBy = Entity.modifiedBy;
        this.Oject.modifiedDate = Entity.modifiedDate;
        if (Entity.isActive === '1') {
            this.Oject.isActive = 'true'.toString().trim();
        } else { this.Oject.isActive = ''.toString().trim(); }

        return this.Oject;
    }

    AssetGroupTransfarmer(element: AssetGroup): AssetGroupEntity {
        this.OjectEntity = new AssetGroupEntity();
        this.OjectEntity.assetGroupCode = element.assetGroupCode;
        this.OjectEntity.assetGroupNameENG = element.assetGroupNameENG;
        this.OjectEntity.assetGroupNameUNI = element.assetGroupNameUNI;
        this.OjectEntity.createdBy = element.createdBy;
        this.OjectEntity.createdDate = element.createdDate;
        this.OjectEntity.modifiedBy = element.modifiedBy;
        this.OjectEntity.modifiedDate = element.modifiedDate;
         if (element.isActive === 'true') {  this.OjectEntity.isActive = '1';
             } else { this.OjectEntity.isActive = '0'; }
        if (element.isActive.toString().trim() === 'true') {
            this.OjectEntity.isActive = '1';
        } else {
            this.OjectEntity.isActive = '0';
        }
        return this.OjectEntity;
    }
}
