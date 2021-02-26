import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../Module/environment";
import { QualificationLevelEntity, QualificationLevel } from '../../Module/HRMS/QualificationLevel.model';

@Injectable()
export class QualificationLevelTransfarmer {
    str: string;
    qualificationLevelEntity: QualificationLevelEntity;
    qualificationLevel: QualificationLevel;
    qualificationLevels: QualificationLevel[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    QualificationLevelTransfarmers(Entity: QualificationLevelEntity[]): QualificationLevel[] {
        this.qualificationLevels = [];
        Entity.forEach(element => {
            this.qualificationLevel = new QualificationLevel();
            this.qualificationLevel.ouCode = element.ouCode;
            this.qualificationLevel.qualificationLevelName = element.qualificationLevelName;
            this.qualificationLevel.qualificationLevelDesc = element.qualificationLevelDesc;
            this.qualificationLevel.qualificationLevelCode = element.qualificationLevelCode;
            //this.qualificationLevel.qualificationLevelStatus = element.qualificationLevelStatus;
            this.qualificationLevel.createdBy = element.createdBy;
            this.qualificationLevel.createdDate = element.createdDate;
            this.qualificationLevel.modifiedBy = element.modifiedBy;
            this.qualificationLevel.modifiedDate = element.modifiedDate;
            if (element.qualificationLevelStatus === '1') {
                this.qualificationLevel.qualificationLevelStatus = 'Active'.toString().trim();
            } else { this.qualificationLevel.qualificationLevelStatus = 'Inactive'.toString().trim(); }
            this.qualificationLevels.push(this.qualificationLevel);
        });
        return this.qualificationLevels;
    }
    QualificationLevelTransfarmerEntity(Entity: QualificationLevelEntity): QualificationLevel {
        this.qualificationLevel = new QualificationLevel();
        this.qualificationLevel.ouCode = Entity.ouCode;
        this.qualificationLevel.qualificationLevelName = Entity.qualificationLevelName;
        this.qualificationLevel.qualificationLevelDesc = Entity.qualificationLevelDesc;
        this.qualificationLevel.qualificationLevelCode = Entity.qualificationLevelCode;
        // this.qualificationLevel.qualificationLevelStatus = Entity.qualificationLevelStatus;
        this.qualificationLevel.createdBy = Entity.createdBy;
        this.qualificationLevel.createdDate = Entity.createdDate;
        this.qualificationLevel.modifiedBy = Entity.modifiedBy;
        this.qualificationLevel.modifiedDate = Entity.modifiedDate;
        if (Entity.qualificationLevelStatus === '1') {
            this.qualificationLevel.qualificationLevelStatus = 'true'.toString().trim();
        } else { this.qualificationLevel.qualificationLevelStatus = ''.toString().trim(); }
        return this.qualificationLevel;
    }

    QualificationLevelTransfarmer(QualificationLevel: QualificationLevel): QualificationLevelEntity {
        this.qualificationLevelEntity = new QualificationLevelEntity();
        this.qualificationLevelEntity.ouCode = QualificationLevel.ouCode;
        this.qualificationLevelEntity.qualificationLevelName = QualificationLevel.qualificationLevelName;
        this.qualificationLevelEntity.qualificationLevelDesc = QualificationLevel.qualificationLevelDesc;
        this.qualificationLevelEntity.qualificationLevelCode = QualificationLevel.qualificationLevelCode;
        //this.qualificationLevelEntity.qualificationLevelStatus =QualificationLevel.qualificationLevelStatus;
        this.qualificationLevelEntity.createdBy = QualificationLevel.createdBy;
        this.qualificationLevelEntity.createdDate = QualificationLevel.createdDate;
        this.qualificationLevelEntity.modifiedBy = QualificationLevel.modifiedBy;
        this.qualificationLevelEntity.modifiedDate = QualificationLevel.modifiedDate;
        if (QualificationLevel.qualificationLevelStatus.toString().trim() === 'true') {
            this.qualificationLevelEntity.qualificationLevelStatus = '1';
        } else { this.qualificationLevelEntity.qualificationLevelStatus = '0'; }
        return this.qualificationLevelEntity;
    }
}
