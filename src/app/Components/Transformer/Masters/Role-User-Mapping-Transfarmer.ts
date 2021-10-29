import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { RoleUserMapping, RoleUserMappingEntity } from '../../Module/Masters/RoleUserMapping.model';

@Injectable()
export class RoleUserMappingTransfarmer {
    str: string;
    roleusermappingEntity: RoleUserMappingEntity;
    roleusermapping: RoleUserMapping;
    roleusermappings: RoleUserMapping[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    RoleUserMappingTransfarmers(Entity: RoleUserMappingEntity[]): RoleUserMapping[] {
        this.roleusermappings = [];
        Entity.forEach(element => {
            this.roleusermapping = new RoleUserMapping();
            this.roleusermapping.roleLoginTrnId = element.roleLoginTrnId;
            this.roleusermapping.roleId = element.roleId;
            this.roleusermapping.loginId = element.loginId;
            this.roleusermapping.roleBelongsTo = element.roleBelongsTo;
            this.roleusermapping.effectiveFromDate = element.effectiveFromDate;
            this.roleusermapping.effectiveToDate = element.effectiveToDate;
            this.roleusermapping.createdBy = element.createdBy;
            this.roleusermapping.createdDate = element.createdDate;
            this.roleusermapping.modifiedBy = element.modifiedBy;
            this.roleusermapping.modifiedDate = element.modifiedDate;
            if (element.isActive === '1') {
                this.roleusermapping.isActive = 'Active'.toString().trim();
            } else { this.roleusermapping.isActive = 'Inactive'.toString().trim(); }
            this.roleusermappings.push(this.roleusermapping);
        });
        return this.roleusermappings;
    }
    RoleUserMappingTransfarmerEntity(Entity: RoleUserMappingEntity): RoleUserMapping {
        this.roleusermapping = new RoleUserMapping();
        this.roleusermapping.roleLoginTrnId = Entity.roleLoginTrnId;
            this.roleusermapping.roleId = Entity.roleId;
            this.roleusermapping.loginId = Entity.loginId;
            this.roleusermapping.roleBelongsTo = Entity.roleBelongsTo;
            this.roleusermapping.effectiveFromDate = Entity.effectiveFromDate;
            this.roleusermapping.effectiveToDate = Entity.effectiveToDate;
            this.roleusermapping.createdBy = Entity.createdBy;
            this.roleusermapping.createdDate = Entity.createdDate;
            this.roleusermapping.modifiedBy = Entity.modifiedBy;
            this.roleusermapping.modifiedDate = Entity.modifiedDate;
        if (Entity.isActive === '1') {
            this.roleusermapping.isActive = 'true'.toString().trim();
        } else { this.roleusermapping.isActive = ''.toString().trim(); }
        return this.roleusermapping;
    }

    RoleUserMappingTransfarmer(RoleUserMapping1: RoleUserMapping): RoleUserMappingEntity {
        this.roleusermappingEntity = new RoleUserMappingEntity();
        this.roleusermappingEntity.roleLoginTrnId = RoleUserMapping1.roleLoginTrnId;
            this.roleusermappingEntity.roleId = RoleUserMapping1.roleId;
            this.roleusermappingEntity.loginId = RoleUserMapping1.loginId;
            this.roleusermappingEntity.roleBelongsTo = RoleUserMapping1.roleBelongsTo;
            this.roleusermappingEntity.effectiveFromDate = RoleUserMapping1.effectiveFromDate;
            this.roleusermappingEntity.effectiveToDate = RoleUserMapping1.effectiveToDate;
            this.roleusermappingEntity.createdBy = RoleUserMapping1.createdBy;
            this.roleusermappingEntity.createdDate = RoleUserMapping1.createdDate;
            this.roleusermappingEntity.modifiedBy = RoleUserMapping1.modifiedBy;
            this.roleusermappingEntity.modifiedDate = RoleUserMapping1.modifiedDate;
        if (RoleUserMapping1.isActive.toString().trim() === 'true') {
            this.roleusermappingEntity.isActive = '1';
        } else { this.roleusermappingEntity.isActive = '0'; }
        return this.roleusermappingEntity;
    }
}
