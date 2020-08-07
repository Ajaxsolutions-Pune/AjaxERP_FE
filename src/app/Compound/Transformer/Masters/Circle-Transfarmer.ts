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
            this.Oject = new Circle();
            this.Oject.circleCode = element.circleCode;
            this.Oject.circleNameENG = element.circleNameENG;
            this.Oject.circleNameUNI = element.circleNameUNI;
            this.Oject.zoneCode = element.zoneCode;
            this.Oject.isActive = element.isActive;
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
        } else { this.Oject.isActive = ''.toString().trim(); }

        return this.Oject;
    }

    CircleTransfarmer(qaType1: Circle): CircleEntity {
        this.OjectEntity = new CircleEntity();
        this.OjectEntity.zoneCode = qaType1.zoneCode;
        this.OjectEntity.circleNameENG = qaType1.circleNameENG;
        this.OjectEntity.circleNameUNI = qaType1.circleNameUNI;
        this.OjectEntity.zoneCode = qaType1.zoneCode;
         if (qaType1.isActive === 'true') {  this.OjectEntity.isActive = '1';
             } else { this.OjectEntity.isActive = '0'; }
        if (qaType1.isActive.toString().trim() === 'true') {
            this.OjectEntity.isActive = '1';
        } else {
            this.OjectEntity.isActive = '0';
        }
        return this.OjectEntity;
    }
}
