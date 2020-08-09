import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { AssetCategory } from '../../../Compound/Module/Masters/AssetCategory.model';
import { Router } from '@angular/router';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrossFieldErrorMatcher } from '../AngularDemo/infrastructure/cross-field-error-matcher';

@Component({
  selector: 'app-asset-category',
  templateUrl: './asset-category.component.html',
  styleUrls: ['./asset-category.component.scss']
})
export class AssetCategoryComponent extends FormComponentBase implements OnInit, AfterViewInit {

  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  @Input() CircleInput: AssetCategory;
  bindObj: AssetCategory;
  constructor(private _router: Router,
    private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlassetCategoryCode: {
        required: 'Category Code is required.',
      }
    };
    this.formErrors = {
      ControlassetCategoryCode: '',
    };
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      ControlassetCategoryCode: ['', [
        Validators.required]],
        ControlisActive: ['', []],
    });
    this.form.controls['ControlassetCategoryCode'].disable();
    this.bindObj = {
      assetCategoryCode: null,
      assetCategoryNameENG: null,
      assetCategoryNameUNI: null,
      assetGroupCode: null,
      colourCode: null,
      isActive: null,
    };
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
    }, 250);
    this.startControlMonitoring(this.form);
  }

  resultChanged(): void {
  }
}
