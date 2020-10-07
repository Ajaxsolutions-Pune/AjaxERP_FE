import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Project, ProjectEntity } from '../../../Components/Module/Masters/Project.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectTransfarmer } from '../../../Components/Transformer/Masters/Project-Transfarmer';
import { DefaultLayoutComponent } from '../../../containers';
import { ProjectService } from '../../../Components/Services/Masters/ProjectService';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';
import { CrossFieldErrorMatcher } from '../AngularDemo/infrastructure/cross-field-error-matcher';
import { environment } from '../../../Components/Module/environment';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import { LoginUser } from '../../../Components/Module/LoginUser';
import { MasterDrp } from '../../../Components/Module/Masters/MasterDrp.model';

import { Employee} from '../../../Components/Module/Masters/Employee.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
})
export class ProjectComponent extends FormComponentBase implements OnInit, AfterViewInit {
  // @ts-ignore  
  @ViewChild('txtProjectID') firstItem: ElementRef;
  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  project: Project;
  projectEntity: ProjectEntity;
  str: string;
  env = environment;
  prjGroupDrp: MasterDrp[];
  prjTypeDrp: MasterDrp[];
  employeeDrp : Employee[];
  
  constructor(private route: ActivatedRoute,
    private projectTransfarmer: ProjectTransfarmer,
    private projectService: ProjectService,
    private globalService: GlobalService,
    private httpClient: HttpClient,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private router: Router, private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlProjectID: {
        required: 'Project id is required.',
      },
      ControlProject: {
        required: 'Project is required.',
      }
    };
    this.formErrors = {
        ControlProjectID: '',
        ControlProject: '',      
    };
     this.str = this.env.apiServiceIPPort;
  }

  fillEmployeeDrp(): Observable<Employee[]> {
      return this.httpClient.get<Employee[]>(this.str + '/Employee/getList', this.env.httpOptions);
      }

  ngOnInit() {

    //project group combo
    this.globalService.fillMasterDrp('PRJGR').subscribe(
      (par) => {
        this.prjGroupDrp = par;
      },
      (err: any) => console.log(err));

    //project type combo
    this.globalService.fillMasterDrp('PRJTY').subscribe(
      (par) => {
        this.prjTypeDrp = par;
      },
      (err: any) => console.log(err));

    //Employee combo
    this.fillEmployeeDrp().subscribe(
      (par) => {
        this.employeeDrp = par;
      },
      (err: any) => console.log(err)); 
    
    this.form = this.formBuilder.group({
      ControlProjectID: ['', []],
      ControlisActive: ['', []],
      ControlProjectDesc: ['', []],
      ControlStartDate: ['', []],
      ControlEndDate : ['', []],     
      ControlAccessType : ['',[]],
      ControlPriority: ['', []],
      ControlisTimesheetRequire: ['', []],
      ControlAccountCode: ['', []],
      ControlBudget: ['', []],
      ControlProjectType: ['', []],
      ControlProjectGroup: ['', []],
      ControlProjectManager: ['', []],
      ControlProject: ['', [Validators.required]]
    });
    this.form.controls['ControlProjectID'].disable();
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href='login';
    }
    status = '';
    this.project = {
        ouCode : '12',
        projectName: null,
        projectCode: null,
        projectDescription : null,
        startDate : null,
        endDate : null,
        projectTypeCode : null,
        projectGroupCode : null,
        customerCode : null,
        projectManagerCode : null,
        priority : null,
        timesheetRequired : 'true',
        mainAccountHeadCode : null,
        budget : null,      
        isActive: 'true',
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    this.route.paramMap.subscribe(parameterMap => { const str = parameterMap.get('id'); this.getproject(str); });
  } 

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.firstItem.nativeElement.focus();
    }, 250);
    this.startControlMonitoring(this.form);
  }

  registerClicked(): void {
    if (this.form.invalid) {
      return;
    }
    alert('Registration Complete');
  }

  save(projectForm: NgForm): void {  

      this.project.createdBy = localStorage.getItem('username');
      this.project.createdDate = this.globalService.GerCurrntDateStamp();
      this.project.modifiedBy = localStorage.getItem('username');
      this.project.modifiedDate = this.globalService.GerCurrntDateStamp();

    if (status !== 'Update') {
      this.project.projectCode = null;      
     this.projectService.Save(this.projectTransfarmer.ProjectTransfarmer(this.project)).subscribe(
        (par) => {         
          if (par.status === 'Inserted') {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['ProjectList']);
          }   else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );    

    } else {
      this.projectService.Update(this.projectTransfarmer.ProjectTransfarmer(this.project)).subscribe(
        (par) => {
          if (par.status === 'Updated') {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['ProjectList']);
          }   else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-danger');
          }
        }
      );
    }
  }

    
  private getproject(project_Code: string) {
    this.project = {     
        ouCode : null,
        projectName: null,
        projectCode: null,
        projectDescription : null,
        startDate : null,
        endDate : null,
        projectTypeCode : null,
        projectGroupCode : null,
        customerCode : null,
        projectManagerCode : null,
        priority : null,
        timesheetRequired : 'true',
        mainAccountHeadCode : null,
        budget : null,      
        isActive: 'true',
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
    };   




    if (project_Code === null || project_Code === '') {
      this.project = {
        ouCode : '12',
        projectName: null,
        projectCode: null,
        projectDescription : null,
        startDate : null,
        endDate : null,
        projectTypeCode : null,
        projectGroupCode : null,
        customerCode : null,
        projectManagerCode : null,
        priority : null,
        timesheetRequired : 'true',
        mainAccountHeadCode : null,
        budget : null,      
        isActive: 'true',
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
      };
      status = '';     

    } else {
      this.projectEntity = {
        ouCode : '12',
        projectName: null,
        projectCode: null,
        projectDescription : null,
        startDate : null,
        endDate : null,
        projectTypeCode : null,
        projectGroupCode : null,
        customerCode : null,
        projectManagerCode : null,
        priority : null,
        timesheetRequired : 'true',
        mainAccountHeadCode : null,
        budget : null,      
        isActive: 'true',
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
      };
      this.projectService.getProject(project_Code).subscribe(
        (par) => {
          this.projectEntity = par;
          this.project = this.projectTransfarmer.ProjectTransfarmerEntity(this.projectEntity);
          this.project.createdBy = localStorage.getItem('username');
          this.project.modifiedBy = localStorage.getItem('username');
          this.project.createdDate = this.globalService.GerCurrntDateStamp();
          this.project.modifiedDate = this.globalService.GerCurrntDateStamp();
        },
        (err: any) => console.log(err));
      status = 'Update';
    } 

  }
}