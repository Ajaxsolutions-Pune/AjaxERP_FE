import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../Module/environment";
import { Grade, GradeEntity } from "../../Module/HRMS/Grade.model";

@Injectable()
export class GradeTransfarmer {
    str: string;
    gradeEntity: GradeEntity;
    grade: Grade;
    grades: Grade[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    GradeTransfarmers(Entity: GradeEntity[]): Grade[] {
        this.grades = [];
        Entity.forEach(element => {
            this.grade = new Grade();
            this.grade.ouCode = element.ouCode;
            this.grade.gradeSetName = element.gradeSetName;
            this.grade.gradeSetCode = element.gradeSetCode;
            this.grade.gradeCode = element.gradeCode;
            this.grade.gradeName = element.gradeName;
            this.grade.gradeDescription = element.gradeDescription;
            this.grade.startDate = element.startDate;
            this.grade.createdBy = element.createdBy;
            this.grade.createdDate = element.createdDate;
            this.grade.modifiedBy = element.modifiedBy;
            this.grade.modifiedDate = element.modifiedDate;
            if (element.gradeStatus === '1') {
                this.grade.gradeStatus = 'Active'.toString().trim();
            } else { this.grade.gradeStatus = 'Inactive'.toString().trim(); }
            this.grades.push(this.grade);
        });
        return this.grades;
    }
    GradeTransfarmerEntity(Entity: GradeEntity): Grade {
            this.grade = new Grade();
            this.grade.ouCode = Entity.ouCode;
            this.grade.gradeSetName = Entity.gradeSetName;
            this.grade.gradeSetCode = Entity.gradeSetCode;
            this.grade.gradeCode = Entity.gradeCode;
            this.grade.gradeName = Entity.gradeName;
            this.grade.gradeDescription = Entity.gradeDescription;
            this.grade.startDate = Entity.startDate;
            this.grade.createdBy = Entity.createdBy;
            this.grade.createdDate = Entity.createdDate;
            this.grade.modifiedBy = Entity.modifiedBy;
            this.grade.modifiedDate = Entity.modifiedDate;
            if (Entity.gradeStatus === '1') {      
                this.grade.gradeStatus = 'true'.toString().trim();
        } else {this.grade.gradeStatus = ''.toString().trim(); } 
        return this.grade;
    }

    GradeTransfarmer(Grade: Grade): GradeEntity {
        this.gradeEntity = new GradeEntity();
        this.gradeEntity.ouCode = Grade.ouCode;
        this.gradeEntity.gradeSetName = Grade.gradeSetName;
        this.gradeEntity.gradeSetCode = Grade.gradeSetCode;
        this.gradeEntity.gradeCode = Grade.gradeCode;
        this.gradeEntity.gradeName = Grade.gradeName;
        this.gradeEntity.gradeDescription = Grade.gradeDescription;
        this.gradeEntity.startDate = Grade.startDate;
        this.gradeEntity.createdBy = Grade.createdBy;
        this.gradeEntity.createdDate = Grade.createdDate;
        this.gradeEntity.modifiedBy = Grade.modifiedBy;
        this.gradeEntity.modifiedDate = Grade.modifiedDate;
        if (Grade.gradeStatus.toString().trim() === 'true') {
            this.gradeEntity.gradeStatus = '1';
        } else { this.gradeEntity.gradeStatus = '0'; }
        return this.gradeEntity;
    }
}
