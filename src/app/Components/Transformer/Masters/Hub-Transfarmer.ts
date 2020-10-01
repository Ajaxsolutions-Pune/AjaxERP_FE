import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { HubEntity, Hub } from '../../Module/Masters/Hub.model';

@Injectable()
export class HubTransfarmer {
    str: string;
    hubEntity: HubEntity;
    hub: Hub;
    hubs: Hub[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    HubTransfarmers(Entity: HubEntity[]): Hub[] {
        this.hubs = [];
        Entity.forEach(element => {
            this.hub = new Hub();
            this.hub.ouCode = element.ouCode;
            this.hub.ouCode = element.ouCode;
            this.hub.hubCode = element.hubCode;
            this.hub.hubNameENG = element.hubNameENG;
            this.hub.tlCode = element.tlCode;
            this.hub.hubTypeCode = element.hubTypeCode;
            this.hub.hubGroupCode = element.hubGroupCode;
            this.hub.sortBy = element.sortBy;
            this.hub.createdBy = element.createdBy;
            this.hub.createdDate = element.createdDate;
            this.hub.modifiedBy = element.modifiedBy;
            this.hub.modifiedDate = element.modifiedDate;
            if (element.isActive === '1') {
                this.hub.isActive = 'Active'.toString().trim();
            } else { this.hub.isActive = 'Inactive'.toString().trim(); }
            this.hubs.push(this.hub);
        });
        return this.hubs;
    }
    HubTransfarmerEntity(Entity: HubEntity): Hub {
        this.hub = new Hub();
        this.hub.ouCode = Entity.ouCode;
        this.hub.hubCode = Entity.hubCode;
        this.hub.hubNameENG = Entity.hubNameENG;
        this.hub.tlCode = Entity.tlCode;
        this.hub.hubTypeCode = Entity.hubTypeCode;
        this.hub.hubGroupCode = Entity.hubGroupCode;
        this.hub.sortBy = Entity.sortBy;
        this.hub.createdBy = Entity.createdBy;
        this.hub.createdDate = Entity.createdDate;
        this.hub.modifiedBy = Entity.modifiedBy;
        this.hub.modifiedDate = Entity.modifiedDate;
        if (Entity.isActive === '1') {
            this.hub.isActive = 'true'.toString().trim();
        } else { this.hub.isActive = ''.toString().trim(); }
        return this.hub;
    }

    HubTransfarmer(hub: Hub): HubEntity {
        this.hubEntity = new HubEntity();
        this.hubEntity.ouCode = hub.ouCode;
        this.hubEntity.hubCode = hub.hubCode;
        this.hubEntity.hubNameENG = hub.hubNameENG;
        this.hubEntity.tlCode = hub.tlCode;
        this.hubEntity.hubTypeCode = hub.hubTypeCode;
        this.hubEntity.hubGroupCode = hub.hubGroupCode;
        this.hubEntity.sortBy = hub.sortBy;
        this.hubEntity.createdBy = hub.createdBy;
        this.hubEntity.createdDate = hub.createdDate;
        this.hubEntity.modifiedBy = hub.modifiedBy;
        this.hubEntity.modifiedDate = hub.modifiedDate;
        if (hub.isActive.toString().trim() === 'true') {
            this.hubEntity.isActive = '1';
        } else { this.hubEntity.isActive = '0'; }
        return this.hubEntity;
    }
}
