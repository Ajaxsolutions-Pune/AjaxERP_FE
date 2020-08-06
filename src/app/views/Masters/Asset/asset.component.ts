import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Asset } from '../../../Compound/Module/Masters/Asset.model';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrossFieldErrorMatcher } from '../AngularDemo/infrastructure/cross-field-error-matcher';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent extends FormComponentBase implements OnInit, AfterViewInit {

  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  @Input() AssetInput: Asset;
  bindObj: Asset;
  constructor(private _router: Router, private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlassetCode: {
        required: 'Asset Code is required.',
      },
      ControlassetNameENG: {
        required: 'Asset Name is required.',
      },
      ControlplaceName: {
        required: 'Place Name is required.',
      },
      ControlassetGroupCode: {
        required: 'AssetGroup is required.',
      },
      ControlcustomerCode: {
        required: 'Customer is required.',
      },
      ControlprojectCode: {
        required: 'Project is required.',
      },
      ControlzoneCode: {
        required: 'Zone is required.',
      },
      ControlcircleCode: {
        required: 'Circle is required.',
      },
      ControlclusterCode: {
        required: 'Cluster is required.',
      },
      ControlregionCode: {
        required: 'Region is required.',
      },
      ControlcountryCode: {
        required: 'Country is required.',
      },
      ControlstateCode: {
        required: 'State is required.',
      },
      Controllatitude: {
        required: 'Asset is required.',
      },
      Controllongitude: {
        required: 'Longitude is required.',
      },
      ControlRedius: {
        required: 'Redius is required.',
      },
      ControlcolourCode: {
        required: 'Colour is required.',
      },
      ControlgeofenceCode: {
        required: 'Geofence is required.',
      },
      ControlsharedCode: {
        required: 'Shared is required.',
      },
      ControlcircuitCode: {
        required: 'Circuit is required.',
      },
      ControlconductorCode: {
        required: 'Conductor is required.',
      },
      ControlclassificationCode: {
        required: 'Classification is required.',
      },
      ControlstructureCode: {
        required: 'Structure is required.',
      },
      ControlpositionCode: {
        required: 'Position is required.',
      }
    };

    this.formErrors = {ControlassetCode: '',
    ControlassetNameENG: '',
    ControlplaceName: '',
    ControlassetGroupCode: '',
    ControlcustomerCode: '',
    ControlprojectCode: '',
    ControlzoneCode: '',
    ControlcircleCode: '',
    ControlclusterCode: '',
    ControlregionCode: '',
    ControlcountryCode: '',
    ControlstateCode: '',
    Controllatitude: '',
    Controllongitude: '',
    ControlRedius: '',
    ControlcolourCode: '',
    ControlgeofenceCode: '',
    ControlsharedCode: '',
    ControlcircuitCode: '',
    ControlconductorCode: '',
    ControlclassificationCode: '',
    ControlstructureCode: '',
    ControlpositionCode: '',
    };
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      ControlassetCode: ['', []],
      ControlassetNameENG: ['', [
        Validators.required]],
      ControlassetNameUNI: ['', []],
      ControlplaceName: ['', [
        Validators.required]],
      ControlassetGroupCode: ['', [
        Validators.required]],
      ControlcustomerCode: ['', [
        Validators.required]],
      ControlprojectCode: ['', [
        Validators.required]],
      ControlzoneCode: ['', [
        Validators.required]],
      ControlcircleCode: ['', [
        Validators.required]],
      ControlclusterCode: ['', [
        Validators.required]],
      ControlregionCode: ['', [
        Validators.required]],
      ControlcountryCode: ['', [
        Validators.required]],
      ControlstateCode: ['', [
        Validators.required]],
      Controllatitude: ['', [
        Validators.required]],
      Controllongitude: ['', [
        Validators.required]],
        ControlRedius: ['', [
        Validators.required]],
      ControlpinCode: ['', []],
      ControlcolourCode: ['', [
        Validators.required]],
      ControlgeofenceCode: ['', [
        Validators.required]],
      ControlsharedCode: ['', [
        Validators.required]],
      ControlcircuitCode: ['', [
        Validators.required]],
      ControlconductorCode: ['', [
        Validators.required]],
      ControlclassificationCode: ['', [
        Validators.required]],
      ControlstructureCode: ['', [
        Validators.required]],
      ControlpositionCode: ['', [
        Validators.required]],
      ControlisActive: ['', []],
      Controladdress: ['', []],
    });
    this.form.controls['ControlassetCode'].disable();
    this.bindObj = {
      ouCode: null,
      assetCode: null,
      assetNameENG: null,
      assetNameUNI: null,
      placeName: null,
      assetGroupCode: null,
      customerCode: null,
      projectCode: null,
      zoneCode: null,
      circleCode: null,
      clusterCode: null,
      countryCode: null,
      stateCode: null,
      latitude: null,
      longitude: null,
      redius: null,
      pinCode: null,
      regionCode: null,
      address: null,
      colourCode: null,
      geofenceCode: null,
      sharedCode: null,
      circuitCode: null,
      conductorCode: null,
      classificationCode: null,
      structureCode: null,
      positionCode: null,
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
