import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { UserGroupEntity, UserGroup } from '../../Module/Masters/UserGroup.model';


@Injectable()
export class UserGroupTransfarmer {
    str: string;
    userGroupEntity: UserGroupEntity;
    userGroup: UserGroup ;
    userGroups: UserGroup [];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    UserGroupTransfarmers(Entity: UserGroupEntity[]): UserGroup [] {
        this.userGroups = [];
        Entity.forEach(element => {
            this.userGroup = new UserGroup();
            this.userGroup.userGroupId = element.userGroupId;
            this.userGroup.ouCode = element.ouCode;
            this.userGroup.groupName = element.groupName;
            this.userGroup.managerId = element.managerId;
            this.userGroup.userGroupType = element.userGroupType;
            this.userGroup.sortBy = element.sortBy;
            this.userGroup.isActive = element.isActive;
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
    UserGroupTransfarmerEntity(Entity: UserGroupEntity): UserGroup {
        this.userGroup = new UserGroup();
        this.userGroup.userGroupId = Entity.userGroupId;
            this.userGroup.ouCode = Entity.ouCode;
            this.userGroup.groupName = Entity.groupName;
            this.userGroup.managerId = Entity.managerId;
            this.userGroup.userGroupType = Entity.userGroupType;
            this.userGroup.sortBy = Entity.sortBy;
            this.userGroup.isActive = Entity.isActive;
            this.userGroup.createdBy = Entity.createdBy;
            this.userGroup.createdDate = Entity.createdDate;
            this.userGroup.modifiedBy = Entity.modifiedBy;
            this.userGroup.modifiedDate = Entity.modifiedDate;
        if (Entity.isActive === '1') {
            this.userGroup.isActive = 'true'.toString().trim();
        } else { this.userGroup.isActive = ''.toString().trim(); }
        return this.userGroup;
    }

    UserGroupTransfarmer(UserGroup : UserGroup ):UserGroupEntity {
        this.userGroupEntity = new UserGroupEntity();
        this.userGroupEntity.userGroupId = UserGroup.userGroupId;
        this.userGroupEntity.ouCode = UserGroup.ouCode;
        this.userGroupEntity.groupName = UserGroup.groupName;
        this.userGroupEntity.managerId = UserGroup.managerId;
        this.userGroupEntity.userGroupType = UserGroup.userGroupType;
        this.userGroupEntity.sortBy = UserGroup.sortBy;
        this.userGroupEntity.isActive = UserGroup.isActive;
        this.userGroupEntity.createdBy = UserGroup.createdBy;
        this.userGroupEntity.createdDate = UserGroup.createdDate;
        this.userGroupEntity.modifiedBy = UserGroup.modifiedBy;
        this.userGroupEntity.modifiedDate = UserGroup.modifiedDate;
        if (UserGroup.isActive.toString().trim() === 'true') {
            this.userGroupEntity.isActive = '1';
        } else { this.userGroupEntity.isActive = '0'; }
        console.log(this.userGroupEntity);
        return this.userGroupEntity;
    }
}
