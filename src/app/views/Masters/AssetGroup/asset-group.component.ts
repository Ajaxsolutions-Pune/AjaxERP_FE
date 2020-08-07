import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { AssetGroup, AssetGroupEntity } from '../../../Compound/Module/Masters/AssetGroup.model';
import { Router } from '@angular/router';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
