import { Injectable } from '@angular/core';
import { environment } from '../../Module/environment';
import { AssetCategoryEntity, AssetCategory } from '../../Module/Masters/AssetCategory.model';

@Injectable()
export class AssetCategoryTransfarmer {
    str: string;
    OjectEntity: AssetCategoryEntity;
    Oject: AssetCategory;
    arrOject: AssetCategory[] = [];
    env = environment;
    constructor() {
        this.str = this.env.apiServiceIPPort;
    }
    AssetCategoryTransfarmers(Entity: AssetCategoryEntity[]): AssetCategory[] {
        this.arrOject = [];
        Entity.forEach(element => {
            this.Oject = new AssetCategory();
            this.Oject.assetCategoryCode = element.assetCategoryCode;
            this.Oject.assetCategoryNameENG = element.assetCategoryNameENG;
            this.Oject.assetCategoryNameUNI = element.assetCategoryNameUNI;
            this.Oject.assetGroupCode = element.assetGroupCode;
            this.Oject.createdBy = element.createdBy;
            this.Oject.createdDate = element.createdDate;
            this.Oject.modifiedBy = element.modifiedBy;
            this.Oject.modifiedDate = element.modifiedDate;
            this.Oject.colourCode = element.colourCode;
            this.Oject.assetGroupText = element.assetGroupNameENG;
            this.Oject.colourText = element.colourNameENG;
            if (element.isActive === '1') {
                this.Oject.isActive = 'Active'.toString().trim();
            } else { this.Oject.isActive = 'Inactive'.toString().trim(); }
            this.arrOject.push(this.Oject);
        });
        return this.arrOject;
    }
    AssetCategoryTransfarmerEntity(element: AssetCategoryEntity): AssetCategory {
        this.Oject = new AssetCategory();
        this.Oject.assetCategoryCode = element.assetCategoryCode;
        this.Oject.assetCategoryNameENG = element.assetCategoryNameENG;
        this.Oject.assetCategoryNameUNI = element.assetCategoryNameUNI;
        this.Oject.assetGroupCode = element.assetGroupCode;
        this.Oject.createdBy = element.createdBy;
        this.Oject.createdDate = element.createdDate;
        this.Oject.modifiedBy = element.modifiedBy;
        this.Oject.modifiedDate = element.modifiedDate;
        this.Oject.colourCode = element.colourCode;
        this.Oject.assetGroupText = element.assetGroupNameENG;
        this.Oject.colourText = element.colourCode;
        if (element.isActive === '1') {
            this.Oject.isActive = 'true'.toString().trim();
        } else { this.Oject.isActive = ''.toString().trim(); }
        return this.Oject;
    }

    AssetCategoryTransfarmer(element: AssetCategory): AssetCategoryEntity {
        this.OjectEntity = new AssetCategoryEntity();
        this.OjectEntity.assetCategoryCode = element.assetCategoryCode;
        this.OjectEntity.assetCategoryNameENG = element.assetCategoryNameENG;
        this.OjectEntity.assetCategoryNameUNI = element.assetCategoryNameUNI;
        this.OjectEntity.assetGroupCode = element.assetGroupCode;
        this.OjectEntity.createdBy = element.createdBy;
        this.OjectEntity.createdDate = element.createdDate;
        this.OjectEntity.modifiedBy = element.modifiedBy;
        this.OjectEntity.modifiedDate = element.modifiedDate;
        this.OjectEntity.colourCode = element.colourCode;
        this.OjectEntity.assetGroupNameENG = element.assetGroupText;
        this.OjectEntity.colourCode = element.colourText;

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
