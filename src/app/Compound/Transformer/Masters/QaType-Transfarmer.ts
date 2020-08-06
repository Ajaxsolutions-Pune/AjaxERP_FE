import { Injectable } from '@angular/core';
import { environment } from '../../Module/environment';
import { QaTypeEntity, QaType } from '../../Module/Masters/QA_Type.model';

@Injectable()
export class QaTypeTransfarmer {
    str: string;
    OjectEntity: QaTypeEntity;
    Oject: QaType;
    arrOject: QaType[] = [];
    env = environment;
    constructor() {
        this.str = this.env.apiServiceIPPort;
    }
    QaTypeTransfarmers(Entity: QaTypeEntity[]): QaType[] {
        this.arrOject = [];
        Entity.forEach(element => {
            this.Oject = new QaType();
            this.Oject.qaTypeCode = element.qaTypeCode;
            this.Oject.qaTypeDesc = element.qaTypeDesc;
            this.Oject.isActive = element.isActive;
            this.arrOject.push(this.Oject);
        });
        return this.arrOject;
    }
    QaTypeTransfarmerEntity(Entity: QaTypeEntity): QaType {
        console.log(Entity);
        this.Oject = new QaType();
        this.Oject.qaTypeCode = Entity.qaTypeCode;
        this.Oject.qaTypeDesc = Entity.qaTypeDesc;
        if (Entity.isActive === '1') {
            this.Oject.isActive = 'true'.toString().trim();
        } else { this.Oject.isActive = ''.toString().trim(); }

        return this.Oject;
    }

    QaTypeTransfarmer(qaType1: QaType): QaTypeEntity {
        this.OjectEntity = new QaTypeEntity();
        this.OjectEntity.qaTypeCode = qaType1.qaTypeCode;
        this.OjectEntity.qaTypeDesc = qaType1.qaTypeDesc;
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
