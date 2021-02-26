import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { FormComponentBase } from '../../Masters/AngularDemo/infrastructure/form-component-base';
import { CrossFieldErrorMatcher } from '../../Masters/AngularDemo/infrastructure/cross-field-error-matcher';
import { Job, JobEntity } from '../../../Components/Module/HRMS/Job.model';
import { Grade } from '../../../Components/Module/HRMS/Grade.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../containers';
import { GradeService } from '../../../Components/Services/HRMS/GradeService';
import { GradeTransfarmer } from '../../../Components/Transformer/HRMS/Grade-Transfarmer';
import { JobService } from '../../../Components/Services/HRMS/JobService';
import { JobTransfarmer } from '../../../Components/Transformer/HRMS/Job-Transfarmer';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import { DatePipe } from '@angular/common';
import { JobAsyncValidator } from '../../../helper/async-validator';
import { JobLevel } from '../../../Components/Module/HRMS/JobLevel.model';
import { JobLevelService } from '../../../Components/Services/HRMS/JobLevelService';
import { JobLevelTransfarmer } from '../../../Components/Transformer/HRMS/JobLevel-Transfarmer';


@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent extends FormComponentBase implements OnInit, AfterViewInit {
  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  jobobj: Job;
  jobEntity: JobEntity;
  gradedrp: Grade[];
  jobLeveldrp: JobLevel[];
  str: string;
  startDate: Date;

  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private gradeService: GradeService,
    private gradeTransfarmer: GradeTransfarmer,
    private jobService: JobService,
    private jobTransfarmer: JobTransfarmer,
    private jobLevelService: JobLevelService,
    private jobLevelTransfarmer: JobLevelTransfarmer,
    private globalService: GlobalService,
    private router: Router,
    private datepipe: DatePipe,
    private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlJobCode: {
        required: 'Job Code is required.',
      },
      ControlJobStatus: {
        required: 'Job Status is required.',
      },

      ControlGrade: {
        required: 'Grade is required.',
      },
      ControlStartDate: {
        required: 'Job Code is required.',
      },
      ControlJobName: {
        required: 'Job Name is required.',
      },
      ControlJobLevel: {
        required: 'Job Level is required.',
      }
    };
    this.formErrors = {
      ControlJobName: '',
    };
  }
  isJobExist(): boolean {
    return this.form.get('ControlJobName').hasError('queExist');
  }

  selectAnswersEvent(item) {
    const selectedData = {
      value: item.id,
      text: item.name
    };
    this.jobobj.jobName = selectedData.text;
  }
  ngOnInit() {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';

    }
    status = '';
    this.jobobj = {
      ouCode: '12',
      jobCode: null,
      jobName: null,
      jobProfile: null,
      gradeCode: null,
      jobDescription: null,
      startDate: null,
      jobLevel: null,
      jobStatus: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    this.route.paramMap.subscribe(parameterMap => {
      const str = parameterMap.get('id');
      this.getJob(str);
      this.form = this.formBuilder.group({
        ControlJobCode: ['', []],
        ControlJobName: ['', [Validators.required], [JobAsyncValidator(this.jobService, str)]],
        ControlJobDiscription: ['', [Validators.required]],
        ControlJobLevel: ['', []],
        ControlStartDate: ['', [Validators.required]],
        ControlJobStatus: ['', []],
        ControlGrade: ['', []],
        ControlJobProfile: ['', []],

      });

      this.form.controls['ControlJobCode'].disable();
    });
    this.gradeService.fillDrpgrades().subscribe(par => {
      this.gradedrp = this.gradeTransfarmer.GradeTransfarmers(par);
      //console.log(this.gradedrp);
    },
      (err: any) => console.log(err));
    this.jobLevelService.fillDrpjobLevels().subscribe(par => {
      this.jobLeveldrp = this.jobLevelTransfarmer.JobLevelTransfarmers(par);
      //  console.log(this.jobLeveldrp);
    },
      (err: any) => console.log(err));
  }
  special_char_val(event) {
    let k;
    k = event.charCode;
    return this.globalService.SpecialCharValidator(k);

  }
  ngAfterViewInit(): void {
    setTimeout(() => {
    }, 250);
    this.startControlMonitoring(this.form);
  }
  registerClicked(): void {
    if (this.form.invalid) {
      return;
    }
    alert('Registration Complete');
  }

  save(): void {
    this.jobobj.createdBy = localStorage.getItem('username');
    this.jobobj.createdDate = this.globalService.GerCurrntDateStamp();
    this.jobobj.modifiedBy = localStorage.getItem('username');
    this.jobobj.modifiedDate = this.globalService.GerCurrntDateStamp();
    this.jobobj.startDate = this.datepipe.transform(this.startDate, 'yyyy-MM-dd');

    if (status !== 'Update') {
      this.jobobj.jobCode = null;
      console.log(this.jobTransfarmer.JobTransfarmer(this.jobobj));
      this.jobService.Save(this.jobTransfarmer.JobTransfarmer(this.jobobj)).subscribe(
        (par) => {

          if (par.status === 'Inserted') {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['JobList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );

    } else {
      this.jobService.Update(this.jobTransfarmer.JobTransfarmer(this.jobobj)).subscribe(

        (par) => {
          if (par.status === 'Updated') {
            this.defaultLayoutComponent.Massage('',
              'Data updated successfully !', 'modal-info');
            this.router.navigate(['JobList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );
    }
  }

  private getJob(id: string) {
    this.jobobj = {
      ouCode: '12',
      jobCode: null,
      jobName: null,
      jobProfile: null,
      gradeCode: null,
      jobDescription: null,
      startDate: null,
      jobLevel: null,
      jobStatus: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    if (id === null || id === '') {
      this.jobobj = {
        ouCode: '12',
        jobCode: null,
        jobName: null,
        jobProfile: null,
        gradeCode: null,
        jobDescription: null,
        startDate: null,
        jobLevel: null,
        jobStatus: 'true',
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
      };
      status = '';

    } else {
      this.jobService.getJob(id).subscribe(

        (par) => {
          console.log(par);
          this.jobEntity = par;
          this.jobobj = this.jobTransfarmer.JobTransfarmerEntity(this.jobEntity);
          this.startDate = new Date(this.jobobj.startDate);
        },
        (err: any) => console.log(err));

      status = 'Update';
    }
  }
}


