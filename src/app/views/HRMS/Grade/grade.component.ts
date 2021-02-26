import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Grade, GradeEntity } from '../../../Components/Module/HRMS/Grade.model';
import { GradeSet } from '../../../Components/Module/HRMS/GradeSet.model';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import { GradeService } from '../../../Components/Services/HRMS/GradeService';
import { GradeSetService } from '../../../Components/Services/HRMS/GradeSetService';
import { GradeTransfarmer } from '../../../Components/Transformer/HRMS/Grade-Transfarmer';
import { GradeSetTransfarmer } from '../../../Components/Transformer/HRMS/GradeSet-Transfarmer';
import { DefaultLayoutComponent } from '../../../containers';
import { CrossFieldErrorMatcher } from '../../Masters/AngularDemo/infrastructure/cross-field-error-matcher';
import { FormComponentBase } from '../../Masters/AngularDemo/infrastructure/form-component-base';
import { DatePipe } from '@angular/common';
import { GradeAsyncValidator } from '../../../helper/async-validator';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss']
})
export class GradeComponent extends FormComponentBase implements OnInit, AfterViewInit {
  Gradeform1!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  gradeobj: Grade;
  gradeEntity: GradeEntity;
  gradeSetdrp: GradeSet[];
  str: string;
  startDate: Date;

  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private gradeService: GradeService,
    private gradeTransfarmer: GradeTransfarmer,
    private gradeSetService: GradeSetService,
    private gradeSetTransfarmer: GradeSetTransfarmer,
    private globalService: GlobalService,
    private router: Router,
    private datepipe: DatePipe,
    private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {

      ControlGradeName: {
        required: 'Grade Name is required.',
      },
      ControlGradeDescription: {
        required: 'Grade Description is required.'
      }


    };
    this.formErrors = {
      ControlGradeName: '',
    };

  }
  isGradeExist(): boolean {
    return this.Gradeform1.get('ControlGradeName').hasError('queExist');
  }

  selectAnswersEvent(item) {
    const selectedData = {
      value: item.id,
      text: item.name
    };
    this.gradeobj.gradeSetName = selectedData.text;
  }
  ngOnInit() {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';

    }
    status = '';
    this.gradeobj = {
      ouCode: '12',
      gradeSetName: null,
      gradeSetCode: null,
      gradeCode: null,
      gradeName: null,
      gradeStatus: 'true',
      gradeDescription: null,
      startDate: null,
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    this.route.paramMap.subscribe(parameterMap => {
      const str = parameterMap.get('id');
      this.getGrade(str);
      this.Gradeform1 = this.formBuilder.group({
        ControlGradeName: ['', [Validators.required], [GradeAsyncValidator(this.gradeService, str)]],
        ControlGradeCode: ['', []],
        ControlGradeSetCode: ['', []],
        ControlStartDate: ['', [Validators.required]],
        ControlGradeSetName: ['', [Validators.required]],
        ControlgradeStatus: ['', []],
        ControlGradeDescription: ['', [Validators.required]],

      });
      this.Gradeform1.controls['ControlGradeCode'].disable();
    });
    this.gradeSetService.fillDrpgradesets().subscribe(par => {
      this.gradeSetdrp = this.gradeSetTransfarmer.GradeSetTransfarmers(par);
      console.log(this.gradeSetdrp);
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
    this.startControlMonitoring(this.Gradeform1);
  }
  registerClicked(): void {
    if (this.Gradeform1.invalid) {
      return;
    }
    alert('Registration Complete');
  }

  save(): void {
    this.gradeobj.createdBy = localStorage.getItem('username');
    this.gradeobj.createdDate = this.globalService.GerCurrntDateStamp();
    this.gradeobj.modifiedBy = localStorage.getItem('username');
    this.gradeobj.modifiedDate = this.globalService.GerCurrntDateStamp();
    // this.gradesetobj.ouCode = '12';
    // this.gradesetobj.startDate = "";
    this.gradeobj.startDate = this.datepipe.transform(this.startDate, 'yyyy-MM-dd');

    if (status !== 'Update') {
      this.gradeobj.gradeCode = null;
      console.log(this.gradeTransfarmer.GradeTransfarmer(this.gradeobj));
      this.gradeService.Save(this.gradeTransfarmer.GradeTransfarmer(this.gradeobj)).subscribe(
        (par) => {

          if (par.status === 'Inserted') {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['GradeList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );

    } else {
      this.gradeService.Update(this.gradeTransfarmer.GradeTransfarmer(this.gradeobj)).subscribe(

        (par) => {
          if (par.status === 'Updated') {
            this.defaultLayoutComponent.Massage('',
              'Data updated successfully !', 'modal-info');
            this.router.navigate(['GradeList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );
    }
  }

  private getGrade(id: string) {
    this.gradeobj = {
      ouCode: '12',
      gradeSetName: null,
      gradeSetCode: null,
      gradeCode: null,
      gradeName: null,
      gradeStatus: 'true',
      gradeDescription: null,
      startDate: null,
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    if (id === null || id === '') {
      this.gradeobj = {
        ouCode: '12',
        gradeSetName: null,
        gradeSetCode: null,
        gradeCode: null,
        gradeName: null,
        gradeStatus: 'true',
        gradeDescription: null,
        startDate: null,
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
      };
      status = '';

    } else {
      this.gradeService.getGrade(id).subscribe(

        (par) => {
          console.log(par);
          this.gradeEntity = par;
          this.gradeobj = this.gradeTransfarmer.GradeTransfarmerEntity(this.gradeEntity);
          this.startDate = new Date(this.gradeobj.startDate);
        },
        (err: any) => console.log(err));
      status = 'Update';
    }
  }
}
