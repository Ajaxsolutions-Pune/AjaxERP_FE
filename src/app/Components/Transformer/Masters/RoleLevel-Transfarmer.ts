import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { RoleLevelEntity, RoleLevel } from '../../Module/Masters/RoleLevel.model';

@Injectable()
export class RoleLevelTransfarmer {
    str: string;
    roleLevelEntity: RoleLevelEntity;
    roleLevel: RoleLevel;
    roleLevels: RoleLevel[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    RoleLevelTransfarmers(Entity: RoleLevelEntity[]): RoleLevel[] {
        this.roleLevels = [];
        Entity.forEach(element => {
            this.roleLevel = new RoleLevel();            
            this.roleLevel.roleLevelId = element.roleLevelId;
            this.roleLevel.roleLevelDesc = element.roleLevelDesc;
            this.roleLevel.userType = element.userType;
            this.roleLevel.rolePriority = element.rolePriority;                 
            this.roleLevel.createdBy = element.createdBy;
            this.roleLevel.createdDate = element.createdDate;
            this.roleLevel.modifiedBy = element.modifiedBy;
            this.roleLevel.modifiedDate = element.modifiedDate;
            if (element.isActive === '1') {
                this.roleLevel.isActive = 'Active'.toString().trim();
            } else { this.roleLevel.isActive = 'Inactive'.toString().trim(); }
            this.roleLevels.push(this.roleLevel);
        });
        return this.roleLevels;
    }

    RoleLevelTransfarmerEntity(Entity: RoleLevelEntity): RoleLevel {
        console.log(Entity);
        this.roleLevel = new RoleLevel();
        this.roleLevel.roleLevelId = Entity.roleLevelId;
        this.roleLevel.roleLevelDesc = Entity.roleLevelDesc;
        this.roleLevel.userType = Entity.userType;
        this.roleLevel.rolePriority = Entity.rolePriority;       
        this.roleLevel.createdBy = Entity.createdBy;
        this.roleLevel.createdDate = Entity.createdDate;
        this.roleLevel.modifiedBy = Entity.modifiedBy;
        this.roleLevel.modifiedDate = Entity.modifiedDate;
        console.log(Entity.isActive.toString().trim() === '1');
        console.log(Entity.isActive);        
         if (Entity.isActive === '1') 
        { 
             this.roleLevel.isActive = 'true'.toString().trim(); 
        } 
        else 
        { 
            this.roleLevel.isActive = ''.toString().trim(); 
        }
        console.log(this.roleLevel.isActive);
        return this.roleLevel;
    }

    RoleLevelTransfarmer(RoleLevel1: RoleLevel): RoleLevelEntity {
        this.roleLevelEntity = new RoleLevelEntity();
        this.roleLevelEntity.roleLevelId = RoleLevel1.roleLevelId;
        this.roleLevelEntity.roleLevelDesc = RoleLevel1.roleLevelDesc;
        this.roleLevelEntity.userType = RoleLevel1.userType;
        this.roleLevelEntity.rolePriority = RoleLevel1.rolePriority;              
        this.roleLevelEntity.createdBy = RoleLevel1.createdBy;
        this.roleLevelEntity.createdDate = RoleLevel1.createdDate;
        this.roleLevelEntity.modifiedBy = RoleLevel1.modifiedBy;
        this.roleLevelEntity.modifiedDate = RoleLevel1.modifiedDate;
         if (RoleLevel1.isActive.toString().trim() === 'true') 
         { this.roleLevelEntity.isActive = '1'; } 
         else 
         { this.roleLevelEntity.isActive = '0'; }
        return this.roleLevelEntity;
    }
}
