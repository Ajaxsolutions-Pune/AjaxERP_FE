import { Injectable } from '@angular/core';
import { environment } from '../../Module/environment';
import { UserDeviceMappingEntity, UserDeviceMapping } from '../../Module/ProcessSetup/UserDeviceMapping.model';
@Injectable()
export class UserDeviceMappingTransfarmer {
    str: string;
    OjectEntity: UserDeviceMappingEntity;
    Oject: UserDeviceMapping;
    arrOject: UserDeviceMapping[] = [];
    arrOjectEntity: UserDeviceMappingEntity[] = [];
    env = environment;
    constructor() {
        this.str = this.env.apiServiceIPPort;
    }
    
    UserDeviceMappingTransfarmers(Entity: UserDeviceMappingEntity[]): UserDeviceMapping[] {
        this.arrOject = [];
        Entity.forEach(element => {
            this.Oject = new UserDeviceMapping();
            this.Oject.adId = element.adId;
            this.Oject.deviceId = element.deviceId;           
            this.Oject.loginId = element.loginId;
            this.Oject.userNameENG = element.userNameENG;
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

    ObjectToEntityUserDeviceMappingTransfarmers(Entity: UserDeviceMapping[]): UserDeviceMappingEntity[] {
        this.arrOjectEntity = [];
        Entity.forEach(element => {
            this.Oject = new UserDeviceMappingEntity();
            this.Oject.adId = element.adId;    
            this.Oject.ouCode = 12;      
            this.Oject.deviceId = element.deviceId;           
            this.Oject.loginId = element.loginId;
            this.Oject.userNameENG = element.userNameENG;            
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

    UserDeviceMappingTransfarmerEntity(Entity: UserDeviceMappingEntity): UserDeviceMapping {
        this.Oject = new UserDeviceMapping();        
        this.Oject.adId = Entity.adId;
        this.Oject.deviceId = Entity.deviceId;           
        this.Oject.loginId = Entity.loginId;
        this.Oject.userNameENG = Entity.userNameENG;               
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

    UserDeviceMappingTransfarmer(element: UserDeviceMapping): UserDeviceMappingEntity {
        this.OjectEntity = new UserDeviceMappingEntity();
        this.Oject.adId = element.adId;
        this.Oject.deviceId = element.deviceId;           
        this.Oject.loginId = element.loginId;
        this.Oject.userNameENG = element.userNameENG;       
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
