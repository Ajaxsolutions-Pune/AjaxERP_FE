import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../Module/environment";
import { JobEntity, Job } from '../../Module/HRMS/Job.model';
import { JobLevel, JobLevelEntity } from '../../Module/HRMS/JobLevel.model';



@Injectable()
export class JobLevelTransfarmer {
    str: string;
    jobLevelEntity: JobLevelEntity;
    jobLevel: JobLevel;
    jobLevels: JobLevel[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    JobLevelTransfarmers(Entity: JobLevelEntity[]): JobLevel[] {
        this.jobLevels = [];
        Entity.forEach(element => {
            this.jobLevel = new JobLevel();
            this.jobLevel.ouCode = element.ouCode;
            this.jobLevel.jobLevelName = element.jobLevelName;
            this.jobLevel.jobLevelCode = element.jobLevelCode;
            this.jobLevel.reportingJobLevel = element.reportingJobLevel;
            //this.jobLevel.jobLevelStatus = element.jobLevelStatus;
            this.jobLevel.createdBy = element.createdBy;
            this.jobLevel.createdDate = element.createdDate;
            this.jobLevel.modifiedBy = element.modifiedBy;
            this.jobLevel.modifiedDate = element.modifiedDate;
            if (element.jobLevelStatus === '1') {
                this.jobLevel.jobLevelStatus = 'Active'.toString().trim();
            } else { this.jobLevel.jobLevelStatus = 'Inactive'.toString().trim(); }
            this.jobLevels.push(this.jobLevel);
        });
        return this.jobLevels;
    }
    JobLevelTransfarmerEntity(Entity: JobLevelEntity): JobLevel {
        this.jobLevel = new JobLevel();
        this.jobLevel.ouCode = Entity.ouCode;
        this.jobLevel.jobLevelName = Entity.jobLevelName;
        this.jobLevel.reportingJobLevel = Entity.reportingJobLevel;
        this.jobLevel.jobLevelCode = Entity.jobLevelCode;
        this.jobLevel.createdBy = Entity.createdBy;
        this.jobLevel.createdDate = Entity.createdDate;
        this.jobLevel.modifiedBy = Entity.modifiedBy;
        this.jobLevel.modifiedDate = Entity.modifiedDate;
        if (Entity.jobLevelStatus === '1') {
            this.jobLevel.jobLevelStatus = 'true'.toString().trim();
        } else { this.jobLevel.jobLevelStatus = ''.toString().trim(); }
        return this.jobLevel;
    }

    JobLevelTransfarmer(JobLevel: JobLevel): JobLevelEntity {
        this.jobLevelEntity = new JobLevelEntity();
        this.jobLevelEntity.ouCode = JobLevel.ouCode;
        this.jobLevelEntity.jobLevelName = JobLevel.jobLevelName;
        this.jobLevelEntity.reportingJobLevel = JobLevel.reportingJobLevel;
        this.jobLevelEntity.jobLevelCode = JobLevel.jobLevelCode;
        this.jobLevelEntity.createdBy = JobLevel.createdBy;
        this.jobLevelEntity.createdDate = JobLevel.createdDate;
        this.jobLevelEntity.modifiedBy = JobLevel.modifiedBy;
        this.jobLevelEntity.modifiedDate = JobLevel.modifiedDate;
        if (JobLevel.jobLevelStatus.toString().trim() === 'true') {
            this.jobLevelEntity.jobLevelStatus = '1';
        } else { this.jobLevelEntity.jobLevelStatus = '0'; }
        return this.jobLevelEntity;
    }
}
