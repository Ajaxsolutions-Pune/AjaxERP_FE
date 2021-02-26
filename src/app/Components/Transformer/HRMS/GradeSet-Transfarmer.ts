import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GradeSet, GradeSetEntity } from '../../Module/HRMS/GradeSet.model';
import { environment } from '../../Module/environment';

@Injectable()
export class GradeSetTransfarmer {
    str: string;
    gradesetEntity: GradeSetEntity;
    gradeset: GradeSet;
    gradesets: GradeSet[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    GradeSetTransfarmers(Entity: GradeSetEntity[]): GradeSet[] {
        this.gradesets = [];
        Entity.forEach(element => {
            this.gradeset = new GradeSet();
            this.gradeset.ouCode = element.ouCode;
            this.gradeset.gradeSetCode = element.gradeSetCode;
            this.gradeset.gradeSetName = element.gradeSetName;
            this.gradeset.gradeSetDescription = element.gradeSetDescription;
            this.gradeset.startDate = element.startDate;
            this.gradeset.createdBy = element.createdBy;
            this.gradeset.createdDate = element.createdDate;
            this.gradeset.modifiedBy = element.modifiedBy;
            this.gradeset.modifiedDate = element.modifiedDate;
            if (element.gradeSetStatus === '1') {
                this.gradeset.gradeSetStatus = 'Active'.toString().trim();
            } else { this.gradeset.gradeSetStatus = 'Inactive'.toString().trim(); }
            this.gradesets.push(this.gradeset);
        });
        return this.gradesets;
    }
    GradeSetTransfarmerEntity(Entity: GradeSetEntity): GradeSet {
        this.gradeset = new GradeSet();
        this.gradeset.ouCode = Entity.ouCode;
        this.gradeset.gradeSetCode = Entity.gradeSetCode;
        this.gradeset.gradeSetName = Entity.gradeSetName;
        this.gradeset.gradeSetDescription = Entity.gradeSetDescription;
        this.gradeset.startDate = Entity.startDate;
        this.gradeset.createdBy = Entity.createdBy;
        this.gradeset.createdDate = Entity.createdDate;
        this.gradeset.modifiedBy = Entity.modifiedBy;
        this.gradeset.modifiedDate = Entity.modifiedDate;
        if (Entity.gradeSetStatus === '1') {
            this.gradeset.gradeSetStatus = 'true'.toString().trim();
        } else { this.gradeset.gradeSetStatus = ''.toString().trim(); }
        return this.gradeset;
    }

    GradeSetTransfarmer(GradeSet: GradeSet): GradeSetEntity {
        this.gradesetEntity = new GradeSetEntity();
        this.gradesetEntity.ouCode = GradeSet.ouCode;
        this.gradesetEntity.gradeSetCode = GradeSet.gradeSetCode;
        this.gradesetEntity.gradeSetName = GradeSet.gradeSetName;
        this.gradesetEntity.gradeSetDescription = GradeSet.gradeSetDescription;
        this.gradesetEntity.startDate = GradeSet.startDate;
        this.gradesetEntity.createdBy = GradeSet.createdBy;
        this.gradesetEntity.createdDate = GradeSet.createdDate;
        this.gradesetEntity.modifiedBy = GradeSet.modifiedBy;
        this.gradesetEntity.modifiedDate = GradeSet.modifiedDate;
        if (GradeSet.gradeSetStatus.toString().trim() === 'true') {
            this.gradesetEntity.gradeSetStatus = '1';
        } else { this.gradesetEntity.gradeSetStatus = '0'; }
        return this.gradesetEntity;
    }
}
