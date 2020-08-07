import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Asset, AssetEntity } from '../../../Compound/Module/Masters/Asset.model';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { CrossFieldErrorMatcher } from '../AngularDemo/infrastructure/cross-field-error-matcher';
import { StateService } from '../../../Compound/Services/Masters/StateService';
import { StateTransfarmer } from '../../../Compound/Transformer/Masters/State-transformer';
import { State } from '../../../Compound/Module/Masters/State.model';
import { AssetGroup } from '../../../Compound/Module/Masters/AssetGroup.model';
import { AssetGroupTransfarmer } from '../../../Compound/Transformer/Masters/AssetGroup-Transfarmer';
import { AssetGroupService } from '../../../Compound/Services/Masters/AssetGroupService';
import { Zone } from '../../../Compound/Module/Masters/Zone.model';
import { ZoneService } from '../../../Compound/Services/Masters/ZoneService';
import { ZoneTransfarmer } from '../../../Compound/Transformer/Masters/ZoneTransfarmer';
import { Circle } from '../../../Compound/Module/Masters/Circle.model';
import { CircleService } from '../../../Compound/Services/Masters/CircleService';
import { CircleTransfarmer } from '../../../Compound/Transformer/Masters/Circle-Transfarmer';
import { Cluster } from '../../../Compound/Module/Masters/Cluster.model';
import { ClusterTransfarmer } from '../../../Compound/Transformer/Masters/Cluster-Transfarmer';
import { ClusterService } from '../../../Compound/Services/Masters/ClusterService';
import { Region } from '../../../Compound/Module/Masters/Region.model';
import { RegionService } from '../../../Compound/Services/Masters/RegionService';
import { RegionTransfarmer } from '../../../Compound/Transformer/Masters/Region-Transfarmer';
import { Country } from '../../../Compound/Module/Masters/Country.model';
import { CountryService } from '../../../Compound/Services/Masters/CountryService';
import { CountryTransfarmer } from '../../../Compound/Transformer/Masters/Country-Transfarmer';
import { Colour } from '../../../Compound/Module/Masters/Colour.model';
import { ColourTransfarmer } from '../../../Compound/Transformer/Masters/Colour-Transfarmer';
import { ColourService } from '../../../Compound/Services/Masters/ColourService';
import { AssetService } from '../../../Compound/Services/Masters/AssetService';
import { AssetTransfarmer } from '../../../Compound/Transformer/Masters/Asset-Transfarmer';
import { DefaultLayoutComponent } from '../../../containers';

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
  ObjEntity: AssetEntity;
  assetGroupObj: AssetGroup[];
  statesObj: State[];
  zoneObj: Zone[];
  circleObj: Circle[];
  clusterObj: Cluster[];
  regionObj: Region[];
  countryObj: Country[];
  colourObj: Colour[];
  constructor(private route: ActivatedRoute,
    private _router: Router,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private assetService: AssetService,
    private assetTransfarmer: AssetTransfarmer,
    private stateService: StateService,
    private stateTransfarmer: StateTransfarmer,
    private assetGroupService: AssetGroupService,
    private assetGroupTransfarmer: AssetGroupTransfarmer,
    private zoneService: ZoneService,
    private zoneTransfarmer: ZoneTransfarmer,
    private circleService: CircleService,
    private circleTransfarmer: CircleTransfarmer,
    private clusterService: ClusterService,
    private clusterTransfarmer: ClusterTransfarmer,
    private regionService: RegionService,
    private regionTransfarmer: RegionTransfarmer,
    private countryService: CountryService,
    private countryTransfarmer: CountryTransfarmer,
    private colourService: ColourService,
    private colourTransfarmer: ColourTransfarmer,
    private formBuilder: FormBuilder) {
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
        minlength: 'Latitude is minimum length.',
        maxlength: 'Value cross max limit of latitude.',
        pattern: 'Latitude is not correct please check.',
      },
      Controllongitude: {
        required: 'Longitude is required.',
        minlength: 'Longitude is minimum length.',
        maxlength: 'Value cross max limit of longitude.',
        pattern: 'Longitude is not correct please check.',

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
    this.formErrors = {
      ControlassetCode: '',
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
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
        Validators.pattern('^[0-9]+(.[0-9]{0,6})?$')]],
      Controllongitude: ['', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
        Validators.pattern('^[0-9]+(.[0-9]{0,6})?$')]],
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
      ouCode: '12',
      assetCode: null,
      assetNameENG: null,
      assetNameUNI: null,
      placeName: null,
      assetGroupCode: null,
      assetCategoryCode: '0',
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
    this.stateService.getStates().subscribe(
      (par) => this.statesObj = this.stateTransfarmer.StateTransfarmers(par),
      (err: any) => console.log(err));
    this.assetGroupService.getAssetGroups().subscribe(
      (par) => this.assetGroupObj = this.assetGroupTransfarmer.AssetGroupTransfarmers(par),
      (err: any) => console.log(err));
    this.zoneService.getZones().subscribe(
      (par) => this.zoneObj = this.zoneTransfarmer.ZoneTransfarmers(par),
      (err: any) => console.log(err));
    this.circleService.getCircles().subscribe(
      (par) => this.circleObj = this.circleTransfarmer.CircleTransfarmers(par),
      (err: any) => console.log(err));
    this.clusterService.getClusters().subscribe(
      (par) => this.clusterObj = this.clusterTransfarmer.ClusterTransfarmers(par),
      (err: any) => console.log(err));
    this.regionService.getRegions().subscribe(
      (par) => this.regionObj = this.regionTransfarmer.RegionTransfarmers(par),
      (err: any) => console.log(err));
    this.countryService.getCountrys().subscribe(
      (par) => this.countryObj = this.countryTransfarmer.CountryTransfarmers(par),
      (err: any) => console.log(err));
    this.colourService.getColours().subscribe(
      (par) => this.colourObj = this.colourTransfarmer.ColourTransfarmers(par),
      (err: any) => console.log(err));

    this.route.paramMap.subscribe(parameterMap => { const str = parameterMap.get('id'); this.getasset(str); });

  }

  private getasset(asset_Code: string) {
    this.bindObj = {
      ouCode: '12',
      assetCode: null,
      assetNameENG: null,
      assetNameUNI: null,
      placeName: null,
      assetGroupCode: null,
      assetCategoryCode: '0',
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
    if (asset_Code === null || asset_Code === '') {
      this.bindObj = {
        ouCode: '12',
        assetCode: null,
        assetNameENG: null,
        assetNameUNI: null,
        placeName: null,
        assetGroupCode: null,
        assetCategoryCode: '0',
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
      status = '';

    } else {
      this.bindObj = {
        ouCode: '12',
        assetCode: null,
        assetNameENG: null,
        assetNameUNI: null,
        placeName: null,
        assetGroupCode: null,
        assetCategoryCode: '0',
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
      this.assetService.getAsset(asset_Code).subscribe(
        (par) => {
          this.ObjEntity = par;
          this.bindObj = this.assetTransfarmer.AssetTransfarmerEntity(this.ObjEntity);
        },
        (err: any) => console.log(err));
      status = 'Update';
    }
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
    }, 250);
    this.startControlMonitoring(this.form);
  }

  resultChanged(): void {
  }
  save(AssetForm: NgForm): void {
    if (status !== 'Update') {
      this.bindObj.assetCode = null;
      console.log('this.bindObj');
      console.log(this.bindObj);
      this.assetService.Save(this.assetTransfarmer.AssetTransfarmer(this.bindObj)).subscribe(
        (par) => {
          console.log(par);
          AssetForm.reset();
          this.defaultLayoutComponent.Massage('Insert Sucsessfuly',
            'Data saved successfully !', 'modal-info');
          this._router.navigate(['AssetList']);
        }
      );

    } else {
      this.assetService.Update(this.assetTransfarmer.AssetTransfarmer(this.bindObj)).subscribe(
        () => {
          AssetForm.reset();
          this.defaultLayoutComponent.Massage('Insert Sucsessfuly',
            'Data saved successfully !', 'modal-info');
          this._router.navigate(['AssetList']);
        }
      );
    }
  }

}
