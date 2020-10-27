import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { AccessEntity, Access } from '../../Module/Masters/Access.model';
import { UserGroup, UserGroupEntity } from '../../Module/Masters/UserGroup.model';

@Injectable()
export class UserGroupTransfarmer {
    str: string;
    userGroupEntity: UserGroupEntity;
    userGroup: UserGroup;
    userGroups: UserGroup[];
    env = environment;
    constructor(private httpClient: HttpClient) {
    }
    AccessTransfarmers(Entity: UserGroupEntity[]): UserGroup[] {
        this.userGroups = [];
        Entity.forEach(element => {
            this.userGroup = new UserGroup();
            this.userGroup.userGroupId = element.userGroupId;
            this.userGroup.ouCode = element.ouCode;
            this.userGroup.groupName = element.groupName;
            this.userGroup.managerId = element.managerId;
            this.userGroup.userGroupType = element.userGroupType;
            this.userGroup.sortBy = element.sortBy;
            this.userGroup.createdBy = element.createdBy;
            this.userGroup.createdDate = element.createdDate;
            this.userGroup.modifiedBy = element.modifiedBy;
            this.userGroup.modifiedDate = element.modifiedDate;
            if (element.isActive === '1') {
                this.userGroup.isActive = 'Active'.toString().trim();
            } else { this.userGroup.isActive = 'Inactive'.toString().trim(); }
            this.userGroups.push(this.userGroup);
        });
        return this.userGroups;
    }
    AccessTransfarmerEntity(Entity: UserGroupEntity): UserGroup {
        this.userGroup = new UserGroup();
        this.userGroup.userGroupId = Entity.userGroupId;
        this.userGroup.ouCode = Entity.ouCode;
        this.userGroup.groupName = Entity.groupName;
        this.userGroup.managerId = Entity.managerId;
        this.userGroup.userGroupType = Entity.userGroupType;
        this.userGroup.sortBy = Entity.sortBy;
        this.userGroup.createdBy = Entity.createdBy;
        this.userGroup.createdDate = Entity.createdDate;
        this.userGroup.modifiedBy = Entity.modifiedBy;
        this.userGroup.modifiedDate = Entity.modifiedDate;
        if (Entity.isActive === '1') {
            this.userGroup.isActive = 'true'.toString().trim();
        } else { this.userGroup.isActive = ''.toString().trim(); }
        return this.userGroup;
    }

    AccessTransfarmer(model: UserGroup): UserGroupEntity {
        this.userGroupEntity = new UserGroupEntity();
        this.userGroupEntity.userGroupId = model.userGroupId;
        this.userGroupEntity.ouCode = model.ouCode;
        this.userGroupEntity.groupName = model.groupName;
        this.userGroupEntity.managerId = model.managerId;
        this.userGroupEntity.userGroupType = model.userGroupType;
        this.userGroupEntity.createdBy = model.createdBy;
        this.userGroupEntity.createdDate = model.createdDate;
        this.userGroupEntity.modifiedBy = model.modifiedBy;
        this.userGroupEntity.modifiedDate = model.modifiedDate;
        if (model.isActive.toString().trim() === 'true') {
            this.userGroupEntity.isActive = '1';
        } else { this.userGroupEntity.isActive = '0'; }
        return this.userGroupEntity;
    }
}
