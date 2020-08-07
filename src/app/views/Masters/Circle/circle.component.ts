import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Circle } from '../../../Compound/Module/Masters/Circle.model';
import { Router } from '@angular/router';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrossFieldErrorMatcher } from '../AngularDemo/infrastructure/cross-field-error-matcher';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.scss']
})
export class CircleComponent extends FormComponentBase implements OnInit, AfterViewInit {

  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  @Input() CircleInput: Circle;
  bindObj: Circle;
  constructor(private _router: Router,
    private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlcircleCode: {
        required: 'Circle Code is required.',
      },
      ControlcircleNameENG: {
        required: 'Circle Name ENG is required.',
      },
      ControlzoneCode: {
        required: 'Zone is required.',
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
      ControlcircleCode: ['', []],
      ControlcircleNameENG: ['', [
        Validators.required]],
        ControlzoneCode: ['', [
          Validators.required]],
        ControlcircleNameUNI: ['', []],
      ControlisActive: ['', []],
    });
    this.form.controls['ControlcircleCode'].disable();
    this.bindObj = {
      circleCode: null,
      circleNameENG: null,
      circleNameUNI: null,
      zoneCode: null,
      isActive: null
    };
  }

  resultChanged(): void {
  }
}
