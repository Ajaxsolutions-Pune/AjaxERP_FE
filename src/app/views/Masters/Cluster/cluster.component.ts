import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cluster } from '../../../Compound/Module/Masters/Cluster.model';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrossFieldErrorMatcher } from '../AngularDemo/infrastructure/cross-field-error-matcher';
@Component({
  selector: 'app-cluster',
  templateUrl: './cluster.component.html',
  styleUrls: ['./cluster.component.scss']
})
export class ClusterComponent extends FormComponentBase implements OnInit, AfterViewInit {

  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  @Input() CircleInput: Cluster;
  bindObj: Cluster;
  constructor(private _router: Router,
    private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlclusterCode: {
        required: 'Cluster Code is required.',
      },
      ControlclusterNameENG: {
        required: 'Cluster Name ENG is required.',
      },
      ControlcircleCode: {
        required: 'Circle is required.',
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
      ControlclusterCode: ['', []],
      ControlclusterNameENG: ['', [
        Validators.required]],
        ControlcircleCode: ['', [
        Validators.required]],
        ControlclusterNameUNI: ['', []],
      ControlisActive: ['', []],
    });
    this.form.controls['ControlclusterCode'].disable();
    this.bindObj = {
      clusterCode: null,
      clusterNameENG: null,
      clusterNameUNI: null,
      circleCode: null,
      isActive: null
    };
  }

  resultChanged(): void {
  }
}
