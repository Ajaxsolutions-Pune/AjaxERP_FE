import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Zone, ZoneEntity } from '../../../Components/Module/Masters/Zone.model';
import { DefaultLayoutComponent } from '../../../containers/default-layout';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';
import { CrossFieldErrorMatcher } from '../AngularDemo/infrastructure/cross-field-error-matcher';
import { ZoneService } from '../../../Components/Services/Masters/ZoneService';
import { ZoneTransfarmer } from '../../../Components/Transformer/Masters/ZoneTransfarmer';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import { questionAsyncValidator, zoneAsyncValidator } from '../../../helper/async-validator';
@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent extends FormComponentBase implements OnInit, AfterViewInit {

  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  bindObj: Zone;
  bindEntity: ZoneEntity;
  str: string;
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private router: Router,
    private globalService: GlobalService,
    private zoneTransfarmer: ZoneTransfarmer,
    private zoneService: ZoneService,
    private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlzoneCode: {
        required: 'Zone Code is required.',
      },
      ControlzoneNameENG: {
        required: 'Zone Name is required.',
      },
      ControlzoneNameUNI: {
        required: 'Zone Name UNI is required.',
      }
    };
    this.formErrors = {
      ControlisActive: '',
    };
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
    }, 250);
    this.startControlMonitoring(this.form);
  }
  isZoneExist(): boolean {
    return this.form.get('ControlzoneNameENG').hasError('queExist');
  }
  special_char_val(event) {
    let k;
    k = event.charCode;
    return this.globalService.SpecialCharValidator(k);
    
  }
  ngOnInit() {
    this.bindObj = {
      zoneCode: null,
      zoneNameENG: null,
      zoneNameUNI: null,
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';
    }
    status = '';
    this.route.paramMap.subscribe(parameterMap => {
      const str = parameterMap.get('id');
      this.getquestion(str);
    });
    this.form = this.formBuilder.group({
      ControlzoneCode: ['', []],
      ControlzoneNameENG: ['', [Validators.required],
        [zoneAsyncValidator(this.zoneService,
          '1')]],
      ControlzoneNameUNI: ['', []],
      ControlisActive: ['', []],
    });
    this.form.controls['ControlzoneCode'].disable();
  }
  save(zoneForm: NgForm): void {
    if (status !== 'Update') {
      this.bindObj.zoneCode = null;
      this.zoneService.Save(this.zoneTransfarmer.ZoneTransfarmer(this.bindObj)).subscribe(
        (par) => {
          if (par.status === 'Inserted') {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['ZoneList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );

    } else {
      this.zoneService.Update(this.zoneTransfarmer.ZoneTransfarmer(this.bindObj)).subscribe(
        (par) => {
          if (par.status === 'Updated') {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['ZoneList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );
    }
  }

  private getquestion(Question_Code: string) {
    this.bindObj = {
      zoneCode: null,
      zoneNameENG: null,
      zoneNameUNI: null,
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    if (Question_Code === null || Question_Code === '') {
      this.bindObj = {
        zoneCode: null,
        zoneNameENG: null,
        zoneNameUNI: null,
        isActive: 'true',
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
      };
    } else {
      this.zoneService.getZone(Question_Code).subscribe(
        (par) => {
          this.bindEntity = par;
          this.bindObj = this.zoneTransfarmer.ZoneTransfarmerEntity(this.bindEntity);
        },
        (err: any) => console.log(err));
      status = 'Update';
    }
  }
}
