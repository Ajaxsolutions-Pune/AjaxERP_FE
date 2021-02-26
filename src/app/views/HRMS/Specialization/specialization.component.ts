import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Specialization, SpecializationEntity } from '../../../Components/Module/HRMS/Specialization.model';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import { SpecializationService } from '../../../Components/Services/HRMS/SpecializationService';
import { SpecializationTransfarmer } from '../../../Components/Transformer/HRMS/Specialization-Transfarmer';
import { DefaultLayoutComponent } from '../../../containers';
import { SpecializationAsyncValidator } from '../../../helper/async-validator';
import { CrossFieldErrorMatcher } from '../../Masters/AngularDemo/infrastructure/cross-field-error-matcher';
import { FormComponentBase } from '../../Masters/AngularDemo/infrastructure/form-component-base';

@Component({
  selector: 'app-specialization',
  templateUrl: './specialization.component.html',
  styleUrls: ['./specialization.component.scss']
})
export class SpecializationComponent extends FormComponentBase implements OnInit, AfterViewInit {
  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  specializationobj: Specialization;
  specializationEntity: SpecializationEntity;
  str: string;

  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private specializationService: SpecializationService,
    private specializationTransfarmer: SpecializationTransfarmer,
    private globalService: GlobalService,
    private router: Router,
    private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlSpecializationode: {
        required: 'Specialization Code is required.',
      },
      ControlSpecializationStatus: {
        required: 'Specialization  Status is required.',
      },

      ControlSpecializationName: {
        required: 'Specialization  Name  is required.',
      },
      ControlSpecializationDiscription: {
        required: 'Specialization  Description  is required.',
      },
    };
    this.formErrors = {
      ControlSpecializationName: '',
    };

  }
  isSpecializationExist(): boolean {
    return this.form.get('ControlSpecializationName').hasError('queExist');
  }

  selectAnswersEvent(item) {
    const selectedData = {
      value: item.id,
      text: item.name
    };
    this.specializationobj.specializationName = selectedData.text;
  }

  ngOnInit() {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';
    }
    status = '';
    this.specializationobj = {
      ouCode: '12',
      specializationName: null,
      specializationDesc: null,
      specializationCode: null,
      specializationStatus: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    this.route.paramMap.subscribe(parameterMap => {
      const str = parameterMap.get('id');
      this.getSpecialization(str);
      this.form = this.formBuilder.group({
        ControlSpecializationCode: ['', []],
        ControlSpecializationName: ['', [Validators.required], [SpecializationAsyncValidator(this.specializationService, str)]],
        ControlSpecializationStatus: ['', []],
        ControlSpecializationDiscription: ['', [Validators.required]],

      });
      this.form.controls['ControlSpecializationCode'].disable();
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
    this.specializationobj.createdBy = localStorage.getItem('username');
    this.specializationobj.createdDate = this.globalService.GerCurrntDateStamp();
    this.specializationobj.modifiedBy = localStorage.getItem('username');
    this.specializationobj.modifiedDate = this.globalService.GerCurrntDateStamp();

    if (status !== 'Update') {
      this.specializationobj.specializationCode = null;
      console.log(this.specializationTransfarmer.SpecializationTransfarmer(this.specializationobj));
      this.specializationService.Save(this.specializationTransfarmer.SpecializationTransfarmer(this.specializationobj)).subscribe(
        (par) => {

          if (par.status === 'Inserted') {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['SpecializationList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );

    } else {
      this.specializationService.Update(this.specializationTransfarmer.SpecializationTransfarmer(this.specializationobj)).subscribe(

        (par) => {
          if (par.status === 'Updated') {
            this.defaultLayoutComponent.Massage('',
              'Data updated successfully !', 'modal-info');
            this.router.navigate(['SpecializationList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );
    }
  }

  private getSpecialization(id: string) {
    this.specializationobj = {
      ouCode: '12',
      specializationName: null,
      specializationDesc: null,
      specializationCode: null,
      specializationStatus: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    if (id === null || id === '') {
      this.specializationobj = {
        ouCode: '12',
        specializationName: null,
        specializationDesc: null,
        specializationCode: null,
        specializationStatus: 'true',
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
      };
      status = '';

    } else {
      this.specializationService.getSpecialization(id).subscribe(

        (par) => {
          console.log(par);
          this.specializationEntity = par;
          this.specializationobj = this.specializationTransfarmer.SpecializationTransfarmerEntity(this.specializationEntity);

        },
        (err: any) => console.log(err));
      status = 'Update';
    }
  }
}


