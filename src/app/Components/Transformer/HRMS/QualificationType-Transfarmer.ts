import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../Module/environment";
import { QualificationTypeEntity, QualificationType } from '../../Module/HRMS/QualificationType.model';

@Injectable()
export class QualificationTypeTransfarmer {
    str: string;
    qualificationTypeEntity: QualificationTypeEntity;
    qualificationType: QualificationType;
    qualificationTypes: QualificationType[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    QualificationTypeTransfarmers(Entity: QualificationTypeEntity[]): QualificationType[] {
        this.qualificationTypes = [];
        Entity.forEach(element => {
            this.qualificationType = new QualificationType();
            this.qualificationType.ouCode = element.ouCode;
            this.qualificationType.qualificationTypeName = element.qualificationTypeName;
            this.qualificationType.qualificationTypeDesc = element.qualificationTypeDesc;
            this.qualificationType.qualificationTypeCode = element.qualificationTypeCode;
            this.qualificationType.createdBy = element.createdBy;
            this.qualificationType.createdDate = element.createdDate;
            this.qualificationType.modifiedBy = element.modifiedBy;
            this.qualificationType.modifiedDate = element.modifiedDate;
            if (element.qualificationTypeStatus === '1') {
                this.qualificationType.qualificationTypeStatus = 'Active'.toString().trim();
            } else { this.qualificationType.qualificationTypeStatus = 'Inactive'.toString().trim(); }
            this.qualificationTypes.push(this.qualificationType);
        });
        return this.qualificationTypes;
    }
    QualificationTypeTransfarmerEntity(Entity: QualificationTypeEntity): QualificationType {
        this.qualificationType = new QualificationType();
        this.qualificationType.ouCode = Entity.ouCode;
        this.qualificationType.qualificationTypeName = Entity.qualificationTypeName;
        this.qualificationType.qualificationTypeDesc = Entity.qualificationTypeDesc;
        this.qualificationType.qualificationTypeCode = Entity.qualificationTypeCode;
        this.qualificationType.createdBy = Entity.createdBy;
        this.qualificationType.createdDate = Entity.createdDate;
        this.qualificationType.modifiedBy = Entity.modifiedBy;
        this.qualificationType.modifiedDate = Entity.modifiedDate;
        if (Entity.qualificationTypeStatus === '1') {
            this.qualificationType.qualificationTypeStatus = 'true'.toString().trim();
        } else { this.qualificationType.qualificationTypeStatus = ''.toString().trim(); }
        return this.qualificationType;
    }

    QualificationTypeTransfarmer(QualificationType: QualificationType): QualificationTypeEntity {
        this.qualificationTypeEntity = new QualificationTypeEntity();
        this.qualificationTypeEntity.ouCode = QualificationType.ouCode;
        this.qualificationTypeEntity.qualificationTypeName = QualificationType.qualificationTypeName;
        this.qualificationTypeEntity.qualificationTypeDesc = QualificationType.qualificationTypeDesc;
        this.qualificationTypeEntity.qualificationTypeCode = QualificationType.qualificationTypeCode;
        this.qualificationTypeEntity.createdBy = QualificationType.createdBy;
        this.qualificationTypeEntity.createdDate = QualificationType.createdDate;
        this.qualificationTypeEntity.modifiedBy = QualificationType.modifiedBy;
        this.qualificationTypeEntity.modifiedDate = QualificationType.modifiedDate;
        if (QualificationType.qualificationTypeStatus.toString().trim() === 'true') {
            this.qualificationTypeEntity.qualificationTypeStatus = '1';
        } else { this.qualificationTypeEntity.qualificationTypeStatus = '0'; }
        return this.qualificationTypeEntity;
    }
}
