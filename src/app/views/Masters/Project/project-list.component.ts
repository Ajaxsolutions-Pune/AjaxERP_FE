import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Project, ProjectEntity } from '../../../Components/Module/Masters/Project.model';
import { ProjectTransfarmer } from '../../../Components/Transformer/Masters/Project-Transfarmer';
import { ProjectService } from '../../../Components/Services/Masters/ProjectService';
import * as alasql from 'alasql';
alasql['private'].externalXlsxLib = require('xlsx');
import { environment } from '../../../Components/Module/environment';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  //styleUrls: ['./Answer-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  @Input() ProjectInput: Project;
  projects: Project[];
  projectsEntity: ProjectEntity[];
  config: any;
  env = environment;

  WithoutFilterProject: Project[];
  Resultproject: Project[];
  SerachCri: number;
  objProject: Project;

  constructor(private _router: Router,
    objTrans: ProjectTransfarmer,
    private projectService: ProjectService,
    private route: ActivatedRoute) {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      this._router.navigate(['login']);
    }
    this.projectsEntity = this.route.snapshot.data['ProjectList'];
    this.projects = objTrans.ProjectTransfarmers(this.projectsEntity);
    this.WithoutFilterProject = this.projects;
    this.config = {
      itemsPerPage:  this.env.paginationPageSize,
      currentPage: 1,
      totalItems: this.projects.length
    };
  }

  ngOnInit() {
    this.WithoutFilterProject = this.projects;
    this.objProject = {
      ouCode : null,      
      projectName: null,
      projectCode: null,
      projectDescription: null,
      startDate: null,
      endDate : null,
      accessType : null,
      priority : null,
      timesheetRequired : null,
      mainAccountHeadCode : null,
      budget  : null,
      createdBy: null,
      createdDate: null,
      modifiedBy: null,
      modifiedDate: null,
      isActive: '3'
    };
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.Resultproject = this.WithoutFilterProject;
    
    if (this.objProject.projectName !== null && this.objProject.projectName !== '') {
      console.log(this.objProject.projectName.toString().toLowerCase());
      this.Resultproject = this.Resultproject.filter(SubResult =>
        SubResult.projectName.toLowerCase().indexOf(this.objProject.projectName.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.objProject.projectCode !== null && this.objProject.projectCode.toString() !== '') {
      this.Resultproject = this.Resultproject.filter(SubResult =>
        SubResult.projectCode.toString().toLowerCase().indexOf(this.objProject.projectCode.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }

    if (this.objProject.isActive !== null && this.objProject.isActive.toString() !== '-1') {
      if (this.objProject.isActive.toString() === '3') {
        this.Resultproject = this.Resultproject.filter(SubResultProd =>
          SubResultProd.isActive.toString() === 'Active'
          || SubResultProd.isActive.toString() === 'Inactive');
      } else {
        this.Resultproject = this.Resultproject.filter(SubResultProd =>
          SubResultProd.isActive.toString() === this.objProject.isActive.toString());
      }
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.Resultproject = this.WithoutFilterProject;
    }
    this.projects = this.Resultproject;
    this.config = {
      itemsPerPage: this.env.paginationPageSize,
      currentPage: 1,
      totalItems: this.projects.length
    };
  }

  ExportToExcel(): void {
    alasql('SELECT Project_Code Project_Id,Project_Name Project, Project_Description Project_Desc, ' +
    ' Start_Date, End_Date, AccessType, Priority,Timesheet_Required, MainAccountHead_Code, Budget, ' +
    '  isActive Is_Active' +
     ' INTO XLSX("ProjectList.xlsx",{headers:true}) FROM ?', [this.projects]);
  }

}
