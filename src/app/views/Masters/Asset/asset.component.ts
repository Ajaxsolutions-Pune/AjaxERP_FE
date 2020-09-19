import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Asset, AssetEntity } from '../../../Components/Module/Masters/Asset.model';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { CrossFieldErrorMatcher } from '../AngularDemo/infrastructure/cross-field-error-matcher';
import { StateService } from '../../../Components/Services/Masters/StateService';
import { StateTransfarmer } from '../../../Components/Transformer/Masters/State-transformer';
import { State } from '../../../Components/Module/Masters/State.model';
import { AssetGroup } from '../../../Components/Module/Masters/AssetGroup.model';
import { AssetGroupTransfarmer } from '../../../Components/Transformer/Masters/AssetGroup-Transfarmer';
import { AssetGroupService } from '../../../Components/Services/Masters/AssetGroupService';
import { Zone } from '../../../Components/Module/Masters/Zone.model';
import { ZoneService } from '../../../Components/Services/Masters/ZoneService';
import { ZoneTransfarmer } from '../../../Components/Transformer/Masters/ZoneTransfarmer';
import { Circle } from '../../../Components/Module/Masters/Circle.model';
import { CircleService } from '../../../Components/Services/Masters/CircleService';
import { CircleTransfarmer } from '../../../Components/Transformer/Masters/Circle-Transfarmer';
import { Cluster } from '../../../Components/Module/Masters/Cluster.model';
import { ClusterTransfarmer } from '../../../Components/Transformer/Masters/Cluster-Transfarmer';
import { ClusterService } from '../../../Components/Services/Masters/ClusterService';
import { Region } from '../../../Components/Module/Masters/Region.model';
import { RegionService } from '../../../Components/Services/Masters/RegionService';
import { RegionTransfarmer } from '../../../Components/Transformer/Masters/Region-Transfarmer';
import { Country } from '../../../Components/Module/Masters/Country.model';
import { CountryService } from '../../../Components/Services/Masters/CountryService';
import { CountryTransfarmer } from '../../../Components/Transformer/Masters/Country-Transfarmer';
import { Colour } from '../../../Components/Module/Masters/Colour.model';
import { ColourTransfarmer } from '../../../Components/Transformer/Masters/Colour-Transfarmer';
import { ColourService } from '../../../Components/Services/Masters/ColourService';
import { AssetService } from '../../../Components/Services/Masters/AssetService';
import { AssetTransfarmer } from '../../../Components/Transformer/Masters/Asset-Transfarmer';
import { DefaultLayoutComponent } from '../../../containers';
import { AssetCategoryService } from '../../../Components/Services/Masters/AssetCategory';
import { AssetCategoryTransfarmer } from '../../../Components/Transformer/Masters/Asset-Category-Transfarmer';
import { AssetCategory } from '../../../Components/Module/Masters/AssetCategory.model';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import { DeviceService } from '../../../Components/Services/Masters/DeviceService';
import { DeviceTransfarmer } from '../../../Components/Transformer/Masters/Device-Transfarmer';
import { Device } from '../../../Components/Module/Masters/Device.model';

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
  deviceObj: Device[];
  assetCategoryObj: AssetCategory[];
  constructor(private route: ActivatedRoute,
    private _router: Router,
    private globalService: GlobalService,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private assetService: AssetService,
    private assetTransfarmer: AssetTransfarmer,
    private deviceService: DeviceService,
    private deviceTransfarmer: DeviceTransfarmer,
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
    private assetCategoryService: AssetCategoryService,
    private assetCategoryTransfarmer: AssetCategoryTransfarmer,
    private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlassetCode: {
        required: 'Asset Code is required.',
      },
      ControlassetNameENG: {
        required: 'Asset Name is required.',
      },
      ControlAssetCategory: {
        required: 'Asset Category is required.',
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
      ControldeviceIdCode: {
        required: 'Device is required.',
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
      ControlAssetCategory: '',
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
      ControldeviceIdCode: ['', [
      Validators.required]],
      ControlassetNameENG: ['', [
        Validators.required]],
      ControlAssetCategory: ['', [
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
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]+(.[0-9]{0,7})?$')
      ]],
      Controllongitude: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]+(.[0-9]{0,7})?$')
      ]],
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
      deviceId: null,
      sortBy: null,
      source: null,
      assetNameUNI: null,
      placeName: null,
      assetGroupCode: null,
      assetCategoryCode: null,
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
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
      emailId: '',
      hubCode: '',
      isRetag: '',
      locationName: '',
      mobileNo: '',
      tlCode: '',
    };

    this.deviceService.getDevices().subscribe(
      (par) => this.deviceObj = this.deviceTransfarmer.DeviceTransfarmers(par),
      (err: any) => console.log(err));

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

    this.assetCategoryService.getAssetCategorys().subscribe(
      (par) => this.assetCategoryObj = this.assetCategoryTransfarmer.AssetCategoryTransfarmers(par),
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
      deviceId: null,
      sortBy: null,
      source: null,
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
      emailId: '',
      hubCode: '',
      isRetag: '',
      locationName: '',
      mobileNo: '',
      tlCode: '',
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
        deviceId: null,
        sortBy: null,
        source: null,
        isActive: 'true',
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
        emailId: '',
        hubCode: '',
        isRetag: '',
        locationName: '',
        mobileNo: '',
        tlCode: '',
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
        isActive: 'true',
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
        deviceId: null,
        sortBy: null,
        source: null,
        emailId: '',
        hubCode: '',
        isRetag: '',
        locationName: '',
        mobileNo: '',
        tlCode: '',
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

    this.bindObj.createdBy = localStorage.getItem('username');
    this.bindObj.createdDate = this.globalService.GerCurrntDateStamp();
    this.bindObj.modifiedBy = localStorage.getItem('username');
    this.bindObj.modifiedDate = this.globalService.GerCurrntDateStamp();

    if (status !== 'Update') {
      this.bindObj.assetCode = null;
      console.log('this.bindObj');
      console.log(this.bindObj);
      this.assetService.Save(this.assetTransfarmer.AssetTransfarmer(this.bindObj)).subscribe(
        (par) => {
          if (par.status === 'Inserted') {
            console.log(par.status);
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this._router.navigate(['AssetList']);
          }   else {
            this.defaultLayoutComponent.Massage('',
              'Somethig Wrong', 'modal-info');
          }
        }
      );

    } else {
      this.assetService.Update(this.assetTransfarmer.AssetTransfarmer(this.bindObj)).subscribe(
        (par) => {
          console.log(par);
          if (par.status === 'Inserted') {
            console.log(par.status);
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this._router.navigate(['AssetList']);
          }   else {
            this.defaultLayoutComponent.Massage('',
              'Somethig Wrong', 'modal-info');
          }
        }
      );
    }
  }

}
