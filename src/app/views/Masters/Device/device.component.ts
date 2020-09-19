import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Device, DeviceEntity } from '../../../Components/Module/Masters/Device.model';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { CrossFieldErrorMatcher } from '../AngularDemo/infrastructure/cross-field-error-matcher';
import { DefaultLayoutComponent } from '../../../containers';
import { DeviceService } from '../../../Components/Services/Masters/DeviceService';
import { DeviceTransfarmer } from '../../../Components/Transformer/Masters/Device-Transfarmer';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import { LoginUser } from '../../../Components/Module/LoginUser';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent extends FormComponentBase implements OnInit, AfterViewInit {

  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  @Input() DeviceInput: Device;
  ObjEntity: DeviceEntity;
  bindObj: Device;
  constructor(private route: ActivatedRoute,
    private _router: Router,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private deviceService: DeviceService,
    private globalService: GlobalService,
    private deviceTransfarmer: DeviceTransfarmer,
    private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      Controlimei1: {
        required: 'IMEI 1 is required.',
      },
      ControllockTypeCode: {
        required: 'Lock Type is required.',
      },
    };
    this.formErrors = {
      Controlimei1: '',
    };
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      Controlimei1: ['', [
        Validators.required]],
      ControlisActive: ['', []],
      ControldeviceId: ['', []],
      Controlimei2: ['', []],
      ControldeviceName: ['', []],
      Controlmodel: ['', []],
      ControlosVersion: ['', []],
      ControlappVersion: ['', []],
      txtuiVersion: ['', []],
      Controlprocessor: ['', []],
      Controlram: ['', []],
      Controlstorage: ['', []],
      ControlstatusIp: ['', []],
      ControluiVersion: ['', []],
      Controlsim1Provider: ['', []],
      ControllockTypeCode: ['', [
        Validators.required]],
      ControlisTracking: ['', [
        Validators.required]],
      Controlsim2Provider: ['', []],
      ControltrackingIntervalMin: ['', []],
      Controlsim1MobleNo: ['', []],
      Controlsim2MobleNo: ['', []],
    });
    this.form.controls['ControldeviceId'].disable();
    this.bindObj = {
      deviceId: null,
      imei1: null,
      imei2: null,
      deviceName: null,
      model: null,
      osVersion: null,
      appVersion: null,
      uiVersion: null,
      processor: null,
      ram: null,
      storage: null,
      statusIp: null,
      lockTypeCode: null,
      sim1Provider: null,
      sim2Provider: null,
      sim1MobleNo: null,
      sim2MobleNo: null,
      isTracking: null,
      trackingIntervalMin: null,
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    this.route.paramMap.subscribe(parameterMap => { const str = parameterMap.get('id'); this.getasset(str); });

  }

  private getasset(asset_Code: string) {
    this.bindObj = {
      deviceId: null,
      imei1: null,
      imei2: null,
      deviceName: null,
      model: null,
      osVersion: null,
      appVersion: null,
      uiVersion: null,
      processor: null,
      ram: null,
      storage: null,
      statusIp: null,
      lockTypeCode: null,
      sim1Provider: null,
      sim2Provider: null,
      sim1MobleNo: null,
      sim2MobleNo: null,
      isTracking: null,
      trackingIntervalMin: null,
      isActive: 'true',
      createdBy: LoginUser.username,
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: LoginUser.username,
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    if (asset_Code === null || asset_Code === '') {
      this.bindObj = {
        deviceId: null,
        imei1: null,
        imei2: null,
        deviceName: null,
        model: null,
        osVersion: null,
        appVersion: null,
        uiVersion: null,
        processor: null,
        ram: null,
        storage: null,
        statusIp: null,
        lockTypeCode: null,
        sim1Provider: null,
        sim2Provider: null,
        sim1MobleNo: null,
        sim2MobleNo: null,
        isTracking: null,
        trackingIntervalMin: null,
        isActive: 'true',
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
      };
      status = '';

    } else {
      this.bindObj = {
        deviceId: null,
        imei1: null,
        imei2: null,
        deviceName: null,
        model: null,
        osVersion: null,
        appVersion: null,
        uiVersion: null,
        processor: null,
        ram: null,
        storage: null,
        statusIp: null,
        lockTypeCode: null,
        sim1Provider: null,
        sim2Provider: null,
        sim1MobleNo: null,
        sim2MobleNo: null,
        isTracking: null,
        trackingIntervalMin: null,
        isActive: 'true',
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
      };
      this.deviceService.getDevice(asset_Code).subscribe(
        (par) => {
          this.ObjEntity = par;
          this.bindObj = this.deviceTransfarmer.DeviceTransfarmerEntity(this.ObjEntity);
          this.bindObj.createdBy = localStorage.getItem('username');
            this.bindObj.createdDate = this.globalService.GerCurrntDateStamp();
            this.bindObj.modifiedBy = localStorage.getItem('username');
            this.bindObj.modifiedDate = this.globalService.GerCurrntDateStamp();
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
  save(DeviceForm: NgForm): void {
    if (status !== 'Update') {
      this.bindObj.deviceId = null;
      this.deviceService.Save(this.deviceTransfarmer.DeviceTransfarmer(this.bindObj)).subscribe(
        (par) => {
          console.log(par);
          if (par.status === 'Inserted') {
            console.log(par.status);
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this._router.navigate(['DeviceList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Somethig Wrong', 'modal-info');
          }
        }
      );

    } else {
      this.deviceService.Update(this.deviceTransfarmer.DeviceTransfarmer(this.bindObj)).subscribe(
        (par) => {
          if (par.status === 'Updated') {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this._router.navigate(['DeviceList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Somethig Wrong', 'modal-info');
          }
        }
      );
    }
  }
}
