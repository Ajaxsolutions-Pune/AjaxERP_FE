import { Injectable } from '@angular/core';
import { environment } from '../../Module/environment';
import { CircleEntity, Circle } from '../../Module/Masters/Circle.model';

@Injectable()
export class CircleTransfarmer {
    str: string;
    OjectEntity: CircleEntity;
    Oject: Circle;
    arrOject: Circle[] = [];
    env = environment;
    constructor() {
        this.str = this.env.apiServiceIPPort;
    }
    CircleTransfarmers(Entity: CircleEntity[]): Circle[] {
        this.arrOject = [];
        Entity.forEach(element => {
            console.log(element);
            this.Oject = new Circle();
            this.Oject.circleCode = element.circleCode;
            this.Oject.circleNameENG = element.circleNameENG;
            this.Oject.circleNameUNI = element.circleNameUNI;
            this.Oject.zoneCode = element.zoneCode;
            this.Oject.createdBy = element.createdBy;
            this.Oject.createdDate = element.createdDate;
            this.Oject.modifiedBy = element.modifiedBy;
            this.Oject.modifiedDate = element.modifiedDate;
            if (element.isActive === '1') {
                this.Oject.isActive = 'Active'.toString().trim();
            } else { this.Oject.isActive = 'Inactive'.toString().trim(); }
            this.arrOject.push(this.Oject);
        });
        return this.arrOject;
    }
    CircleTransfarmerEntity(Entity: CircleEntity): Circle {
        console.log(Entity);
        this.Oject = new Circle();
        this.Oject.circleCode = Entity.circleCode;
        this.Oject.circleNameENG = Entity.circleNameENG;
        this.Oject.circleNameUNI = Entity.circleNameUNI;
        this.Oject.zoneCode = Entity.zoneCode;
        if (Entity.isActive === '1') {
            this.Oject.isActive = 'true'.toString().trim();
        } else {
            this.Oject.isActive = ''.toString().trim();
        }
        this.Oject.createdBy = Entity.createdBy;
        this.Oject.createdDate = Entity.createdDate;
        this.Oject.modifiedBy = Entity.modifiedBy;
        this.Oject.modifiedDate = Entity.modifiedDate;
        return this.Oject;
    }

    CircleTransfarmer(Obj: Circle): CircleEntity {
        this.OjectEntity = new CircleEntity();
        this.OjectEntity.circleCode = Obj.circleCode;
        this.OjectEntity.zoneCode = Obj.zoneCode;
        this.OjectEntity.circleNameENG = Obj.circleNameENG;
        this.OjectEntity.circleNameUNI = Obj.circleNameUNI;
        this.OjectEntity.zoneCode = Obj.zoneCode;
        if (Obj.isActive === 'true') {
            this.OjectEntity.isActive = '1';
        } else { this.OjectEntity.isActive = '0'; }
        if (Obj.isActive.toString().trim() === 'true') {
            this.OjectEntity.isActive = '1';
        } else {
            this.OjectEntity.isActive = '0';
        }
        this.OjectEntity.createdBy = Obj.createdBy;
        this.OjectEntity.createdDate = Obj.createdDate;
        this.OjectEntity.modifiedBy = Obj.modifiedBy;
        this.OjectEntity.modifiedDate = Obj.modifiedDate;
        return this.OjectEntity;
    }
}
