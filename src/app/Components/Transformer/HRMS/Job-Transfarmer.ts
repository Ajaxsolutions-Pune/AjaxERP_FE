import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../Module/environment";
import { JobEntity, Job } from '../../Module/HRMS/Job.model';



@Injectable()
export class JobTransfarmer {
    str: string;
    jobEntity: JobEntity;
    job: Job;
    jobs: Job[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    JobTransfarmers(Entity: JobEntity[]): Job[] {
        this.jobs = [];
        Entity.forEach(element => {
            this.job = new Job();
            this.job.ouCode = element.ouCode;
            this.job.jobName = element.jobName;
            this.job.jobCode = element.jobCode;
            this.job.gradeCode = element.gradeCode;
            this.job.jobProfile = element.jobProfile;
            this.job.jobDescription = element.jobDescription;
            this.job.jobLevel = element.jobLevel;
            this.job.startDate = element.startDate;
            this.job.createdBy = element.createdBy;
            this.job.createdDate = element.createdDate;
            this.job.modifiedBy = element.modifiedBy;
            this.job.modifiedDate = element.modifiedDate;
            if (element.jobStatus === '1') {
                this.job.jobStatus = 'Active'.toString().trim();
            } else { this.job.jobStatus = 'Inactive'.toString().trim(); }
            this.jobs.push(this.job);
        });
        return this.jobs;
    }
    JobTransfarmerEntity(Entity: JobEntity): Job {
        this.job = new Job();
        this.job.ouCode = Entity.ouCode;
        this.job.jobName = Entity.jobName;
        this.job.jobCode = Entity.jobCode;
        this.job.gradeCode = Entity.gradeCode;
        this.job.jobProfile = Entity.jobProfile;
        this.job.jobDescription = Entity.jobDescription;
        this.job.jobLevel = Entity.jobLevel;
        this.job.startDate = Entity.startDate;
        this.job.createdBy = Entity.createdBy;
        this.job.createdDate = Entity.createdDate;
        this.job.modifiedBy = Entity.modifiedBy;
        this.job.modifiedDate = Entity.modifiedDate;
        if (Entity.jobStatus === '1') {
            this.job.jobStatus = 'true'.toString().trim();
        } else { this.job.jobStatus = ''.toString().trim(); }
        return this.job;
    }

    JobTransfarmer(Job: Job): JobEntity {
        this.jobEntity = new JobEntity();
        this.jobEntity.ouCode = Job.ouCode;
        this.jobEntity.jobName = Job.jobName;
        this.jobEntity.jobCode = Job.jobCode;
        this.jobEntity.gradeCode = Job.gradeCode;
        this.jobEntity.jobProfile = Job.jobProfile;
        this.jobEntity.jobDescription = Job.jobDescription;
        this.jobEntity.jobLevel = Job.jobLevel;
        this.jobEntity.startDate = Job.startDate;
        this.jobEntity.createdBy = Job.createdBy;
        this.jobEntity.createdDate = Job.createdDate;
        this.jobEntity.modifiedBy = Job.modifiedBy;
        this.jobEntity.modifiedDate = Job.modifiedDate;
        if (Job.jobStatus.toString().trim() === 'true') {
            this.jobEntity.jobStatus = '1';
        } else { this.jobEntity.jobStatus = '0'; }
        return this.jobEntity;
    }
}
