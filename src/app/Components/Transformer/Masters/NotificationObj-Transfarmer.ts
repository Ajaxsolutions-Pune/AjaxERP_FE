import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { NotificationObj, NotificationObjEntity } from '../../Module/Masters/NotificationObj.model';


@Injectable()
export class NotificationObjTransfarmer {
    str: string;
    notificationObjEntity: NotificationObjEntity;
    notificationObj: NotificationObj ;
    notificationObjs: NotificationObj [];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    NotificationObjTransfarmers(Entity: NotificationObjEntity[]): NotificationObj [] {
        this.notificationObjs = [];
        Entity.forEach(element => {
            this.notificationObj = new NotificationObj();
            this.notificationObj.notificationId = element.notificationId;
            this.notificationObj.ouCode = element.ouCode;
            this.notificationObj.userGroupId = element.userGroupId;
            this.notificationObj.notificationMessage = element.notificationMessage;
            this.notificationObj.startDate = element.startDate;
            this.notificationObj.endDate = element.endDate;
            this.notificationObj.sortBy = element.sortBy;
            this.notificationObj.isActive = element.isActive;
            this.notificationObj.createdBy = element.createdBy;
            this.notificationObj.createdDate = element.createdDate;
            this.notificationObj.modifiedBy = element.modifiedBy;
            this.notificationObj.modifiedDate = element.modifiedDate;
            if (element.isActive === '1') {
                this.notificationObj.isActive = 'Active'.toString().trim();
            } else { this.notificationObj.isActive = 'Inactive'.toString().trim(); }
            this.notificationObjs.push(this.notificationObj);
        });
        return this.notificationObjs;
    }
    NotificationObjTransfarmerEntity(Entity: NotificationObjEntity): NotificationObj {
        this.notificationObj = new NotificationObj();
        console.log(Entity);
        this.notificationObj.notificationId = Entity.notificationId;
            this.notificationObj.ouCode = Entity.ouCode;
            this.notificationObj.userGroupId = Entity.userGroupId;
            this.notificationObj.notificationMessage = Entity.notificationMessage;
            this.notificationObj.startDate = Entity.startDate;
            this.notificationObj.endDate = Entity.endDate;
            this.notificationObj.sortBy = Entity.sortBy;
            this.notificationObj.isActive = Entity.isActive;
            this.notificationObj.createdBy = Entity.createdBy;
            this.notificationObj.createdDate = Entity.createdDate;
            this.notificationObj.modifiedBy = Entity.modifiedBy;
            this.notificationObj.modifiedDate = Entity.modifiedDate;
        if (Entity.isActive === '1') {
            this.notificationObj.isActive = 'true'.toString().trim();
        } else { this.notificationObj.isActive = ''.toString().trim(); }
        return this.notificationObj;
    }

    NotificationObjTransfarmer(Obj : NotificationObj ):NotificationObjEntity {
        console.log(Obj);
        this.notificationObjEntity = new NotificationObjEntity();
        this.notificationObjEntity.notificationId = Obj.notificationId;
        this.notificationObjEntity.ouCode = Obj.ouCode;
        this.notificationObjEntity.userGroupId = Obj.userGroupId;
        this.notificationObjEntity.notificationMessage = Obj.notificationMessage;
        this.notificationObjEntity.startDate = Obj.startDate;
        this.notificationObjEntity.endDate = Obj.endDate;
        this.notificationObjEntity.sortBy = Obj.sortBy;
        this.notificationObjEntity.isActive = Obj.isActive;
        this.notificationObjEntity.createdBy = Obj.createdBy;
        this.notificationObjEntity.createdDate = Obj.createdDate;
        this.notificationObjEntity.modifiedBy = Obj.modifiedBy;
        this.notificationObjEntity.modifiedDate = Obj.modifiedDate;
        if (Obj.isActive.toString().trim() === 'true') {
            this.notificationObjEntity.isActive = '1';
        } else { this.notificationObjEntity.isActive = '0'; }
        console.log(this.notificationObjEntity);
        return this.notificationObjEntity;
    }
}
