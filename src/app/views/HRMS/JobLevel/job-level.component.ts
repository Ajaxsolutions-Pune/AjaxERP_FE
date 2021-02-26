import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormComponentBase } from '../../Masters/AngularDemo/infrastructure/form-component-base';
import { CrossFieldErrorMatcher } from '../../Masters/AngularDemo/infrastructure/cross-field-error-matcher';
import { JobLevel, JobLevelEntity } from '../../../Components/Module/HRMS/JobLevel.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../containers';
import { JobLevelService } from '../../../Components/Services/HRMS/JobLevelService';
import { JobLevelTransfarmer } from '../../../Components/Transformer/HRMS/JobLevel-Transfarmer';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import { JobLevelAsyncValidator } from '../../../helper/async-validator';

@Component({
  selector: 'app-job-level',
  templateUrl: './job-level.component.html',
  styleUrls: ['./job-level.component.scss']
})
export class JobLevelComponent extends FormComponentBase implements OnInit, AfterViewInit {
  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  jobLevelobj: JobLevel;
  jobLevelEntity: JobLevelEntity;
  jobLeveldrp: JobLevel[];
  str: string;
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private jobLevelService: JobLevelService,
    private jobLevelTransfarmer: JobLevelTransfarmer,
    private globalService: GlobalService,
    private router: Router,
    private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlJobLevelCode: {
        required: 'Job Level Code is required.',
      },
      ControlJobLevelStatus: {
        required: 'Job Level Status is required.',
      },

      ControlJobLevelName: {
        required: 'Job Level Name  is required.',
      },
      ControlReportingJobLevel: {
        required: 'Reporting Job Level  is required.',
      },
    };
    this.formErrors = {
      ControlJobLevelName: '',
    };
  }
  isJobLevelExist(): boolean {
    return this.form.get('ControlJobLevelName').hasError('queExist');
  }
  selectAnswersEvent(item) {
    const selectedData = {
      value: item.id,
      text: item.name
    };
    this.jobLevelobj.jobLevelName = selectedData.text;
  }


  ngOnInit(): void {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';
    }
    status = '';
    this.jobLevelobj = {
      ouCode: '12',
      jobLevelName: null,
      jobLevelCode: null,
      reportingJobLevel: null,
      jobLevelStatus: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    this.route.paramMap.subscribe(parameterMap => {
      const str = parameterMap.get('id');
      this.getJobLevel(str);
      this.form = this.formBuilder.group({
        ControlJobLevelCode: ['', []],
        ControlJobLevelName: ['', [Validators.required], [JobLevelAsyncValidator(this.jobLevelService, str)]],
        ControlJobLevelStatus: ['', [Validators.required]],
        ControlReportingJobLevel: ['', [Validators.required]],

      });
      this.form.controls['ControlJobLevelCode'].disable();
    });
    this.jobLevelService.fillDrpjobLevels().subscribe(par => {
      this.jobLeveldrp = this.jobLevelTransfarmer.JobLevelTransfarmers(par);
      console.log(this.jobLeveldrp);
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
    this.jobLevelobj.createdBy = localStorage.getItem('username');
    this.jobLevelobj.createdDate = this.globalService.GerCurrntDateStamp();
    this.jobLevelobj.modifiedBy = localStorage.getItem('username');
    this.jobLevelobj.modifiedDate = this.globalService.GerCurrntDateStamp();

    if (status !== 'Update') {
      this.jobLevelobj.jobLevelCode = null;
      console.log(this.jobLevelTransfarmer.JobLevelTransfarmer(this.jobLevelobj));
      this.jobLevelService.Save(this.jobLevelTransfarmer.JobLevelTransfarmer(this.jobLevelobj)).subscribe(
        (par) => {

          if (par.status === 'Inserted') {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['JobLevelList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );

    } else {
      this.jobLevelService.Update(this.jobLevelTransfarmer.JobLevelTransfarmer(this.jobLevelobj)).subscribe(

        (par) => {
          if (par.status === 'Updated') {
            this.defaultLayoutComponent.Massage('',
              'Data updated successfully !', 'modal-info');
            this.router.navigate(['JobLevelList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );
    }
  }

  private getJobLevel(id: string) {
    this.jobLevelobj = {
      ouCode: '12',
      jobLevelName: null,
      jobLevelCode: null,
      reportingJobLevel: null,
      jobLevelStatus: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    if (id === null || id === '') {
      this.jobLevelobj = {
        ouCode: '12',
        jobLevelName: null,
        jobLevelCode: null,
        reportingJobLevel: null,
        jobLevelStatus: 'true',
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
      };
      status = '';

    } else {
      this.jobLevelService.getJobLevel(id).subscribe(

        (par) => {
          console.log(par);
          this.jobLevelEntity = par;
          this.jobLevelobj = this.jobLevelTransfarmer.JobLevelTransfarmerEntity(this.jobLevelEntity);
        },
        (err: any) => console.log(err));
      status = 'Update';
    }
  }
}