import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { FormComponentBase } from '../../../Masters/AngularDemo/infrastructure/form-component-base';
import { CrossFieldErrorMatcher } from '../../../Masters/AngularDemo/infrastructure/cross-field-error-matcher';
import { Qualification, QualificationEntity } from '../../../../Components/Module/HRMS/Qualification.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../../containers';
import { QualificationService } from '../../../../Components/Services/HRMS/QualificationService';
import { QualificationTransfarmer } from '../../../../Components/Transformer/HRMS/Qualification-Transfarmer';
import { GlobalService } from '../../../../Components/Services/GlobalServices/Global.service';
//import { QualificationAsyncValidator } from '../../../../helper/async-validator';
import { QualificationLevel } from '../../../../Components/Module/HRMS/QualificationLevel.model';
import { QualificationLevelTransfarmer } from '../../../../Components/Transformer/HRMS/QualificationLevel-Transfarmer';
import { QualificationLevelService } from '../../../../Components/Services/HRMS/QualificationLevelService';
import { Specialization } from '../../../../Components/Module/HRMS/Specialization.model';
import { SpecializationService } from '../../../../Components/Services/HRMS/SpecializationService';
import { SpecializationTransfarmer } from '../../../../Components/Transformer/HRMS/Specialization-Transfarmer';
import { QualificationType } from '../../../../Components/Module/HRMS/QualificationType.model';
import { QualificationTypeService } from '../../../../Components/Services/HRMS/QualificationTypeService';
import { QualificationTypeTransfarmer } from '../../../../Components/Transformer/HRMS/QualificationType-Transfarmer';

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.css']
})

export class QualificationComponent extends FormComponentBase implements OnInit, AfterViewInit {
  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  qualificationobj: Qualification;
  qualificationEntity: QualificationEntity;
  qualificationLeveldrp: QualificationLevel[];
  specializationdrp: Specialization[];
  qualificationTypedrp: QualificationType[];
  str: string;

  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private qualificationService: QualificationService,
    private qualificationTransfarmer: QualificationTransfarmer,
    private qualificationLevelService: QualificationLevelService,
    private qualificationLevelTransfarmer: QualificationLevelTransfarmer,
    private specializationService: SpecializationService,
    private specializationTransfarmer: SpecializationTransfarmer,
    private qualificationTypeService: QualificationTypeService,
    private qualificationTypeTransfarmer: QualificationTypeTransfarmer,
    private globalService: GlobalService,
    private router: Router,
    private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlQualification_Name_Eng: {
        required: 'Qualification Name is required.',
      },
      ControlQualification_Description: {
        required: 'Qualification Description is required.'
      },
      ControlQualificationStatus: {
        required: 'Qualification Status is required.'
      }

    };
    this.formErrors = {
      ControlQualification_Name_Eng: '',
    };
  }
  isQualificationExist(): boolean {
    return this.form.get('ControlQualification_Name_Eng').hasError('queExist');
  }
  selectAnswersEvent(item) {
    const selectedData = {
      value: item.id,
      text: item.name
    };
    this.qualificationobj.qualificationName = selectedData.text;
  }



  ngOnInit() {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';

    }
    status = '';
    this.qualificationobj = {
      ouCode: '12',
      qualificationCode: null,
      qualificationName: null,
      qualificationDescription: null,
      qualificationLevel: null,
      specialization: null,
      qualificationType: null,
      qualificationStatus: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    this.route.paramMap.subscribe(parameterMap => {
      const str = parameterMap.get('id');
      this.getQualification(str);
      this.form = this.formBuilder.group({
        ControlQualificationCode: ['', []],
        ControlQualification_Name_Eng: ['', [Validators.required]],
        ControlQualification_Description: ['', [Validators.required]],
        ControlQualificationLevelCode: ['', []],
        ControlSpecialization: ['', [Validators.required]],
        ControlQualificationType: ['', [Validators.required]],
        ControlQualificationStatus: ['', []],
      });

      this.form.controls['ControlQualificationCode'].disable();
    });

    this.qualificationLevelService.fillDrpqualificationLevels().subscribe(par => {
      this.qualificationLeveldrp = this.qualificationLevelTransfarmer.QualificationLevelTransfarmers(par);
      console.log(this.qualificationLeveldrp);
    },
      (err: any) => console.log(err));

    this.specializationService.fillDrpspecializations().subscribe(par => {
      this.specializationdrp = this.specializationTransfarmer.SpecializationTransfarmers(par);
      console.log(this.specializationdrp);
    },
      (err: any) => console.log(err));

    this.qualificationTypeService.fillDrpqualificationTypes().subscribe(par => {
      this.qualificationTypedrp = this.qualificationTypeTransfarmer.QualificationTypeTransfarmers(par);
      console.log(this.qualificationTypedrp);
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
  save(form: NgForm): void {
    this.qualificationobj.createdBy = localStorage.getItem('username');
    this.qualificationobj.createdDate = this.globalService.GerCurrntDateStamp();
    this.qualificationobj.modifiedBy = localStorage.getItem('username');
    this.qualificationobj.modifiedDate = this.globalService.GerCurrntDateStamp();
    if (status !== 'Update') {
      this.qualificationobj.qualificationCode = null;
      console.log(this.qualificationTransfarmer.QualificationTransfarmer(this.qualificationobj));
      this.qualificationService.Save(this.qualificationTransfarmer.QualificationTransfarmer(this.qualificationobj)).subscribe(
        (par) => {

          if (par.status === 'Inserted') {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['QualificationList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );

    } else {
      this.qualificationService.Update(this.qualificationTransfarmer.QualificationTransfarmer(this.qualificationobj)).subscribe(

        (par) => {
          if (par.status === 'Updated') {
            this.defaultLayoutComponent.Massage('',
              'Data updated successfully !', 'modal-info');
            this.router.navigate(['QualificationList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );
    }
  }
  private getQualification(id: string) {
    this.qualificationobj = {
      ouCode: '12',
      qualificationCode: null,
      qualificationName: null,
      qualificationDescription: null,
      qualificationLevel: null,
      specialization: null,
      qualificationType: null,
      qualificationStatus: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    if (id === null || id === '') {
      this.qualificationobj = {
        ouCode: '12',
        qualificationCode: null,
        qualificationName: null,
        qualificationDescription: null,
        qualificationLevel: null,
        specialization: null,
        qualificationType: null,
        qualificationStatus: 'true',
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
      };
      status = '';

    } else {
      this.qualificationService.getQualification(id).subscribe(

        (par) => {
          console.log(par);
          this.qualificationEntity = par;
          this.qualificationobj = this.qualificationTransfarmer.QualificationTransfarmerEntity(this.qualificationEntity);
          // this.startDate = new Date(this.qualificationobj.startDate);
        },
        (err: any) => console.log(err));
      status = 'Update';
    }
  }

}