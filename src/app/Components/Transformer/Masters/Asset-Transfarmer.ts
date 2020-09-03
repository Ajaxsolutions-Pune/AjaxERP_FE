import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { AssetEntity, Asset } from '../../Module/Masters/Asset.model';

@Injectable()
export class AssetTransfarmer {
    str: string;
    OjectEntity: AssetEntity;
    Oject: Asset;
    arrOject: Asset[] = [];
    env = environment;
    constructor() {
        this.str = this.env.apiServiceIPPort;
    }
    AssetTransfarmers(Entity: AssetEntity[]): Asset[] {
        this.arrOject = [];
        Entity.forEach(element => {
            this.Oject = new Asset();
            this.Oject.ouCode = element.ouCode;
            this.Oject.assetCode = element.assetCode;
            this.Oject.assetNameENG = element.assetNameENG;
            this.Oject.assetNameUNI = element.assetNameUNI;
            this.Oject.placeName = element.placeName;
            this.Oject.assetGroupCode = element.assetGroupCode;
            this.Oject.assetCategoryCode = element.assetCategoryCode;
            this.Oject.customerCode = element.customerCode;
            this.Oject.projectCode = element.projectCode;
            this.Oject.zoneCode = element.zoneCode;
            this.Oject.circleCode = element.circleCode;
            this.Oject.clusterCode = element.clusterCode;
            this.Oject.countryCode = element.countryCode;
            this.Oject.stateCode = element.stateCode;
            this.Oject.latitude = element.latitude;
            this.Oject.longitude = element.longitude;
            this.Oject.redius = element.redius;
            this.Oject.pinCode = element.pinCode;
            this.Oject.regionCode = element.regionCode;
            this.Oject.address = element.address;
            this.Oject.colourCode = element.colourCode;
            this.Oject.geofenceCode = element.geofenceCode;
            this.Oject.sharedCode = element.sharedCode;
            this.Oject.circuitCode = element.circuitCode;
            this.Oject.conductorCode = element.conductorCode;
            this.Oject.classificationCode = element.classificationCode;
            this.Oject.structureCode = element.structureCode;
            this.Oject.positionCode = element.positionCode;

            this.Oject.deviceId = element.deviceId;
            this.Oject.sortBy = element.sortBy;
            this.Oject.source = element.source;

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
    AssetTransfarmerEntity(element: AssetEntity): Asset {
        console.log(element);
        this.Oject = new Asset();
        this.Oject = new Asset();
        this.Oject.ouCode = element.ouCode;
        this.Oject.assetCode = element.assetCode;
        this.Oject.assetNameENG = element.assetNameENG;
        this.Oject.assetNameUNI = element.assetNameUNI;
        this.Oject.placeName = element.placeName;
        this.Oject.assetGroupCode = element.assetGroupCode;
        this.Oject.assetCategoryCode = element.assetCategoryCode;
        this.Oject.customerCode = element.customerCode;
        this.Oject.projectCode = element.projectCode;
        this.Oject.zoneCode = element.zoneCode;
        this.Oject.circleCode = element.circleCode;
        this.Oject.clusterCode = element.clusterCode;
        this.Oject.countryCode = element.countryCode;
        this.Oject.stateCode = element.stateCode;
        this.Oject.latitude = element.latitude;
        this.Oject.longitude = element.longitude;
        this.Oject.redius = element.redius;
        this.Oject.pinCode = element.pinCode;
        this.Oject.regionCode = element.regionCode;
        this.Oject.address = element.address;
        this.Oject.colourCode = element.colourCode;
        this.Oject.geofenceCode = element.geofenceCode;
        this.Oject.sharedCode = element.sharedCode;
        this.Oject.circuitCode = element.circuitCode;
        this.Oject.conductorCode = element.conductorCode;
        this.Oject.classificationCode = element.classificationCode;
        this.Oject.structureCode = element.structureCode;
        this.Oject.positionCode = element.positionCode;
        this.Oject.isActive = element.isActive;

        this.Oject.createdBy = element.createdBy;
        this.Oject.createdDate = element.createdDate;
        this.Oject.modifiedBy = element.modifiedBy;
        this.Oject.modifiedDate = element.modifiedDate;

        this.Oject.deviceId = element.deviceId;
        this.Oject.sortBy = element.sortBy;
        this.Oject.source = element.source;

        if (element.isActive === '1') {
            this.Oject.isActive = 'true'.toString().trim();
        } else { this.Oject.isActive = ''.toString().trim(); }

        return this.Oject;
    }

    AssetTransfarmer(element: Asset): AssetEntity {
        this.OjectEntity = new AssetEntity();
        this.OjectEntity.ouCode = element.ouCode;
        this.OjectEntity.assetCode = element.assetCode;
        this.OjectEntity.assetNameENG = element.assetNameENG;
        this.OjectEntity.assetNameUNI = element.assetNameUNI;
        this.OjectEntity.placeName = element.placeName;
        this.OjectEntity.assetGroupCode = element.assetGroupCode;
        this.OjectEntity.assetCategoryCode = element.assetCategoryCode;
        this.OjectEntity.customerCode = element.customerCode;
        this.OjectEntity.projectCode = element.projectCode;
        this.OjectEntity.zoneCode = element.zoneCode;
        this.OjectEntity.circleCode = element.circleCode;
        this.OjectEntity.clusterCode = element.clusterCode;
        this.OjectEntity.countryCode = element.countryCode;
        this.OjectEntity.stateCode = element.stateCode;
        this.OjectEntity.latitude = element.latitude;
        this.OjectEntity.longitude = element.longitude;
        this.OjectEntity.redius = element.redius;
        this.OjectEntity.pinCode = element.pinCode;
        this.OjectEntity.regionCode = element.regionCode;
        this.OjectEntity.address = element.address;
        this.OjectEntity.colourCode = element.colourCode;
        this.OjectEntity.geofenceCode = element.geofenceCode;
        this.OjectEntity.sharedCode = element.sharedCode;
        this.OjectEntity.circuitCode = element.circuitCode;
        this.OjectEntity.conductorCode = element.conductorCode;
        this.OjectEntity.classificationCode = element.classificationCode;
        this.OjectEntity.structureCode = element.structureCode;
        this.OjectEntity.positionCode = element.positionCode;

        this.OjectEntity.createdBy = element.createdBy;
        this.OjectEntity.createdDate = element.createdDate;
        this.OjectEntity.modifiedBy = element.modifiedBy;
        this.OjectEntity.modifiedDate = element.modifiedDate;


        this.OjectEntity.deviceId = element.deviceId;
        this.OjectEntity.sortBy = element.sortBy;
        this.OjectEntity.source = element.source;

        if (element.isActive === 'true') {
            this.OjectEntity.isActive = '1';
        } else { this.OjectEntity.isActive = '0'; }
        return this.OjectEntity;
    }
}
