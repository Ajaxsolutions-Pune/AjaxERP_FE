import { Injectable } from '@angular/core';
import { environment } from '../../Module/environment';
import { UserGroupMappingEntity, UserGroupMapping } from '../../Module/ProcessSetup/UserGroupMapping.model';
@Injectable()
export class UserGroupMappingTransfarmer {
    str: string;
    OjectEntity: UserGroupMappingEntity;
    Oject: UserGroupMapping;
    arrOject: UserGroupMapping[] = [];
    arrOjectEntity: UserGroupMappingEntity[] = [];
    env = environment;
    constructor() {
        this.str = this.env.apiServiceIPPort;
    }
    
    UserGroupMappingTransfarmers(Entity: UserGroupMappingEntity[]): UserGroupMapping[] {
        this.arrOject = [];
        Entity.forEach(element => {
            this.Oject = new UserGroupMapping();
            this.Oject.ugmId = element.ugmId;
            this.Oject.ouCode = element.ouCode;           
            this.Oject.userGroupId = element.userGroupId;
            this.Oject.isActiveText = element.isActiveDesc;
            this.Oject.loginId = element.loginId;
            this.Oject.sortBy = element.sortBy;               
            if (element.isActive === '1') {
                this.Oject.isActive = 'true'.toString().trim();
            } else { this.Oject.isActive = ''.toString().trim(); }
            this.arrOject.push(this.Oject);
        });
        return this.arrOject;
    }

    ObjectToEntityUserGroupMappingTransfarmers(Entity: UserGroupMapping[]): UserGroupMappingEntity[] {
        this.arrOjectEntity = [];
        Entity.forEach(element => {
            this.OjectEntity = new UserGroupMappingEntity();            
            this.OjectEntity.ugmId = element.ugmId;
            this.OjectEntity.ouCode = element.ouCode;           
            this.OjectEntity.userGroupId = element.userGroupId;
            this.OjectEntity.loginId = element.loginId;
            this.OjectEntity.sortBy = element.sortBy;
            this.OjectEntity.createdBy = element.createdBy;
            this.OjectEntity.createdDate = element.createdDate;
            this.OjectEntity.modifiedBy = element.modifiedBy;
            this.OjectEntity.modifiedDate = element.modifiedDate;
            this.OjectEntity.isActiveDesc = element.isActiveText;           
            if (element.isActive.toString().trim() === 'true') {
                this.OjectEntity.isActive = '1';
            } else {
                this.OjectEntity.isActive = '0';
            }
            this.arrOjectEntity.push(this.OjectEntity);
        });
        return this.arrOjectEntity;
    }

    UserGroupMappingTransfarmerEntity(Entity: UserGroupMappingEntity): UserGroupMapping {
        this.Oject = new UserGroupMapping();            
        this.Oject.ugmId = Entity.ugmId;
        this.Oject.ouCode = Entity.ouCode;           
        this.Oject.userGroupId = Entity.userGroupId;
        this.Oject.loginId = Entity.loginId;
        this.Oject.sortBy = Entity.sortBy;
        this.Oject.isActive = Entity.isActive;
        this.Oject.createdBy = Entity.createdBy;
        this.Oject.isActiveText = Entity.isActiveDesc;
        this.Oject.createdDate = Entity.createdDate;
        this.Oject.modifiedBy = Entity.modifiedBy;
        this.Oject.modifiedDate = Entity.modifiedDate;
        if (Entity.isActive === '1') {
            this.Oject.isActive = 'true'.toString().trim();
        } else { this.Oject.isActive = ''.toString().trim(); }
        return this.Oject;
    }

    UserGroupMappingTransfarmer(element: UserGroupMapping): UserGroupMappingEntity {
        this.OjectEntity = new UserGroupMappingEntity();
        this.OjectEntity.ugmId = element.ugmId;
        this.OjectEntity.ouCode = element.ouCode;           
        this.OjectEntity.userGroupId = element.userGroupId;
        this.OjectEntity.loginId = element.loginId;
        this.OjectEntity.sortBy = element.sortBy;      
        this.OjectEntity.createdBy = element.createdBy;
        this.OjectEntity.createdDate = element.createdDate;
        this.OjectEntity.modifiedBy = element.modifiedBy;
        this.OjectEntity.isActiveDesc = element.isActiveText;
        this.OjectEntity.modifiedDate = element.modifiedDate;
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
