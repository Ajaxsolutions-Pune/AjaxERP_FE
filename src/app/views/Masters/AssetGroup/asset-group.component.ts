import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { AssetGroup, AssetGroupEntity } from '../../../Compound/Module/Masters/AssetGroup.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';
import { CrossFieldErrorMatcher } from '../AngularDemo/infrastructure/cross-field-error-matcher';

@Component({
  selector: 'app-asset-group',
  templateUrl: './asset-group.component.html',
  styleUrls: ['./asset-group.component.scss']
})
export class AssetGroupComponent extends FormComponentBase implements OnInit, AfterViewInit {

  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  bindObj: AssetGroup;
  validationMessages: { ControlassetGroupCode:
    { required: string; }; ControlassetGroupNameENG: { required: string; }; ControlzregionNameUNI: { required: string; }; };
  formErrors: { ControlisActive: string; };
  constructor(private _router: Router,
    private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlassetGroupCode: {
        required: 'Asset Group Code is required.',
      },
      ControlassetGroupNameENG: {
        required: 'Asset Group Name ENG is required.',
      },
      ControlzregionNameUNI: {
        required: 'Asset Group Name UNI is required.',
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
  startControlMonitoring(form: FormGroup) {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      ControlassetGroupCode: ['', []],
      ControlassetGroupNameENG: ['', [
        Validators.required]],
        ControlassetGroupNameUNI: ['', []],
      ControlisActive: ['', []],
    });
    this.form.controls['ControlassetGroupCode'].disable();
    this.bindObj = {
      assetGroupCode: null,
      assetGroupNameENG: null,
      assetGroupNameUNI: null,
      isActive: null
    };
  }

  resultChanged(): void {
  }
}
