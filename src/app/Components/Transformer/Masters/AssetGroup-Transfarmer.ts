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
        if (Entity.isActive === '1') {
            this.Oject.isActive = 'true'.toString().trim();
        } else { this.Oject.isActive = ''.toString().trim(); }

        return this.Oject;
    }

    AssetGroupTransfarmer(qaType1: AssetGroup): AssetGroupEntity {
        this.OjectEntity = new AssetGroupEntity();
        this.OjectEntity.assetGroupCode = qaType1.assetGroupCode;
        this.OjectEntity.assetGroupNameENG = qaType1.assetGroupNameENG;
        this.OjectEntity.assetGroupNameUNI = qaType1.assetGroupNameUNI;
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
