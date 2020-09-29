import { Injectable } from '@angular/core';
import { environment } from '../../Module/environment';
import { DeviceAssetMappingEntity, DeviceAssetMapping } from '../../Module/ProcessSetup/DeviceAssetMapping.model';
@Injectable()
export class DeviceAssetMappingTransfarmer {
    str: string;
    OjectEntity: DeviceAssetMappingEntity;
    Oject: DeviceAssetMapping;
    arrOject: DeviceAssetMapping[] = [];
    arrOjectEntity: DeviceAssetMappingEntity[] = [];
    env = environment;
    constructor() {
        this.str = this.env.apiServiceIPPort;
    }
    
    DeviceAssetMappingTransfarmers(Entity: DeviceAssetMappingEntity[]): DeviceAssetMapping[] {
        this.arrOject = [];
        Entity.forEach(element => {
            this.Oject = new DeviceAssetMapping();
            this.Oject.daId = element.daId;
            this.Oject.deviceId = element.deviceId;           
            this.Oject.assetCode = element.assetCode;
            this.Oject.assetCodeText = element.assetCodeText;
            this.Oject.sortBy = '0'; 
                   
            if (element.isActive === '1') 
            {
                this.Oject.isActiveText = 'Active';   
                this.Oject.isActive = 'true'.toString().trim();
            } else 
            { 
                this.Oject.isActiveText = 'Inactive'  
                this.Oject.isActive = ''.toString().trim(); 
            }
            this.arrOject.push(this.Oject);
        });
        return this.arrOject;
    }

    ObjectToEntityDeviceAssetMappingTransfarmers(Entity: DeviceAssetMapping[]): DeviceAssetMappingEntity[] {
        this.arrOjectEntity = [];
        Entity.forEach(element => {
            this.Oject = new DeviceAssetMappingEntity();
            this.Oject.daId = element.daId;    
            this.Oject.ouCode = 12;      
            this.Oject.deviceId = element.deviceId;           
            this.Oject.assetCode = element.assetCode;
            this.Oject.assetCodeText = element.assetCodeText;            
            this.Oject.sortBy = '0';       
            this.Oject.createdBy = element.createdBy;
            this.Oject.createdDate = element.createdDate;
            this.Oject.modifiedBy = element.modifiedBy;
            this.Oject.modifiedDate = element.modifiedDate;           
            if (element.isActive.toString().trim() === 'true') 
            {
                this.Oject.isActiveText = 'Active';   
                this.Oject.isActive = '1';
            } else
            {
                this.Oject.isActiveText = 'Inactive';
                this.Oject.isActive = '0';
            }
            this.arrOjectEntity.push(this.Oject);
        });
        return this.arrOjectEntity;
    }

    DeviceAssetMappingTransfarmerEntity(Entity: DeviceAssetMappingEntity): DeviceAssetMapping {
        this.Oject = new DeviceAssetMapping();        
        this.Oject.daId = Entity.daId;
        this.Oject.deviceId = Entity.deviceId;           
        this.Oject.assetCode = Entity.assetCode;
        this.Oject.assetCodeText = Entity.assetCodeText;               
        this.Oject.sortBy = Entity.sortBy;         
        this.Oject.isActive = Entity.isActive;
        this.Oject.createdBy = Entity.createdBy;
        this.Oject.createdDate = Entity.createdDate;
        this.Oject.modifiedBy = Entity.modifiedBy;
        this.Oject.modifiedDate = Entity.modifiedDate;
        if (Entity.isActive === '1') 
        {
            this.Oject.isActiveText ='Active';
            this.Oject.isActive = 'true'.toString().trim();
        } else 
        { 
            this.Oject.isActiveText = 'Inactive'
            this.Oject.isActive = ''.toString().trim(); 
        }
        return this.Oject;
    }

    UserDeviceAssetMappingTransfarmer(element: DeviceAssetMapping): DeviceAssetMappingEntity {
        this.OjectEntity = new DeviceAssetMappingEntity();
        this.Oject.daId = element.daId;
        this.Oject.deviceId = element.deviceId;           
        this.Oject.assetCode = element.assetCode;
        this.Oject.assetCodeText = element.assetCodeText;       
        this.Oject.sortBy = element.sortBy;               
        this.OjectEntity.createdBy = element.createdBy;
        this.OjectEntity.createdDate = element.createdDate;
        this.OjectEntity.modifiedBy = element.modifiedBy;
        this.OjectEntity.modifiedDate = element.modifiedDate;
        if (element.isActive === 'true')
        {
            this.OjectEntity.isActiveText = 'Active';
            this.OjectEntity.isActive = '1';
        } else 
        { 
            this.OjectEntity.isActiveText = 'Inactive';
            this.OjectEntity.isActive = '0'; 
        }
        if (element.isActive.toString().trim() === 'true') {
            this.OjectEntity.isActive = '1';
        } else {
            this.OjectEntity.isActive = '0';
        }
        return this.OjectEntity;
    }
}
