import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Region } from '../../../Compound/Module/Masters/Region.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../containers/default-layout/default-layout.component';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';
import { CrossFieldErrorMatcher } from '../AngularDemo/infrastructure/cross-field-error-matcher';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent extends FormComponentBase implements OnInit, AfterViewInit {

  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  bindObj: Region;
  str: string;
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent, private router: Router,
    private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlregionCode: {
        required: 'Zone Code is required.',
      },
      ControlregionNameENG: {
        required: 'Region Name ENG is required.',
      },
      ControlzregionNameUNI: {
        required: 'Region Name UNI is required.',
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
      ControlregionCode: ['', []],
      ControlregionNameENG: ['', [
        Validators.required]],
        ControlregionNameUNI: ['', []],
      ControlisActive: ['', []],
    });
    this.form.controls['ControlregionCode'].disable();
    status = '';
    this.bindObj = {
      regionCode: null,
      regionNameENG: null,
      regionNameUNI: null,
      isActive: null
    };
    this.route.paramMap.subscribe(parameterMap => { const str = parameterMap.get('id'); this.getquestion(str); });
  }
  save(ObjForm: NgForm): void {
  }

  private getquestion(Question_Code: string) {
  }
}
