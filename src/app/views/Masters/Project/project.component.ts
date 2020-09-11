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
  
  constructor(private route: ActivatedRoute,
    private projectTransfarmer: ProjectTransfarmer,
    private projectService: ProjectService,
    private globalService: GlobalService,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private router: Router, private formBuilder: FormBuilder) {
    super();
    console.log(localStorage.getItem('username'));
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
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      ControlProjectID: ['', []],
      ControlisActive: ['', []],
      ControlProjectDesc: ['', []],
      ControlStartDate: ['', []],
      ControlEndDate : ['', []],
      ControlAccessType : ['', []],
      ControlPriority: ['', []],
      ControlisTimesheetRequire: ['', []],
      ControlAccountCode: ['', []],
      ControlBudget: ['', []],
      ControlProject: ['', [Validators.required]]
    });
    this.form.controls['ControlProjectID'].disable();
    status = '';
    this.project = {
        ouCode : '12',
        projectName: null,
        projectCode: null,
        projectDescription : null,
        startDate : null,
        endDate : null,
        accessType : null,
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
      console.log(this.projectTransfarmer.ProjectTransfarmer(this.project));
      
     this.projectService.Save(this.projectTransfarmer.ProjectTransfarmer(this.project)).subscribe(
        (par) => {         
          if (par.status === 'Inserted') {
            console.log(par.status);
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['ProjectList']);
          }   else {
            this.defaultLayoutComponent.Massage('',
              'Somethig Wrong', 'modal-info');
          }
        }
      );    

    } else {
      console.log(this.projectTransfarmer.ProjectTransfarmer(this.project));
      this.projectService.Update(this.projectTransfarmer.ProjectTransfarmer(this.project)).subscribe(
        (par) => {
          console.log(par);
          if (par.status === 'Updated') {
            console.log(par.status);
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['ProjectList']);
          }   else {
            this.defaultLayoutComponent.Massage('',
              'Somethig Wrong', 'modal-danger');
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
        accessType : null,
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
        accessType : null,
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
        accessType : null,
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