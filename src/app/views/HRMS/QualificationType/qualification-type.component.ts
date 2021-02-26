import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormComponentBase } from '../../Masters/AngularDemo/infrastructure/form-component-base';
import { CrossFieldErrorMatcher } from '../../Masters/AngularDemo/infrastructure/cross-field-error-matcher';
import { QualificationType, QualificationTypeEntity } from '../../../Components/Module/HRMS/QualificationType.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../containers';
import { QualificationTypeService } from '../../../Components/Services/HRMS/QualificationTypeService';
import { QualificationTypeTransfarmer } from '../../../Components/Transformer/HRMS/QualificationType-Transfarmer';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import { QualificationTypeAsyncValidator } from '../../../helper/async-validator';

@Component({
  selector: 'app-qualification-type',
  templateUrl: './qualification-type.component.html',
  styleUrls: ['./qualification-type.component.scss']
})
export class QualificationTypeComponent extends FormComponentBase implements OnInit, AfterViewInit {
  form: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  qualificationTypeobj: QualificationType;
  qualificationTypeEntity: QualificationTypeEntity;
  str: string;

  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private qualificationTypeService: QualificationTypeService,
    private qualificationTypeTransfarmer: QualificationTypeTransfarmer,
    private globalService: GlobalService,
    private router: Router,
    private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlQualificationTypeCode: {
        required: 'Qualification Type Code is required.',
      },
      ControlQualificationTypeStatus: {
        required: 'Qualification Type  Status is required.',
      },

      ControlQualificationTypeName: {
        required: 'Qualification Type  Name  is required.',
      },
      ControlQualificationTypeDiscription: {
        required: 'Qualification Type  Description  is required.',
      },
    };
    this.formErrors = {
      ControlQualificationTypeName: '',
    };
  }
  isQualificationTypeExist(): boolean {
    return this.form.get('ControlQualificationTypeName').hasError('queExist');
  }

  selectAnswersEvent(item) {
    const selectedData = {
      value: item.id,
      text: item.name
    };
    this.qualificationTypeobj.qualificationTypeName = selectedData.text;
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';
    }
    status = '';
    this.qualificationTypeobj = {
      ouCode: '12',
      qualificationTypeName: null,
      qualificationTypeDesc: null,
      qualificationTypeCode: null,
      qualificationTypeStatus: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    this.route.paramMap.subscribe(parameterMap => {
      const str = parameterMap.get('id');
      this.getQualificationType(str);
      this.form = this.formBuilder.group({
        ControlQualificationTypeCode: ['', []],
        ControlQualificationTypeName: ['', [Validators.required], [QualificationTypeAsyncValidator(this.qualificationTypeService, str)]],
        ControlQualificationTypeDiscription: ['', [Validators.required]],
        ControlQualificationTypeStatus: ['', []],
      });
      this.form.controls['ControlQualificationTypeCode'].disable();
    });
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
    this.qualificationTypeobj.createdBy = localStorage.getItem('username');
    this.qualificationTypeobj.createdDate = this.globalService.GerCurrntDateStamp();
    this.qualificationTypeobj.modifiedBy = localStorage.getItem('username');
    this.qualificationTypeobj.modifiedDate = this.globalService.GerCurrntDateStamp();

    if (status !== 'Update') {
      this.qualificationTypeobj.qualificationTypeCode = null;
      console.log(this.qualificationTypeTransfarmer.QualificationTypeTransfarmer(this.qualificationTypeobj));
      this.qualificationTypeService.Save(this.qualificationTypeTransfarmer.QualificationTypeTransfarmer(this.qualificationTypeobj)).subscribe(
        (par) => {

          if (par.status === 'Inserted') {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['QualificationTypeList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );

    } else {
      this.qualificationTypeService.Update(this.qualificationTypeTransfarmer.QualificationTypeTransfarmer(this.qualificationTypeobj)).subscribe(

        (par) => {
          if (par.status === 'Updated') {
            this.defaultLayoutComponent.Massage('',
              'Data updated successfully !', 'modal-info');
            this.router.navigate(['QualificationTypeList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );
    }
  }

  private getQualificationType(id: string) {
    this.qualificationTypeobj = {
      ouCode: '12',
      qualificationTypeName: null,
      qualificationTypeDesc: null,
      qualificationTypeCode: null,
      qualificationTypeStatus: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    if (id === null || id === '') {
      this.qualificationTypeobj = {
        ouCode: '12',
        qualificationTypeName: null,
        qualificationTypeDesc: null,
        qualificationTypeCode: null,
        qualificationTypeStatus: 'true',
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
      };
      status = '';

    } else {
      this.qualificationTypeService.getQualificationType(id).subscribe(

        (par) => {
          console.log(par);
          this.qualificationTypeEntity = par;
          this.qualificationTypeobj = this.qualificationTypeTransfarmer.QualificationTypeTransfarmerEntity(this.qualificationTypeEntity);

        },
        (err: any) => console.log(err));
      status = 'Update';
    }
  }
}




