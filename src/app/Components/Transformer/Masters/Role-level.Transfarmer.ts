import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { RolelevelEntity, Rolelevel } from '../../Module/Masters/Rolelevel.model';

@Injectable()
export class RolelevelTransfarmer {
    str: string;
    rolelevelEntity: RolelevelEntity;
    rolelevel: Rolelevel;
    rolelevels: Rolelevel[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    RolelevelTransfarmers(Entity: RolelevelEntity[]): Rolelevel[] {
        this.rolelevels = [];
        Entity.forEach(element => {
            this.rolelevel = new Rolelevel();
            this.rolelevel.roleLevelId = element.roleLevelId;
            this.rolelevel.roleLevelDesc = element.roleLevelDesc;
            this.rolelevel.userType = element.userType;
            this.rolelevel.rolePriority = element.rolePriority;
            this.rolelevel.createdBy = element.createdBy;
            this.rolelevel.createdDate = element.createdDate;
            this.rolelevel.modifiedBy = element.modifiedBy;
            this.rolelevel.modifiedDate = element.modifiedDate;
            if (element.isActive === '1') {
                this.rolelevel.isActive = 'Active'.toString().trim();
            } else { this.rolelevel.isActive = 'Inactive'.toString().trim(); }
            this.rolelevels.push(this.rolelevel);
        });
        return this.rolelevels;
    }
    RolelevelTransfarmerEntity(Entity: RolelevelEntity): Rolelevel {
        this.rolelevel = new Rolelevel();
        this.rolelevel.roleLevelId = Entity.roleLevelId;
        this.rolelevel.roleLevelDesc = Entity.roleLevelDesc;
        this.rolelevel.userType = Entity.userType;
        this.rolelevel.rolePriority = Entity.rolePriority;
        this.rolelevel.createdBy = Entity.createdBy;
        this.rolelevel.createdDate = Entity.createdDate;
        this.rolelevel.modifiedBy = Entity.modifiedBy;
        this.rolelevel.modifiedDate = Entity.modifiedDate;
        if (Entity.isActive === '1') {
            this.rolelevel.isActive = 'true'.toString().trim();
        } else { this.rolelevel.isActive = ''.toString().trim(); }
        console.log(this.rolelevel.isActive);
        return this.rolelevel;
    }

    RolelevelTransfarmer(Rolelevel: Rolelevel): RolelevelEntity {
        this.rolelevelEntity = new RolelevelEntity();
        this.rolelevelEntity.roleLevelId = Rolelevel.roleLevelId;
        this.rolelevelEntity.roleLevelDesc = Rolelevel.roleLevelDesc;
        this.rolelevelEntity.userType = Rolelevel.userType;
        this.rolelevelEntity.rolePriority = Rolelevel.rolePriority;
        this.rolelevelEntity.createdBy = Rolelevel.createdBy;
        this.rolelevelEntity.createdDate = Rolelevel.createdDate;
        this.rolelevelEntity.modifiedBy = Rolelevel.modifiedBy;
        this.rolelevelEntity.modifiedDate = Rolelevel.modifiedDate;
        if (Rolelevel.isActive.toString().trim() === 'true') {
            this.rolelevelEntity.isActive = '1';
        } else { this.rolelevelEntity.isActive = '0'; }
        return this.rolelevelEntity;
    }
}
