import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Zone } from '../../../Compound/Module/Masters/Zone.model';
import { DefaultLayoutComponent } from '../../../containers/default-layout';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';
import { CrossFieldErrorMatcher } from '../AngularDemo/infrastructure/cross-field-error-matcher';
import { ZoneService } from '../../../Compound/Services/Masters/ZoneService';
import { ZoneTransfarmer } from '../../../Compound/Transformer/Masters/ZoneTransfarmer';
@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent extends FormComponentBase implements OnInit, AfterViewInit {

  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  bindObj: Zone;
  str: string;
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private router: Router,
    private zoneTransfarmer: ZoneTransfarmer,
    private zoneService: ZoneService,
    private formBuilder: FormBuilder) {
    super();
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      this.router.navigate(['login']);
    }
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

  ngOnInit() {
    this.form = this.formBuilder.group({
      ControlzoneCode: ['', []],
      ControlzoneNameENG: ['', [
        Validators.required]],
      ControlzoneNameUNI: ['', []],
      ControlisActive: ['', []],
    });
    this.form.controls['ControlzoneCode'].disable();
    status = '';
    this.bindObj = {
      zoneCode: null,
      zoneNameENG: null,
      zoneNameUNI: null,
      isActive: null
    };
    this.route.paramMap.subscribe(parameterMap => { const str = parameterMap.get('id'); this.getquestion(str); });
  }
  save(zoneForm: NgForm): void {
    if (status !== 'Update') {
      this.bindObj.zoneCode = null;
      this.zoneService.Save(this.zoneTransfarmer.ZoneTransfarmer(this.bindObj)).subscribe(
        (par) => {
          console.log(par);
          zoneForm.reset();
          this.defaultLayoutComponent.Massage('Insert Sucsessfuly',
            'Data saved successfully !', 'modal-info');
          this.router.navigate(['ZoneList']);
        }
      );

    } else {
      this.zoneService.Update(this.zoneTransfarmer.ZoneTransfarmer(this.bindObj)).subscribe(
        () => {
          zoneForm.reset();
          this.defaultLayoutComponent.Massage('Insert Sucsessfuly',
            'Data saved successfully !', 'modal-info');
          this.router.navigate(['ZoneList']);
        }
      );
    }
  }

  private getquestion(Question_Code: string) {
  }
}
