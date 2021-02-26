import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../Module/environment";
import { QualificationEntity, Qualification } from '../../Module/HRMS/Qualification.model';

@Injectable()
export class QualificationTransfarmer {
    str: string;
    qualificationEntity: QualificationEntity;
    qualification: Qualification;
    qualifications: Qualification[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    QualificationTransfarmers(Entity: QualificationEntity[]): Qualification[] {
        this.qualifications = [];
        Entity.forEach(element => {
            this.qualification = new Qualification();
            this.qualification.ouCode = element.ouCode;
            this.qualification.qualificationName = element.qualificationName;
            this.qualification.qualificationCode = element.qualificationCode;
            this.qualification.qualificationDescription = element.qualificationDescription;
            this.qualification.qualificationLevel = element.qualificationLevel;
            this.qualification.specialization = element.specialization;
            this.qualification.qualificationType = element.qualificationType;
            this.qualification.createdBy = element.createdBy;
            this.qualification.createdDate = element.createdDate;
            this.qualification.modifiedBy = element.modifiedBy;
            this.qualification.modifiedDate = element.modifiedDate;
            if (element.qualificationStatus === '1') {
                this.qualification.qualificationStatus = 'Active'.toString().trim();
            } else { this.qualification.qualificationStatus = 'Inactive'.toString().trim(); }
            this.qualifications.push(this.qualification);
        });
        return this.qualifications;
    }
    QualificationTransfarmerEntity(Entity: QualificationEntity): Qualification {
        this.qualification = new Qualification();
        this.qualification.ouCode = Entity.ouCode;
        this.qualification.qualificationName = Entity.qualificationName;
        this.qualification.qualificationCode = Entity.qualificationCode;
        this.qualification.qualificationDescription = Entity.qualificationDescription;
        this.qualification.qualificationLevel = Entity.qualificationLevel;
        this.qualification.specialization = Entity.specialization;
        this.qualification.qualificationType = Entity.qualificationType;
        this.qualification.createdBy = Entity.createdBy;
        this.qualification.createdDate = Entity.createdDate;
        this.qualification.modifiedBy = Entity.modifiedBy;
        this.qualification.modifiedDate = Entity.modifiedDate;
        if (Entity.qualificationStatus === '1') {
            this.qualification.qualificationStatus = 'true'.toString().trim();
        } else { this.qualification.qualificationStatus = ''.toString().trim(); }
        return this.qualification;
    }

    QualificationTransfarmer(Qualification: Qualification): QualificationEntity {
        this.qualificationEntity = new QualificationEntity();
        this.qualificationEntity.ouCode = Qualification.ouCode;
        this.qualificationEntity.qualificationName = Qualification.qualificationName;
        this.qualificationEntity.qualificationCode = Qualification.qualificationCode;
        this.qualificationEntity.qualificationDescription = Qualification.qualificationDescription;
        this.qualificationEntity.qualificationLevel = Qualification.qualificationLevel;
        this.qualificationEntity.specialization = Qualification.specialization;
        this.qualificationEntity.qualificationType = Qualification.qualificationType;
        this.qualificationEntity.createdBy = Qualification.createdBy;
        this.qualificationEntity.createdDate = Qualification.createdDate;
        this.qualificationEntity.modifiedBy = Qualification.modifiedBy;
        this.qualificationEntity.modifiedDate = Qualification.modifiedDate;
        if (Qualification.qualificationStatus.toString().trim() === 'true') {
            this.qualificationEntity.qualificationStatus = '1';
        } else { this.qualificationEntity.qualificationStatus = '0'; }
        return this.qualificationEntity;
    }
}
