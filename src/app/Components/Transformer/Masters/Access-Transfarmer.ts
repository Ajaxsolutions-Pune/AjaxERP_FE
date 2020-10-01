import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { AccessEntity, Access } from '../../Module/Masters/Access.model';

@Injectable()
export class AccessTransfarmer {
    str: string;
    accessEntity: AccessEntity;
    access: Access;
    accesss: Access[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    AccessTransfarmers(Entity: AccessEntity[]): Access[] {
        this.accesss = [];
        Entity.forEach(element => {
            this.access = new Access();
            this.access.accessId = element.accessId;
            this.access.accessName = element.accessName;
            this.access.createdBy = element.createdBy;
            this.access.createdDate = element.createdDate;
            this.access.modifiedBy = element.modifiedBy;
            this.access.modifiedDate = element.modifiedDate;
            if (element.isActive === '1') {
                this.access.isActive = 'Active'.toString().trim();
            } else { this.access.isActive = 'Inactive'.toString().trim(); }
            this.accesss.push(this.access);
        });
        return this.accesss;
    }
    AccessTransfarmerEntity(Entity: AccessEntity): Access {
        this.access = new Access();
        this.access.accessId = Entity.accessId;
        this.access.accessName = Entity.accessName;
        this.access.createdBy = Entity.createdBy;
        this.access.createdDate = Entity.createdDate;
        this.access.modifiedBy = Entity.modifiedBy;
        this.access.modifiedDate = Entity.modifiedDate;
        if (Entity.isActive === '1') {
            this.access.isActive = 'true'.toString().trim();
        } else { this.access.isActive = ''.toString().trim(); }
        return this.access;
    }

    AccessTransfarmer(Access: Access): AccessEntity {
        this.accessEntity = new AccessEntity();
        this.accessEntity.accessId = Access.accessId;
        this.accessEntity.accessName = Access.accessName;
        this.accessEntity.createdBy = Access.createdBy;
        this.accessEntity.createdDate = Access.createdDate;
        this.accessEntity.modifiedBy = Access.modifiedBy;
        this.accessEntity.modifiedDate = Access.modifiedDate;
        if (Access.isActive.toString().trim() === 'true') {
            this.accessEntity.isActive = '1';
        } else { this.accessEntity.isActive = '0'; }
        return this.accessEntity;
    }
}
