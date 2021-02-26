import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormComponentBase } from '../../Masters/AngularDemo/infrastructure/form-component-base';
import { CrossFieldErrorMatcher } from '../../Masters/AngularDemo/infrastructure/cross-field-error-matcher';
import { QualificationLevel, QualificationLevelEntity } from '../../../Components/Module/HRMS/QualificationLevel.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../containers';
import { QualificationLevelService } from '../../../Components/Services/HRMS/QualificationLevelService';
import { QualificationLevelTransfarmer } from '../../../Components/Transformer/HRMS/QualificationLevel-Transfarmer';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import { DatePipe } from '@angular/common';
import { QualificationLevelAsyncValidator } from '../../../helper/async-validator';

@Component({
  selector: 'app-qualification-level',
  templateUrl: './qualification-level.component.html',
  styleUrls: ['./qualification-level.component.scss']
})
export class QualificationLevelComponent extends FormComponentBase implements OnInit, AfterViewInit {
  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  qualificationLevelobj: QualificationLevel;
  qualificationLevelEntity: QualificationLevelEntity;
  str: string;
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private qualificationLevelService: QualificationLevelService,
    private qualificationLevelTransfarmer: QualificationLevelTransfarmer,
    private globalService: GlobalService,
    private router: Router,
    // private datepipe: DatePipe,
    private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlQualificationLevelCode: {
        required: 'Qualification Level Code is required.',
      },
      ControlQualificationLevelStatus: {
        required: 'Qualification Level Status is required.',
      },

      ControlQualificationLevelName: {
        required: 'Qualification Level Name  is required.',
      },
      ControlQualificationLevelDiscription: {
        required: 'Qualification Level Description is required.'
      }
    };
    this.formErrors = {
      ControlQualificationLevelName: '',
    };
  }
  isQualificationLevelExist(): boolean {
    return this.form.get('ControlQualificationLevelName').hasError('queExist');
  }

  selectAnswersEvent(item) {
    const selectedData = {
      value: item.id,
      text: item.name
    };
    this.qualificationLevelobj.qualificationLevelName = selectedData.text;
  }


  ngOnInit() {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';
    }
    status = '';
    this.qualificationLevelobj = {
      ouCode: '12',
      qualificationLevelName: null,
      qualificationLevelDesc: null,
      qualificationLevelCode: null,
      qualificationLevelStatus: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    this.route.paramMap.subscribe(parameterMap => {
      const str = parameterMap.get('id');
      this.getQualificationLevel(str);
      this.form = this.formBuilder.group({
        ControlQualificationLevelCode: ['', []],
        ControlQualificationLevelName: ['', [Validators.required], [QualificationLevelAsyncValidator(this.qualificationLevelService, str)]],
        // ControlPositionDiscription:['',[Validators.required]],
        ControlQualificationLevelStatus: ['', []],
        ControlQualificationLevelDiscription: ['', [Validators.required]],

      });
      this.form.controls['ControlQualificationLevelCode'].disable();
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
    this.qualificationLevelobj.createdBy = localStorage.getItem('username');
    this.qualificationLevelobj.createdDate = this.globalService.GerCurrntDateStamp();
    this.qualificationLevelobj.modifiedBy = localStorage.getItem('username');
    this.qualificationLevelobj.modifiedDate = this.globalService.GerCurrntDateStamp();

    if (status !== 'Update') {
      this.qualificationLevelobj.qualificationLevelCode = null;
      console.log(this.qualificationLevelTransfarmer.QualificationLevelTransfarmer(this.qualificationLevelobj));
      this.qualificationLevelService.Save(this.qualificationLevelTransfarmer.QualificationLevelTransfarmer(this.qualificationLevelobj)).subscribe(
        (par) => {

          if (par.status === 'Inserted') {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['QualificationLevelList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );

    } else {
      this.qualificationLevelService.Update(this.qualificationLevelTransfarmer.QualificationLevelTransfarmer(this.qualificationLevelobj)).subscribe(

        (par) => {
          if (par.status === 'Updated') {
            this.defaultLayoutComponent.Massage('',
              'Data updated successfully !', 'modal-info');
            this.router.navigate(['QualificationLevelList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );
    }
  }

  private getQualificationLevel(id: string) {
    this.qualificationLevelobj = {
      ouCode: '12',
      qualificationLevelName: null,
      qualificationLevelDesc: null,
      qualificationLevelCode: null,
      qualificationLevelStatus: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    if (id === null || id === '') {
      this.qualificationLevelobj = {
        ouCode: '12',
        qualificationLevelName: null,
        qualificationLevelDesc: null,
        qualificationLevelCode: null,
        qualificationLevelStatus: 'true',
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
      };
      status = '';

    } else {
      this.qualificationLevelService.getQualificationLevel(id).subscribe(

        (par) => {
          console.log(par);
          this.qualificationLevelEntity = par;
          this.qualificationLevelobj = this.qualificationLevelTransfarmer.QualificationLevelTransfarmerEntity(this.qualificationLevelEntity);

        },
        (err: any) => console.log(err));
      status = 'Update';
    }
  }
}

