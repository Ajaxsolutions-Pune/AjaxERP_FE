import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


import { FormComponentBase } from '../../Masters/AngularDemo/infrastructure/form-component-base';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrossFieldErrorMatcher } from '../../Masters/AngularDemo/infrastructure/cross-field-error-matcher';

import { Device } from '../../../Components/Module/Masters/Device.model';
import { TransmissionLine } from '../../../Components/Module/Masters/TransmissionLine.model';
import { AssetGroup } from '../../../Components/Module/Masters/AssetGroup.model';
import { DeviceTransfarmer } from '../../../Components/Transformer/Masters/Device-Transfarmer';
import { TransmissionLineTransfarmer } from '../../../Components/Transformer/Masters/TransmissionLine-Transfarmer';
import { AssetGroupTransfarmer } from '../../../Components/Transformer/Masters/AssetGroup-Transfarmer';


import { DeviceService } from '../../../Components/Services/Masters/DeviceService';
import { TransmissionLineService } from '../../../Components/Services/Masters/TransmissionLineService';
import { AssetGroupService } from '../../../Components/Services/Masters/AssetGroupService';

import { DeviceAssetMapping, DeviceAssetMapping_Delete, DeviceAssetMapping_Transmission_Line } from '../../../Components/Module/ProcessSetup/DeviceAssetMapping.model';

import { DeviceAssetMappingTransfarmer } from '../../../Components/Transformer/ProcessSetup/DeviceAssetMapping-Transfarmer';
import { DeviceAssetMappingService } from '../../../Components/Services/ProcessSetup/DeviceAssetMappingService';

import { DefaultLayoutComponent } from '../../../containers';
import { Router } from '@angular/router';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import { DeviceAssetDataService } from './deviceassetdata.service';
import { CustomComboBox } from '../../../Components/Module/GlobalModule/CustomComboBox.model';


@Component({
  selector: 'app-device-Asset-mapping',
  templateUrl: 'device-asset-mapping.component.html',
  styleUrls: ['device-asset-mapping.component.scss']
})

export class DeviceAssetMappingComponent extends FormComponentBase
  implements OnInit {

  deviceObj: Device[];
  transmissionLineObj: TransmissionLine[];
  AssetGroupObj: AssetGroup[];
  objDeviceAssetMapping: DeviceAssetMapping[];
  objDeviceAssetMapping_Delete: DeviceAssetMapping_Delete[];
  objDeviceAssetMapping_Transmission_Line: DeviceAssetMapping_Transmission_Line[];
  index: number;
  id: number;
  DeviceId: string;
  TransmissionLineCode: string;
  AssetGroupCode: string;
  mappingId: number;
  addObjDeviceAssetMapping: DeviceAssetMapping;
  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();

  isDisabled: boolean;

  @ViewChild('auto', null) auto: any;
  keyword = 'name';
  data: CustomComboBox[];
  TransmissionLine_data: CustomComboBox[];
  Assetgroup_data: CustomComboBox[];

  AssetDelete: any;
  TransmissionLine_List: string[];


  hidePassword: boolean = true;

  selectEvent(item) {
    const selectedData = {
      value: item.id,
      text: item.name
    };
    this.GetTableData(selectedData.value, this.TransmissionLineCode, this.AssetGroupCode)
    this.DeviceId = selectedData.value;
    this.objDeviceAssetMapping = [];
    this.objDeviceAssetMapping_Delete = [];
  }

  TransmissionselectEvent(item1) {
    const selectedData_Transmission = {
      value: item1.id,
      text: item1.name
    };
    this.GetTableData(this.DeviceId, selectedData_Transmission.value, this.AssetGroupCode)
    this.TransmissionLineCode = selectedData_Transmission.value;
    this.objDeviceAssetMapping = [];
    this.objDeviceAssetMapping_Delete = [];
  }

  AssetGroupselectEvent(item2) {
    const selectedData_Aseet = {
      value: item2.id,
      text: item2.name
    };
    this.GetTableData(this.DeviceId, this.TransmissionLineCode, selectedData_Aseet.value)
    this.AssetGroupCode = selectedData_Aseet.value;
    this.objDeviceAssetMapping = [];
    this.objDeviceAssetMapping_Delete = [];
  }

  GetTableData(deviceid: string, transmissionLineCode: string, assetGroupCode: string) {
    console.log(this.objDeviceAssetMapping);
    this.deviceAssetMappingService.getDeviceAssetMappingNew(deviceid, transmissionLineCode, assetGroupCode).subscribe(
      (par) => {
        this.objDeviceAssetMapping = this.deviceAssetMappingTransfarmer.
          DeviceAssetMappingTransfarmers(par);
        //this.objDeviceAssetMapping.forEach(a => {
        // a.deviceId = deviceid;
        //a.
        // });            
      },
      (err: any) => console.log(err));

    this.isDisabled = false;

    this.deviceAssetMappingService.getDeviceAssetMapping_Transmission_Line(deviceid, assetGroupCode).subscribe(
      (par) => {
        this.TransmissionLine_List = par;
        console.log(" this.TransmissionLine_List");
        console.log(this.TransmissionLine_List);
        //this.objDeviceAssetMapping.forEach(a => {
        // a.deviceId = deviceid;
        //a.
        // });            
      },
      (err: any) => console.log(err));
    console.log(this.TransmissionLine_List);
    // console.log(this.objDeviceAssetMapping.length);

    /*if(this.objDeviceAssetMapping.length > 0) {
       this.isDisabled = false;
    }
    else{
       this.isDisabled = true;
    }*/
  }

  my() {
    this.hidePassword = !this.hidePassword;
    var name = document.getElementById('auto');
    //  alert(name);
    this.auto.focus();
    name.focus();
  }
  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    this.hidePassword = !this.hidePassword;
    // do something when input is focused
  }

  constructor(public httpClient: HttpClient,
    private router: Router,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private deviceService: DeviceService,
    private transmissionLineService: TransmissionLineService,
    private AssetGroupService: AssetGroupService,
    private deviceTransfarmer: DeviceTransfarmer,
    private transmissionLineTransfarmer: TransmissionLineTransfarmer,
    private AssetGroupTransfarmer: AssetGroupTransfarmer,
    private deviceAssetMappingTransfarmer: DeviceAssetMappingTransfarmer,
    private deviceAssetMappingService: DeviceAssetMappingService,
    public dialog: MatDialog,
    public dataService: DeviceAssetDataService,
    private globalService: GlobalService,
    private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlDeviceCode: {
        required: 'Device is required.',
      }
    };
    this.formErrors = {
      ControlisActive: '',
    };
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  ngOnInit() {
    this.deviceService.fillDrpAnswers().subscribe(
      (par) => {
        this.deviceObj = this.deviceTransfarmer.DeviceTransfarmers(par);
        this.data = [];
        this.deviceObj.forEach(a => {
          this.data.push({ id: a.deviceId, name: a.deviceName })
        })
      },
      (err: any) => console.log(err));

    this.transmissionLineService.fillDrpTransmissionLines().subscribe(
      (par) => {
        this.transmissionLineObj = this.transmissionLineTransfarmer.TransmissionLineTransfarmers(par);
        this.TransmissionLine_data = [];
        this.transmissionLineObj.forEach(a => {
          this.TransmissionLine_data.push({ id: a.tlCode, name: a.tlNameENG })
        })
      },
      (err: any) => console.log(err));

    this.AssetGroupService.fillAssetGroupDrp().subscribe(
      (par) => {
        this.AssetGroupObj = this.AssetGroupTransfarmer.AssetGroupTransfarmers(par);
        this.Assetgroup_data = [];
        this.AssetGroupObj.forEach(a => {
          this.Assetgroup_data.push({ id: a.assetGroupCode, name: a.assetGroupNameENG })
        })
      },
      (err: any) => console.log(err));

    this.isDisabled = true;
  }

  checkAllCheckBox(ev) {
    this.objDeviceAssetMapping.forEach(x => x.assigned = ev.target.checked)
  }

  isAllCheckBoxChecked() {
    // return this.objDeviceAssetMapping.every(p => p.assigned);
  }

  save(): void {
    this.objDeviceAssetMapping.forEach(x => x.createdBy = localStorage.getItem('username'));
    this.objDeviceAssetMapping.forEach(x => x.modifiedBy = localStorage.getItem('username'));
    this.objDeviceAssetMapping.forEach(x => x.createdDate = this.globalService.GerCurrntDateStamp());
    this.objDeviceAssetMapping.forEach(x => x.modifiedDate = this.globalService.GerCurrntDateStamp());
    this.objDeviceAssetMapping.forEach(x => x.deviceId = this.DeviceId);

    //for delete filter data
    this.objDeviceAssetMapping_Delete = this.objDeviceAssetMapping.filter(SubResultProd =>
      SubResultProd.assigned.toString() === 'false' || SubResultProd.assigned.toString() === 'true');

    this.AssetDelete = this.objDeviceAssetMapping_Delete.map(t => t.assetCode);

    this.deviceAssetMappingService.Delete(this.DeviceId, this.AssetDelete).subscribe(
      (par) => {
        console.log(par.status);
        if (par.status === 'Success') {
          this.objDeviceAssetMapping_Delete = [];
        }
      }
    );

    //for insert filter data
    this.objDeviceAssetMapping = this.objDeviceAssetMapping.filter(SubResultProd =>
      (SubResultProd.assigned.toString() === 'true' || SubResultProd.isActive.toString() === '1'));

    this.deviceAssetMappingService.Save(this.deviceAssetMappingTransfarmer.
      ObjectToEntityDeviceAssetMappingTransfarmers(this.objDeviceAssetMapping)).subscribe(
        (par) => {
          console.log(par.status);
          if (par.status === 'Success') {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.objDeviceAssetMapping = [];
            this.isDisabled = true;
          }
          else if (par.status === 'Failed') {
            this.defaultLayoutComponent.Massage('',
              'Asset Unmapped.', 'modal-info');
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );
  }
}