import { Injectable } from '@angular/core';
import { environment } from '../../Module/environment';
import { DeviceAssetMappingEntity, DeviceAssetMapping } from '../../Module/ProcessSetup/DeviceAssetMapping.model';
@Injectable()
export class  DeviceAssetMappingTransfarmer {
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

            this.Oject.daId = 0;
            this.Oject.ouCode = 12;  
            this.Oject.deviceId = element.deviceId;            
            this.Oject.assetCode = element.assetCode;  
            this.Oject.assetName = element.assetName;
            this.Oject.sortBy =  element.sortBy;                                    
            if (element.isActive === '1') 
            {
                //this.Oject.isActiveText = 'Active';   
                this.Oject.isActive = 'true'.toString().trim();
            } else 
            { 
                //this.Oject.isActiveText = 'Inactive'  
                this.Oject.isActive = ''.toString().trim(); 
            }
            this.Oject.assigned = element.assigned;                    
            this.Oject.createdBy = element.createdBy;
            this.Oject.createdDate = element.createdDate;
            this.Oject.modifiedBy = element.modifiedBy;
            this.Oject.modifiedDate = element.modifiedDate;    
            this.Oject.deviceName = element.deviceName;
            
            this.arrOject.push(this.Oject);
        });
        return this.arrOject;
    }

    ObjectToEntityDeviceAssetMappingTransfarmers(Entity: DeviceAssetMapping[]): DeviceAssetMappingEntity[] {
        this.arrOjectEntity = [];
        console.log(Entity);
        Entity.forEach(element => {
            this.Oject = new DeviceAssetMappingEntity();              
            this.Oject.daId = 0;
            this.Oject.ouCode = 12;  
            this.Oject.deviceId = element.deviceId;            
            this.Oject.assetCode = element.assetCode;  
            this.Oject.assetName = element.assetName;
            this.Oject.sortBy =  '0';      
                     
            if (element.isActive.toString().trim() === 'true') 
            {                
                this.Oject.isActive = '1';
            } else
            {               
                this.Oject.isActive = '0';
            }            
            this.Oject.assigned = element.assigned;                    
            this.Oject.createdBy = element.createdBy;
            this.Oject.createdDate = element.createdDate;
            this.Oject.modifiedBy = element.modifiedBy;
            this.Oject.modifiedDate = element.modifiedDate; 
            this.Oject.deviceName = element.deviceName;

            this.arrOjectEntity.push(this.Oject);
        });
        console.log(this.arrOjectEntity);
        return this.arrOjectEntity;
    }

    DeviceAssetMappingTransfarmerEntity(Entity: DeviceAssetMappingEntity): DeviceAssetMapping {
        this.Oject = new DeviceAssetMapping();        
       
        this.Oject.daId = 0;
        this.Oject.ouCode = 12;  
        this.Oject.deviceId = Entity.deviceId;            
        this.Oject.assetCode = Entity.assetCode;  
        this.Oject.assetName = Entity.assetName;
        this.Oject.sortBy =  Entity.sortBy;           
        if (Entity.isActive === '1') 
        {
            //this.Oject.isActiveText ='Active';
            this.Oject.isActive = 'true'.toString().trim();
        } else 
        { 
            //this.Oject.isActiveText = 'Inactive'
            this.Oject.isActive = ''.toString().trim(); 
        }
        this.Oject.assigned = Entity.assigned;             
        this.Oject.createdBy = Entity.createdBy;
        this.Oject.createdDate = Entity.createdDate;
        this.Oject.modifiedBy = Entity.modifiedBy;
        this.Oject.modifiedDate = Entity.modifiedDate; 
        this.Oject.deviceName = Entity.deviceName;
        return this.Oject;
    }

    UserDeviceAssetMappingTransfarmer(element: DeviceAssetMapping): DeviceAssetMappingEntity {
        this.OjectEntity = new DeviceAssetMappingEntity();
        this.Oject.daId = 0;
        this.Oject.ouCode = 12;  
        this.Oject.deviceId = element.deviceId;            
        this.Oject.assetCode = element.assetCode;  
        this.Oject.assetName = element.assetName;
        this.Oject.sortBy =  element.sortBy; 
        if (element.isActive === 'true')
        {
            //this.OjectEntity.isActiveText = 'Active';
            this.OjectEntity.isActive = '1';
        } else 
        { 
            //this.OjectEntity.isActiveText = 'Inactive';
            this.OjectEntity.isActive = '0'; 
        }
        if (element.isActive.toString().trim() === 'true') {
            this.OjectEntity.isActive = '1';
        } else {
            this.OjectEntity.isActive = '0';
        }
        this.Oject.assigned = element.assigned;             
        this.Oject.createdBy = element.createdBy;
        this.Oject.createdDate = element.createdDate;
        this.Oject.modifiedBy = element.modifiedBy;
        this.Oject.modifiedDate = element.modifiedDate; 
        this.Oject.deviceName = element.deviceName;
        return this.OjectEntity;
    }
}
