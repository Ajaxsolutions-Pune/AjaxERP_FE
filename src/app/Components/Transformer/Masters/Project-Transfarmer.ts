import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { ProjectEntity, Project } from '../../Module/Masters/Project.model';

@Injectable()
export class ProjectTransfarmer {
    str: string;
    projectEntity: ProjectEntity;
    project: Project;
    projects: Project[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }

    ProjectTransfarmers(Entity: ProjectEntity[]): Project[] {
        this.projects = [];
        Entity.forEach(element => {
            this.project = new Project();   
            this.project.ouCode = '12';      
            this.project.projectCode = element.projectCode;
            this.project.projectName = element.projectName;
            this.project.projectDescription= element.projectDescription;
            this.project.startDate= element.startDate;
            this.project.endDate = element.endDate;
            this.project.accessType = element.accessType;
            this.project.priority = element.priority;          
            if (element.timesheetRequired === '1') {
                this.project.timesheetRequired = 'Yes'.toString().trim();
            } else { this.project.timesheetRequired = 'No'.toString().trim(); }
            this.project.mainAccountHeadCode = element.mainAccountHeadCode;
            this.project.budget  = element.budget;
            this.project.createdBy = element.createdBy;
            this.project.createdDate = element.createdDate;
            this.project.modifiedBy = element.modifiedBy;
            this.project.modifiedDate = element.modifiedDate;
            if (element.isActive === '1') {
                this.project.isActive = 'Active'.toString().trim();
            } else { this.project.isActive = 'Inactive'.toString().trim(); }
            this.projects.push(this.project);
        });
        return this.projects;
    }

     ProjectTransfarmerEntity(Entity: ProjectEntity): Project {
        console.log(Entity);
        this.project = new Project();
        this.project.ouCode = '12';
        this.project.projectCode = Entity.projectCode;
        this.project.projectName = Entity.projectName;
        this.project.projectDescription= Entity.projectDescription;
        this.project.startDate= Entity.startDate;
        this.project.endDate = Entity.endDate;
        this.project.accessType = Entity.accessType;
        this.project.priority = Entity.priority;

        //this.project.timesheet_required = Entity.timesheet_required;

        if (Entity.timesheetRequired === '1') 
        { this.project.timesheetRequired = 'true'.toString().trim(); } 
        else { this.project.timesheetRequired = ''.toString().trim(); }
        
        this.project.mainAccountHeadCode = Entity.mainAccountHeadCode;
        this.project.budget  = Entity.budget;

        this.project.createdBy = Entity.createdBy;
        this.project.createdDate = Entity.createdDate;
        this.project.modifiedBy = Entity.modifiedBy;
        this.project.modifiedDate = Entity.modifiedDate;
        console.log(Entity.isActive.toString().trim() === '1');
        console.log(Entity.isActive);
         // tslint:disable-next-line:max-line-length
         if (Entity.isActive === '1') { this.project.isActive = 'true'.toString().trim(); } else { this.project.isActive = ''.toString().trim(); }
        console.log(this.project.isActive);
        return this.project;
    }    

    ProjectTransfarmer(Project1: Project): ProjectEntity {
        this.projectEntity = new ProjectEntity();
        this.projectEntity.ouCode = '12';
        this.projectEntity.projectCode = Project1.projectCode ;
        this.projectEntity.projectName = Project1.projectName;
        
        this.projectEntity.projectDescription= Project1.projectDescription;
        this.projectEntity.startDate= Project1.startDate;
        this.projectEntity.endDate = Project1.endDate;
        this.projectEntity.accessType = Project1.accessType;
        this.projectEntity.priority = Project1.priority;
        
        //this.projectEntity.timesheet_required = Project1.timesheet_required;

        if (Project1.timesheetRequired.toString().trim() === 'true')
         { this.projectEntity.timesheetRequired = '1'; } else 
         { this.projectEntity.timesheetRequired = '0'; }

        this.projectEntity.mainAccountHeadCode = Project1.mainAccountHeadCode;
        this.projectEntity.budget  = Project1.budget;

        this.projectEntity.createdBy = Project1.createdBy;
        this.projectEntity.createdDate = Project1.createdDate;
        this.projectEntity.modifiedBy = Project1.modifiedBy;
        this.projectEntity.modifiedDate = Project1.modifiedDate;
         if (Project1.isActive.toString().trim() === 'true') { this.projectEntity.isActive = '1'; } else { this.projectEntity.isActive = '0'; }
        return this.projectEntity;
    }
}
