import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
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
import { projectAsyncValidator } from '../../../helper/async-validator';
import { Employee } from '../../../Components/Module/Masters/Employee.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common'

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
  employeeDrp: Employee[];
  StartDate: Date;
  EndDate: Date;
  startDate: Date;
  endDate: Date;
  constructor(private route: ActivatedRoute,
    private projectTransfarmer: ProjectTransfarmer,
    private projectService: ProjectService,
    private globalService: GlobalService,
    private httpClient: HttpClient,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private router: Router,
    private formBuilder: FormBuilder,
    private datepipe: DatePipe
  ) {
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

  isQueExist(): boolean {
    return this.form.get('ControlProject').hasError('queExist');
  }

  special_char_val(event) {
    let k;
    k = event.charCode;
    return this.globalService.SpecialCharValidator(k);

  }

  only_number_val(event) {
    let k;
    k = event.charCode;
    return this.globalService.NumberValidator(k);
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
        console.log(par);
        this.employeeDrp = par;
      },
      (err: any) => console.log(err));

    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';
    }
    status = '';
    this.project = {
      ouCode: '12',
      projectName: null,
      projectCode: null,
      projectDescription: null,
      startDate: null,
      endDate: null,
      projectTypeCode: null,
      projectGroupCode: null,
      customerCode: null,
      projectManagerCode: null,
      priority: null,
      timesheetRequired: 'true',
      mainAccountHeadCode: null,
      budget: null,
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };



    this.route.paramMap.subscribe(parameterMap => {
      const str = parameterMap.get('id');
      this.getproject(str);

      this.form = this.formBuilder.group({
        ControlProjectID: ['', [Validators.required]],
        ControlisActive: ['', []],
        ControlProjectDesc: ['', []],
        ControlStartDate: ['', []],
        ControlEndDate: ['', []],
        ControlAccessType: ['', []],
        ControlPriority: ['', []],
        ControlisTimesheetRequire: ['', []],
        ControlAccountCode: ['', []],
        ControlBudget: ['', []],
        ControlProjectType: ['', []],
        ControlProjectGroup: ['', []],
        ControlProjectManager: ['', []],
        ControlProject: ['', [Validators.required], [projectAsyncValidator(this.projectService, str)]]
      });
      this.form.controls['ControlProjectID'].disable();


    });
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

  Date_char_val(event) {
    let k;
    k = event.charCode;
    return false;
    
  }
  save(projectForm: NgForm): void {
    console.log(this.startDate);
    this.project.createdBy = localStorage.getItem('username');
    this.project.createdDate = this.globalService.GerCurrntDateStamp();
    this.project.modifiedBy = localStorage.getItem('username');
    this.project.modifiedDate = this.globalService.GerCurrntDateStamp();

    this.StartDate = new Date(this.startDate);
    this.project.startDate = this.datepipe.transform(this.StartDate, 'yyyy-MM-dd');

    this.EndDate = new Date(this.endDate);
    this.project.endDate = this.datepipe.transform(this.EndDate, 'yyyy-MM-dd');

    if (this.project.projectDescription == null) {
      this.project.projectDescription = "";
    }

    if (status !== 'Update') {
      this.project.projectCode = null;
      this.projectService.Save(this.projectTransfarmer.ProjectTransfarmer(this.project)).subscribe(
        (par) => {
          if (par.status === 'Inserted') {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['ProjectList']);
          } else {
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
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-danger');
          }
        }
      );
    }
  }


  private getproject(project_Code: string) {
    this.project = {
      ouCode: null,
      projectName: null,
      projectCode: null,
      projectDescription: null,
      startDate: null,
      endDate: null,
      projectTypeCode: null,
      projectGroupCode: null,
      customerCode: null,
      projectManagerCode: null,
      priority: null,
      timesheetRequired: 'true',
      mainAccountHeadCode: null,
      budget: null,
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };




    if (project_Code === null || project_Code === '') {
      this.project = {
        ouCode: '12',
        projectName: null,
        projectCode: null,
        projectDescription: null,
        startDate: null,
        endDate: null,
        projectTypeCode: null,
        projectGroupCode: null,
        customerCode: null,
        projectManagerCode: null,
        priority: null,
        timesheetRequired: 'true',
        mainAccountHeadCode: null,
        budget: null,
        isActive: 'true',
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
      };
      status = '';

    } else {
      this.projectEntity = {
        ouCode: '12',
        projectName: null,
        projectCode: null,
        projectDescription: null,
        startDate: null,
        endDate: null,
        projectTypeCode: null,
        projectGroupCode: null,
        customerCode: null,
        projectManagerCode: null,
        priority: null,
        timesheetRequired: 'true',
        mainAccountHeadCode: null,
        budget: null,
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
          // this.endDate = new FormControl(new Date(this.project.endDate), Validators.required);
         // this.startDate = new FormControl(new Date(this.project.startDate), Validators.required);
         this.startDate = new Date(this.project.startDate);
         this.endDate = new Date(this.project.endDate);
        },
        (err: any) => console.log(err));
      status = 'Update';



    }
  }
}