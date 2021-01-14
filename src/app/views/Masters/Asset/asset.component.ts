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
import { answerAsyncValidator } from '../../../helper/async-validator';
import { TransmissionLine } from '../../../Components/Module/Masters/TransmissionLine.model';
import { Hub } from '../../../Components/Module/Masters/Hub.model';
import { TransmissionLineService } from '../../../Components/Services/Masters/TransmissionLineService';
import { TransmissionLineTransfarmer } from '../../../Components/Transformer/Masters/TransmissionLine-Transfarmer';
import { HubService } from '../../../Components/Services/Masters/HubService';
import { HubTransfarmer } from '../../../Components/Transformer/Masters/Hub-Transfarmer';
import { environment } from '../../../Components/Module/environment';
import { Observable } from 'rxjs';
import { UserEntity_ } from '../../../Components/Module/Masters/UserEntity.model';
import { HttpClient } from '@angular/common/http';
import { Project } from '../../../Components/Module/Masters/Project.model';
import { ProjectService } from '../../../Components/Services/Masters/ProjectService';
import { ProjectTransfarmer } from '../../../Components/Transformer/Masters/Project-Transfarmer';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent extends FormComponentBase implements OnInit, AfterViewInit {

  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  @Input() AssetInput: Asset; bindObj: Asset;
  ObjEntity: AssetEntity; assetGroupObj: AssetGroup[];
  statesObj: State[]; zoneObj: Zone[];
  circleObj: Circle[]; clusterObj: Cluster[];
  regionObj: Region[]; countryObj: Country[];
  colourObj: Colour[]; deviceObj: Device[];
  drpHubObj: Hub[]; drpProjectObj: Project[];

  visibleFlagasset: boolean;
  visibleFlagAssetCategory: boolean;
  visibleFlagassetGroupCode: boolean;
  visibleFlagprojectCode: boolean;
  visibleFlagcircleCode: boolean;
  visibleFlagregionCode: boolean;
  visibleFlagstateCode: boolean;
  visibleFlaglongitude: boolean;
  visibleFlagcolourCode: boolean;
  visibleFlagsharedCode: boolean;
  visibleFlagconductorCode: boolean;
  visibleFlagstructureCode: boolean;
  visibleFlagEmailId: boolean;
  visibleFlagassetNameENG: boolean;
  visibleFlagplaceName: boolean;
  visibleFlagcustomerCode: boolean;
  visibleFlagzoneCode: boolean;
  visibleFlagclusterCode: boolean;
  visibleFlagcountryCode: boolean;
  visibleFlaglatitude: boolean;
  visibleFlagRedius: boolean;
  visibleFlagpinCode: boolean;
  visibleFlaggeofenceCode: boolean;
  visibleFlagcircuitCode: boolean;
  visibleFlagclassificationCode: boolean;
  visibleFlagpositionCode: boolean;
  visibleFlagHubCode: boolean;
  visibleFlagtlCode: boolean;
  visibleFlagmobileNo: boolean;
  visibleFlagaddress: boolean;

  requiredFlagasset: boolean;
  requiredFlagAssetCategory: boolean;
  requiredFlagassetGroupCode: boolean;
  requiredFlagprojectCode: boolean;
  requiredFlagcircleCode: boolean;
  requiredFlagregionCode: boolean;
  requiredFlagstateCode: boolean;
  requiredFlaglongitude: boolean;
  requiredFlagcolourCode: boolean;
  requiredFlagsharedCode: boolean;
  requiredFlagconductorCode: boolean;
  requiredFlagstructureCode: boolean;
  requiredFlagEmailId: boolean;
  requiredFlagassetNameENG: boolean;
  requiredFlagplaceName: boolean;
  requiredFlagcustomerCode: boolean;
  requiredFlagzoneCode: boolean;
  requiredFlagclusterCode: boolean;
  requiredFlagcountryCode: boolean;
  requiredFlaglatitude: boolean;
  requiredFlagRedius: boolean;
  requiredFlagpinCode: boolean;
  requiredFlaggeofenceCode: boolean;
  requiredFlagcircuitCode: boolean;
  requiredFlagclassificationCode: boolean;
  requiredFlagpositionCode: boolean;
  requiredFlagHubCode: boolean;
  requiredFlagtlCode: boolean;
  requiredFlagmobileNo: boolean;
  requiredFlagaddress: boolean;

  CustomerEntityDrp: UserEntity_[];
  env = environment;
  str: string;
  drpTransmissionLineObj: TransmissionLine[];
  assetCategoryObj: AssetCategory[];
  constructor(private route: ActivatedRoute, private httpClient: HttpClient,
    private _router: Router, private globalService: GlobalService,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private assetService: AssetService, private assetTransfarmer: AssetTransfarmer,
    private deviceService: DeviceService, private deviceTransfarmer: DeviceTransfarmer,
    private stateService: StateService, private stateTransfarmer: StateTransfarmer,
    private assetGroupService: AssetGroupService, private assetGroupTransfarmer: AssetGroupTransfarmer,
    private zoneService: ZoneService, private zoneTransfarmer: ZoneTransfarmer,
    private circleService: CircleService, private circleTransfarmer: CircleTransfarmer,
    private clusterService: ClusterService, private clusterTransfarmer: ClusterTransfarmer,
    private regionService: RegionService, private regionTransfarmer: RegionTransfarmer,
    private countryService: CountryService, private countryTransfarmer: CountryTransfarmer,
    private colourService: ColourService, private colourTransfarmer: ColourTransfarmer,
    private assetCategoryService: AssetCategoryService, private assetCategoryTransfarmer: AssetCategoryTransfarmer,
    private transmissionLineService: TransmissionLineService,
    private transmissionLineTransfarmer: TransmissionLineTransfarmer,
    private hubService: HubService, private hubTransfarmer: HubTransfarmer,
    private projectService: ProjectService, private projectTransfarmer: ProjectTransfarmer,
    private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlassetCode: {
        required: 'Asset Code is required.',
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
      },
      ControlHubCode: {
        required: 'HUB is required.',
      },
      ControltlCode: {
        required: 'Transmission Line is required.',
      }
    };
    this.formErrors = {
      ControlassetCode: '', ControlassetNameENG: '',
      ControlAssetCategory: '', ControlplaceName: '',
      ControlassetGroupCode: '', ControlcustomerCode: '',
      ControlprojectCode: '', ControlzoneCode: '',
      ControlcircleCode: '', ControlclusterCode: '',
      ControlregionCode: '', ControlcountryCode: '',
      ControlstateCode: '', Controllatitude: '',
      Controllongitude: '', ControlRedius: '',
      ControlcolourCode: '', ControlgeofenceCode: '',
      ControlsharedCode: '', ControlcircuitCode: '',
      ControlconductorCode: '', ControlclassificationCode: '',
      ControlstructureCode: '', ControlpositionCode: '',
      ControlEmailId: '', ControlmobileNo: ''
    };
    this.str = this.env.apiServiceIPPort;
  }
  fillEntityDrp(GroupEntity: string): Observable<UserEntity_[]> {
    return this.httpClient.get<UserEntity_[]>(this.str +
      '/GetEntity/getList/' + localStorage.getItem('username').toString() + '/' + this.env.OuCode +
      '?entityGroupCode=' + GroupEntity + '&entityCode=NULL&activeStatus=1', this.env.httpOptions);
  }
  special_char_val(event) {
    let k;
    k = event.charCode;
    return this.globalService.SpecialCharValidator(k);

  }

  only_number_val(event) {
    let k;
    k = event.charCode;
    return this.globalService.NumberValidator(k);

  }

  isQueExist(): boolean {
    return this.form.get('ControlassetNameENG').hasError('queExist');
  }

  ngOnInit() {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';
    }
    this.bindObj = {
      ouCode: this.env.OuCode, assetCode: null,
      assetNameENG: null, deviceId: null,
      sortBy: null, source: 'ERP',
      assetNameUNI: null, placeName: null,
      assetGroupCode: null,
      assetCategoryCode: null, customerCode: null,
      projectCode: null, zoneCode: null,
      circleCode: null, clusterCode: null,
      countryCode: null, stateCode: null,
      latitude: null, longitude: null,
      redius: null, pinCode: null,
      regionCode: null, address: null,
      colourCode: null, geofenceCode: null,
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
      mobileNo: '',
      hubCode: '',
      tlCode: '',
      isRetag: '',
      locationName: '',
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
    this.colourService.fillColoursDrp().subscribe(
      (par) => this.colourObj = this.colourTransfarmer.ColourTransfarmers(par),
      (err: any) => console.log(err));

    this.assetCategoryService.getAssetCategorys().subscribe(
      (par) => this.assetCategoryObj = this.assetCategoryTransfarmer.AssetCategoryTransfarmers(par),
      (err: any) => console.log(err));


    this.transmissionLineService.fillDrpTransmissionLines().subscribe(
      (par) => this.drpTransmissionLineObj =
        this.transmissionLineTransfarmer.TransmissionLineTransfarmers(par),
      (err: any) => console.log(err));
    this.hubService.fillDrpHubs().subscribe(
      (par) => this.drpHubObj = this.hubTransfarmer.HubTransfarmers(par),
      (err: any) => console.log(err));

    this.projectService.fillDrpProjects().subscribe(
      (par) => this.drpProjectObj = this.projectTransfarmer.ProjectTransfarmers(par),
      (err: any) => console.log(err));
    this.fillEntityDrp('CUS').subscribe(
      (par) => {
        console.log(this.CustomerEntityDrp);
        this.CustomerEntityDrp = par;
        console.log();
      },
      (err: any) => console.log(err));

    this.route.paramMap.subscribe(parameterMap => {
      const str = parameterMap.get('id'); this.getasset(str);

      this.form = this.formBuilder.group({
        ControlassetCode: ['', []],
        ControlassetNameENG: ['', []],
        ControlAssetCategory: ['', []],
        ControlassetNameUNI: ['', []],
        ControlplaceName: ['', []],
        ControlassetGroupCode: ['', []],
        ControlcustomerCode: ['', []],
        ControlprojectCode: ['', []],
        ControlzoneCode: ['', []],
        ControlcircleCode: ['', []],
        ControlclusterCode: ['', []],
        ControlregionCode: ['', []],
        ControlcountryCode: ['', []],
        ControlstateCode: ['', []],
        Controllatitude: ['', []],
        Controllongitude: ['', []],
        ControlRedius: ['', []],
        ControlpinCode: ['', []],
        ControlcolourCode: ['', []],
        ControlgeofenceCode: ['', []],
        ControlsharedCode: ['', []],
        ControlcircuitCode: ['', []],
        ControlconductorCode: ['', []],
        ControlclassificationCode: ['', []],
        ControlstructureCode: ['', []],
        ControlpositionCode: ['', []],
        ControlisActive: ['', []],
        Controladdress: ['', []],
        ControlHubCode: ['', []],
        ControltlCode: ['', []],
        ControlemailId: ['', []],
        ControlmobileNo: ['', []],
        ControlisRetag: ['', []],
      });
      this.form.controls['ControlassetCode'].disable();
    });

    this.requiredFlagassetGroupCode = false;
    this.requiredFlagplaceName = true;
    this.requiredFlagAssetCategory = true;
    this.requiredFlagprojectCode = true;
    this.requiredFlagzoneCode = true;
    this.requiredFlagcircleCode = true;
    this.requiredFlagclusterCode = true;
    this.requiredFlagregionCode = true;
    this.requiredFlagsharedCode = true;
    this.requiredFlagcircuitCode = true;
    this.requiredFlagconductorCode = true;
    this.requiredFlagclassificationCode = true;
    this.requiredFlagstructureCode = true;
    this.requiredFlagpositionCode = true;
    this.requiredFlagHubCode = true;
    this.requiredFlagtlCode = true;;
    this.requiredFlagasset = true;
    this.requiredFlagaddress = true;
    this.requiredFlagcountryCode = true;
    this.requiredFlagstateCode = true;
    this.requiredFlaglatitude = true;
    this.requiredFlaglongitude = true;
    this.requiredFlagRedius = true;
    this.requiredFlagpinCode = true;
    this.requiredFlagcolourCode = true;
    this.requiredFlaggeofenceCode = true;
    this.requiredFlagcustomerCode = true;
    this.requiredFlagEmailId = true;
    this.requiredFlagmobileNo = true
  }

  private getasset(asset_Code: string) {
    this.bindObj = {
      ouCode: this.env.OuCode,
      assetCode: null,
      assetNameENG: null,
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
      deviceId: null,
      sortBy: null,
      source: 'ERP',
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
        ouCode: this.env.OuCode,
        assetCode: null,
        assetNameENG: null,
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
        deviceId: null,
        sortBy: null,
        source: 'ERP',
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
        ouCode: this.env.OuCode,
        assetCode: null,
        assetNameENG: null,
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
        deviceId: null,
        sortBy: null,
        source: 'ERP',
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
      this.assetService.Save(this.assetTransfarmer.AssetTransfarmer(this.bindObj)).subscribe(
        (par) => {
          if (par !== null) {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this._router.navigate(['AssetList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );

    } else {
      this.assetService.Update(this.assetTransfarmer.AssetTransfarmer(this.bindObj)).subscribe(
        (par) => {
          if (par !== null) {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this._router.navigate(['AssetList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );
    }
  }

  AssetGroupChange(event) {
    const target = event.source.selected._element.nativeElement;
    const selectedData = {
      value: event.value,
      text: target.innerText.trim()
    };
    
    console.log(selectedData.value + " " + selectedData.text)
    if (selectedData.value == "3") {
      this.visibleFlagassetGroupCode = false;
      this.visibleFlagplaceName = false;
      this.visibleFlagAssetCategory = false;
      this.visibleFlagcustomerCode = false;
      this.visibleFlagprojectCode = false;
      this.visibleFlagzoneCode = false;
      this.visibleFlagcircleCode = false;
      this.visibleFlagclusterCode = false;
      this.visibleFlagregionCode = false;
      this.visibleFlagcountryCode = false;
      this.visibleFlagstateCode = false;
      this.visibleFlaglatitude = false;
      this.visibleFlaglongitude = false;
      this.visibleFlagRedius = false;
      this.visibleFlagpinCode = false;
      this.visibleFlagcolourCode = false;
      this.visibleFlaggeofenceCode = false;
      this.visibleFlagsharedCode = false;
      this.visibleFlagcircuitCode = false;
      this.visibleFlagconductorCode = false;
      this.visibleFlagclassificationCode = false;
      this.visibleFlagstructureCode = false;
      this.visibleFlagpositionCode = false;
      this.visibleFlagHubCode = false;
      this.visibleFlagtlCode = false;
      this.visibleFlagEmailId = false;
      this.visibleFlagmobileNo = false;
      this.visibleFlagasset = false;
      this.visibleFlagaddress = false;
      this.visibleFlagplaceName = true;
      this.visibleFlagclusterCode = true;
      this.visibleFlagregionCode = true;
      this.visibleFlagpinCode = true;
      this.visibleFlagsharedCode = true;
      this.visibleFlagcircuitCode = true;
      this.visibleFlagconductorCode = true;
      this.visibleFlagclassificationCode = true;
      this.visibleFlagstructureCode = true;
      this.visibleFlagpositionCode = true;
      this.visibleFlagHubCode = true;
      this.visibleFlagtlCode = false;

      this.requiredFlagassetGroupCode = true;
      this.requiredFlagplaceName = true;
      this.requiredFlagAssetCategory = true;
      this.requiredFlagprojectCode = true;
      this.requiredFlagzoneCode = true;
      this.requiredFlagcircleCode = true;
      this.requiredFlagclusterCode = true;
      this.requiredFlagregionCode = true;
      this.requiredFlagsharedCode = true;
      this.requiredFlagcircuitCode = true;
      this.requiredFlagconductorCode = true;
      this.requiredFlagclassificationCode = true;
      this.requiredFlagstructureCode = true;
      this.requiredFlagpositionCode = true;
      this.requiredFlagHubCode = true;
      this.requiredFlagtlCode = true;;
      this.requiredFlagasset = true;
      this.requiredFlagaddress = false;
      this.requiredFlagcountryCode = false;
      this.requiredFlagstateCode = false;
      this.requiredFlaglatitude = false;
      this.requiredFlaglongitude = false;
      this.requiredFlagRedius = false;
      this.requiredFlagpinCode = false;
      this.requiredFlagcolourCode = false;
      this.requiredFlaggeofenceCode = false;
      this.requiredFlagcustomerCode = false;
      this.requiredFlagEmailId = false;
      this.requiredFlagmobileNo = false
      this.form.controls['ControlassetCode'].setValidators([]);
      this.form.controls['ControlassetNameENG'].setValidators([]);
      this.form.controls['ControlassetGroupCode'].setValidators([]);
      this.form.controls['ControlAssetCategory'].setValidators([]);
      this.form.controls['ControlassetNameUNI'].setValidators([]);
      this.form.controls['ControlplaceName'].setValidators([]);
      this.form.controls['ControlprojectCode'].setValidators([]);
      this.form.controls['ControlzoneCode'].setValidators([]);
      this.form.controls['ControlcircleCode'].setValidators([]);
      this.form.controls['ControlclusterCode'].setValidators([]);
      this.form.controls['ControlregionCode'].setValidators([]);
      this.form.controls['ControlsharedCode'].setValidators([]);
      this.form.controls['ControlcircuitCode'].setValidators([]);
      this.form.controls['ControlconductorCode'].setValidators([]);
      this.form.controls['ControlclassificationCode'].setValidators([]);
      this.form.controls['ControlstructureCode'].setValidators([]);
      this.form.controls['ControlpositionCode'].setValidators([]);
      this.form.controls['ControlisActive'].setValidators([]);
      this.form.controls['ControlHubCode'].setValidators([]);
      this.form.controls['ControltlCode'].setValidators([]);
      this.form.controls['ControlisRetag'].setValidators([]);
      this.form.controls['ControlplaceName'].setValidators([]);
      this.form.controls['ControlcustomerCode'].setValidators([Validators.required]);
      this.form.controls['ControlcountryCode'].setValidators([Validators.required]);
      this.form.controls['ControlstateCode'].setValidators([Validators.required]);
      this.form.controls['Controllatitude'].setValidators([Validators.required]);
      this.form.controls['Controllongitude'].setValidators([Validators.required]);
      this.form.controls['ControlRedius'].setValidators([Validators.required]);
      this.form.controls['ControlpinCode'].setValidators([Validators.required]);
      this.form.controls['ControlcolourCode'].setValidators([Validators.required]);
      this.form.controls['ControlgeofenceCode'].setValidators([Validators.required]);
      this.form.controls['Controladdress'].setValidators([Validators.required]);
      this.form.controls['ControlemailId'].setValidators([Validators.required]);
      this.form.controls['ControlmobileNo'].setValidators([Validators.required]);

      return;
    }
    if (selectedData.value == "4") {
      this.visibleFlagassetGroupCode = false;
      this.visibleFlagplaceName = false;
      this.visibleFlagAssetCategory = false;
      this.visibleFlagcustomerCode = false;
      this.visibleFlagprojectCode = false;
      this.visibleFlagzoneCode = false;
      this.visibleFlagcircleCode = false;
      this.visibleFlagclusterCode = false;
      this.visibleFlagregionCode = false;
      this.visibleFlagcountryCode = false;
      this.visibleFlagstateCode = false;
      this.visibleFlaglatitude = false;
      this.visibleFlaglongitude = false;
      this.visibleFlagRedius = false;
      this.visibleFlagpinCode = false;
      this.visibleFlagcolourCode = false;
      this.visibleFlaggeofenceCode = false;
      this.visibleFlagsharedCode = false;
      this.visibleFlagcircuitCode = false;
      this.visibleFlagconductorCode = false;
      this.visibleFlagclassificationCode = false;
      this.visibleFlagstructureCode = false;
      this.visibleFlagpositionCode = false;
      this.visibleFlagHubCode = false;
      this.visibleFlagtlCode = false;
      this.visibleFlagEmailId = false;
      this.visibleFlagmobileNo = false;
      this.visibleFlagasset = false;
      this.visibleFlagaddress = false;
      this.visibleFlagplaceName = true;
      this.visibleFlagzoneCode = true;
      this.visibleFlagcircleCode = true;
      this.visibleFlagclusterCode = true;
      this.visibleFlagregionCode = true;
      this.visibleFlagregionCode = true;
      this.visibleFlagpinCode = true;
      this.visibleFlagsharedCode = true;
      this.visibleFlagcircuitCode = true;
      this.visibleFlagconductorCode = true;
      this.visibleFlagclassificationCode = true;
      this.visibleFlagstructureCode = true;
      this.visibleFlagpositionCode = true;
      this.visibleFlagHubCode = true;

      this.requiredFlagplaceName = true;
      this.requiredFlagAssetCategory = true;
      this.requiredFlagzoneCode = true;
      this.requiredFlagcircleCode = true;
      this.requiredFlagclusterCode = true;
      this.requiredFlagregionCode = true;
      this.requiredFlagcountryCode = true;
      this.requiredFlagstateCode = true;
      this.requiredFlagpinCode = true;
      this.requiredFlagcolourCode = true;
      this.requiredFlagsharedCode = true;
      this.requiredFlagcircuitCode = true;
      this.requiredFlagconductorCode = true;
      this.requiredFlagclassificationCode = true;
      this.requiredFlagstructureCode = true;
      this.requiredFlagpositionCode = true;
      this.requiredFlagHubCode = true;
      this.requiredFlagtlCode = true;
      this.requiredFlagEmailId = true;
      this.requiredFlagmobileNo = true;
      this.requiredFlagasset = true;
      this.requiredFlagaddress = true;
      this.requiredFlaggeofenceCode = false;
      this.requiredFlaglatitude = false;
      this.requiredFlaglongitude = false;
      this.requiredFlagRedius = false;
      this.requiredFlagcustomerCode = false;
      this.requiredFlagprojectCode = false;
      this.form.controls['ControlassetCode'].setValidators([]);
      this.form.controls['ControlassetNameENG'].setValidators([]);
      this.form.controls['ControlassetGroupCode'].setValidators([]);
      this.form.controls['ControlAssetCategory'].setValidators([]);
      this.form.controls['ControlassetNameUNI'].setValidators([]);
      this.form.controls['ControlplaceName'].setValidators([]);
      this.form.controls['ControlzoneCode'].setValidators([]);
      this.form.controls['ControlcircleCode'].setValidators([]);
      this.form.controls['ControlclusterCode'].setValidators([]);
      this.form.controls['ControlregionCode'].setValidators([]);
      this.form.controls['ControlcountryCode'].setValidators([]);
      this.form.controls['ControlstateCode'].setValidators([]);
      this.form.controls['ControlpinCode'].setValidators([]);
      this.form.controls['ControlcolourCode'].setValidators([]);
      this.form.controls['ControlsharedCode'].setValidators([]);
      this.form.controls['ControlcircuitCode'].setValidators([]);
      this.form.controls['ControlconductorCode'].setValidators([]);
      this.form.controls['ControlclassificationCode'].setValidators([]);
      this.form.controls['ControlstructureCode'].setValidators([]);
      this.form.controls['ControlpositionCode'].setValidators([]);
      this.form.controls['ControlisActive'].setValidators([]);
      this.form.controls['Controladdress'].setValidators([]);
      this.form.controls['ControlHubCode'].setValidators([]);
      this.form.controls['ControltlCode'].setValidators([]);
      this.form.controls['ControlemailId'].setValidators([]);
      this.form.controls['ControlmobileNo'].setValidators([]);
      this.form.controls['ControlisRetag'].setValidators([]);
      this.form.controls['ControlplaceName'].setValidators([]);
      this.form.controls['ControlcustomerCode'].setValidators([Validators.required]);
      this.form.controls['ControlprojectCode'].setValidators([Validators.required]);
      this.form.controls['Controllatitude'].setValidators([Validators.required]);
      this.form.controls['Controllongitude'].setValidators([Validators.required]);
      this.form.controls['ControlRedius'].setValidators([Validators.required]);
      this.form.controls['ControlgeofenceCode'].setValidators([Validators.required]);
      return;
    }
    if (selectedData.value == "2" && selectedData.text == "Tower") {
      this.visibleFlagassetNameENG = false;
      this.visibleFlagassetGroupCode = false;
      this.visibleFlagplaceName = false;
      this.visibleFlagAssetCategory = false;
      this.visibleFlagcustomerCode = false;
      this.visibleFlagprojectCode = false;
      this.visibleFlagcountryCode = false;
      this.visibleFlagstateCode = false;
      this.visibleFlaglatitude = false;
      this.visibleFlaglongitude = false;
      this.visibleFlagRedius = false;
      this.visibleFlagcolourCode = false;
      this.visibleFlaggeofenceCode = false;
      this.visibleFlagHubCode = false;
      this.visibleFlagtlCode = false;
      this.visibleFlagEmailId = false;
      this.visibleFlagmobileNo = false;
      this.visibleFlagasset = false;
      
      
      this.visibleFlagaddress = false;
      this.visibleFlagplaceName = true;
      this.visibleFlagzoneCode = true;
      this.visibleFlagcircleCode = true;
      this.visibleFlagclusterCode = true;
      this.visibleFlagregionCode = true;
      this.visibleFlagpinCode = true;
      this.visibleFlagsharedCode = true;
      this.visibleFlagcircuitCode = true;
      this.visibleFlagconductorCode = true;
      this.visibleFlagclassificationCode = true;
      this.visibleFlagstructureCode = true;
      this.visibleFlagpositionCode = true;


      this.requiredFlagplaceName = true;
      this.requiredFlagzoneCode = true;
      this.requiredFlagcircleCode = true;
      this.requiredFlagclusterCode = true;
      this.requiredFlagregionCode = true;
      this.requiredFlagcountryCode = true;
      this.requiredFlagstateCode = true;
      this.requiredFlagpinCode = true;
      this.requiredFlagcolourCode = true;
      this.requiredFlagsharedCode = true;
      this.requiredFlagcircuitCode = true;
      this.requiredFlagconductorCode = true;
      this.requiredFlagclassificationCode = true;
      this.requiredFlagstructureCode = true;
      this.requiredFlagpositionCode = true;
      this.requiredFlagHubCode = true;
      this.requiredFlagEmailId = true;
      this.requiredFlagmobileNo = true;
      this.requiredFlagasset = true;
      this.requiredFlagaddress = true;
      this.requiredFlagtlCode = false;
      this.requiredFlaggeofenceCode = false;
      this.requiredFlaglatitude = false;
      this.requiredFlaglongitude = false;
      this.requiredFlagRedius = false;
      this.requiredFlagAssetCategory = false;
      this.requiredFlagcustomerCode = false;
      this.requiredFlagprojectCode = false;

      this.form.controls['ControlassetCode'].setValidators([]);
      this.form.controls['ControlassetNameENG'].setValidators([]);
      this.form.controls['ControlassetGroupCode'].setValidators([]);
    //   this.form.controls['ControlassetNameUNI'].setValidators([]);
      this.form.controls['ControlplaceName'].setValidators([]);
      this.form.controls['ControlzoneCode'].setValidators([]);
      this.form.controls['ControlcircleCode'].setValidators([]);
      this.form.controls['ControlclusterCode'].setValidators([]);
      this.form.controls['ControlregionCode'].setValidators([]);
      this.form.controls['ControlcountryCode'].setValidators([]);
      this.form.controls['ControlstateCode'].setValidators([]);
      this.form.controls['ControlpinCode'].setValidators([]);
      this.form.controls['ControlcolourCode'].setValidators([]);
      this.form.controls['ControlsharedCode'].setValidators([]);
      this.form.controls['ControlcircuitCode'].setValidators([]);
      this.form.controls['ControlconductorCode'].setValidators([]);
      this.form.controls['ControlclassificationCode'].setValidators([]);
      this.form.controls['ControlstructureCode'].setValidators([]);
      this.form.controls['ControlpositionCode'].setValidators([]);
      this.form.controls['ControlisActive'].setValidators([]);
      this.form.controls['Controladdress'].setValidators([]);
      this.form.controls['ControlHubCode'].setValidators([]);
      this.form.controls['ControlemailId'].setValidators([]);
      this.form.controls['ControlmobileNo'].setValidators([]);
      this.form.controls['ControlisRetag'].setValidators([]);
      this.form.controls['ControlplaceName'].setValidators([]);
      this.form.controls['ControltlCode'].setValidators([Validators.required]);
      this.form.controls['ControlgeofenceCode'].setValidators([Validators.required]);
      this.form.controls['Controllatitude'].setValidators([Validators.required]);
      this.form.controls['Controllongitude'].setValidators([Validators.required]);
      this.form.controls['ControlRedius'].setValidators([Validators.required]);
      this.form.controls['ControlAssetCategory'].setValidators([Validators.required]);
      this.form.controls['ControlcustomerCode'].setValidators([Validators.required]);
      this.form.controls['ControlprojectCode'].setValidators([Validators.required]);
      
      return;
    }

    this.visibleFlagassetGroupCode = false;
    this.visibleFlagplaceName = false;
    this.visibleFlagAssetCategory = false;
    this.visibleFlagcustomerCode = false;
    this.visibleFlagprojectCode = false;
    this.visibleFlagzoneCode = false;
    this.visibleFlagcircleCode = false;
    this.visibleFlagclusterCode = false;
    this.visibleFlagregionCode = false;
    this.visibleFlagcountryCode = false;
    this.visibleFlagstateCode = false;
    this.visibleFlaglatitude = false;
    this.visibleFlaglongitude = false;
    this.visibleFlagRedius = false;
    this.visibleFlagpinCode = false;
    this.visibleFlagcolourCode = false;
    this.visibleFlaggeofenceCode = false;
    this.visibleFlagsharedCode = false;
    this.visibleFlagcircuitCode = false;
    this.visibleFlagconductorCode = false;
    this.visibleFlagclassificationCode = false;
    this.visibleFlagstructureCode = false;
    this.visibleFlagpositionCode = false;
    this.visibleFlagHubCode = false;
    this.visibleFlagtlCode = false;
    this.visibleFlagEmailId = false;
    this.visibleFlagmobileNo = false;
    this.visibleFlagasset = false;
    this.visibleFlagaddress = false;

    
    this.form.controls['ControlAssetCategory'].setValidators([]);
    this.form.controls['ControlassetNameUNI'].setValidators([]);
    this.form.controls['ControlplaceName'].setValidators([]);
    this.form.controls['ControlcustomerCode'].setValidators([]);
    this.form.controls['ControlprojectCode'].setValidators([]);
    this.form.controls['ControlzoneCode'].setValidators([]);
    this.form.controls['ControlcircleCode'].setValidators([]);
    this.form.controls['ControlclusterCode'].setValidators([]);
    this.form.controls['ControlregionCode'].setValidators([]);
    this.form.controls['ControlcountryCode'].setValidators([]);
    this.form.controls['ControlstateCode'].setValidators([]);
    this.form.controls['Controllatitude'].setValidators([]);
    this.form.controls['Controllongitude'].setValidators([]);
    this.form.controls['ControlRedius'].setValidators([]);
    this.form.controls['ControlpinCode'].setValidators([]);
    this.form.controls['ControlcolourCode'].setValidators([]);
    this.form.controls['ControlgeofenceCode'].setValidators([]);
    this.form.controls['ControlsharedCode'].setValidators([]);
    this.form.controls['ControlcircuitCode'].setValidators([]);
    this.form.controls['ControlconductorCode'].setValidators([]);
    this.form.controls['ControlclassificationCode'].setValidators([]);
    this.form.controls['ControlstructureCode'].setValidators([]);
    this.form.controls['ControlpositionCode'].setValidators([]);
    this.form.controls['ControlisActive'].setValidators([]);
    this.form.controls['Controladdress'].setValidators([]);
    this.form.controls['ControlHubCode'].setValidators([]);
    this.form.controls['ControltlCode'].setValidators([]);
    this.form.controls['ControlemailId'].setValidators([]);
    this.form.controls['ControlmobileNo'].setValidators([]);
    this.form.controls['ControlisRetag'].setValidators([]);
    this.form.controls['ControlplaceName'].setValidators([]);
    this.assetCategoryService.getAssetCategorysByGroupId(selectedData.value).subscribe(
      (par) => this.assetCategoryObj = this.assetCategoryTransfarmer.AssetCategoryTransfarmers(par),
      (err: any) => console.log(err));
  }
}
