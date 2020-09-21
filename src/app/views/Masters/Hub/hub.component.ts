import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Hub, HubEntity } from '../../../Components/Module/Masters/Hub.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { CrossFieldErrorMatcher } from '../AngularDemo/infrastructure/cross-field-error-matcher';
import { AssetGroupEntity, AssetGroup } from '../../../Components/Module/Masters/AssetGroup.model';
import { Colour } from '../../../Components/Module/Masters/Colour.model';
import { ColourTransfarmer } from '../../../Components/Transformer/Masters/Colour-Transfarmer';
import { ColourService } from '../../../Components/Services/Masters/ColourService';
import { DefaultLayoutComponent } from '../../../containers';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import { HubService } from '../../../Components/Services/Masters/HubService';
import { HubTransfarmer } from '../../../Components/Transformer/Masters/Hub-Transfarmer';
import { env } from 'process';
import { environment } from '../../../Components/Module/environment';
import { TransmissionLineService } from '../../../Components/Services/Masters/TransmissionLineService';
import { TransmissionLineTransfarmer } from '../../../Components/Transformer/Masters/TransmissionLine-Transfarmer';
import { TransmissionLine } from '../../../Components/Module/Masters/TransmissionLine.model';
import { MasterDrp } from '../../../Components/Module/Masters/MasterDrp.model';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.scss']
})
export class HubComponent extends FormComponentBase implements OnInit, AfterViewInit {

  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  bindObj: Hub;
  str: string;
  transmissionLinedrp: TransmissionLine[];
  hubTypeDrp: MasterDrp[];
  hubGroupDrp: MasterDrp[];
  env = environment;
  bindObjEntity: HubEntity;
  constructor(private _router: Router, private route: ActivatedRoute,
    private hubService: HubService,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private router: Router,
    private transmissionLineService: TransmissionLineService,
    private transmissionLineTransfarmer: TransmissionLineTransfarmer,
    private globalService: GlobalService,
    private hubTransfarmer: HubTransfarmer,
    private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlhubCode: {
        required: 'Hub Code is required.',
        pattern: 'Value cross max limit of Hub Code.',
      },
      ControlhubNameENG: {
        required: 'Hub Name is required.',
      },
      ControltlCode: {
        required: 'Transmission Line is required.',
      },
      ControlHubNameUNI: {
        required: 'Category Name UNI is required.',
      },
      ControlhubTypeCode: {
        required: 'Hub Type Type is required.',
      },
      ControlhubGroupCode: {
        required: 'Hub Group is required.',
      }
    };
    this.formErrors = {
      ControlisActive: '',
    };
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      ControlhubCode: ['', [
        Validators.required]],
      ControlhubNameENG: ['', [
        Validators.required]],
      ControlHubNameUNI: ['', []],
      ControltlCode: ['', [
        Validators.required]],
      ControlhubTypeCode: ['', [
        Validators.required]],
      ControlhubGroupCode: ['', [
        Validators.required]],
      ControlisActive: ['', []],
    });
    //  this.form.controls['ControlhubCode'].disable();
    status = '';
    this.transmissionLineService.fillDrpTransmissionLines().subscribe(
      (par) => {
        this.transmissionLinedrp = this.transmissionLineTransfarmer.TransmissionLineTransfarmers(par);
      },
      (err: any) => console.log(err));
      this.globalService.fillMasterDrp('HUBTY').subscribe(
        (par) => {
          this.hubTypeDrp = par;
        },
        (err: any) => console.log(err));
        this.globalService.fillMasterDrp('HUBGR').subscribe(
          (par) => {
            this.hubGroupDrp = par;
          },
          (err: any) => console.log(err));
    this.bindObj = {
      ouCode: this.env.OuCode,
      hubCode: null,
      hubNameENG: null,
      hubGroupCode: null,
      hubTypeCode: null,
      sortBy: '0',
      tlCode: null,
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    this.route.paramMap.subscribe(parameterMap => {
      const str = parameterMap.get('id');
      this.getregion(str);
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
    }, 250);
    this.startControlMonitoring(this.form);
  }

  save(ObjForm: NgForm): void {
    // this.bindObj.createdBy = localStorage.getItem('username');
    // this.bindObj.createdDate = this.globalService.GerCurrntDateStamp();
    // this.bindObj.modifiedBy = localStorage.getItem('username');
    // this.bindObj.modifiedDate = this.globalService.GerCurrntDateStamp();
    if (status !== 'Update') {
      // this.bindObj.tlCode = null;
      this.hubService.Save(this.hubTransfarmer.
        HubTransfarmer(this.bindObj)).subscribe(
          (par) => {
            console.log(this.hubTransfarmer.
              HubTransfarmer(this.bindObj));
            console.log(par);
            if (par !== null) {
              this.defaultLayoutComponent.Massage('',
                'Data saved successfully !', 'modal-info');
              ObjForm.reset();
              this.router.navigate(['HubList']);
            } else {
              this.defaultLayoutComponent.Massage('',
                'Somethig Wrong', 'modal-info');
            }
          }
        );

    } else {
      this.hubService.Update(this.hubTransfarmer.
        HubTransfarmer(this.bindObj)).subscribe(
          (par) => {
            console.log(this.hubTransfarmer.
              HubTransfarmer(this.bindObj));
            if (par !== null) {
              this.defaultLayoutComponent.Massage('',
                'Data saved successfully !', 'modal-info');
              ObjForm.reset();
              this.router.navigate(['HubList']);
            } else {
              this.defaultLayoutComponent.Massage('',
                'Somethig Wrong', 'modal-info');
            }
          }
        );
    }
  }
  private getregion(Hub_Code: string) {
    this.bindObj = {
      ouCode: this.env.OuCode,
      hubCode: null,
      hubNameENG: null,
      hubGroupCode: null,
      hubTypeCode: null,
      sortBy: '0',
      tlCode: null,
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    if (Hub_Code === null || Hub_Code === '') {
      this.bindObj = {
        ouCode: this.env.OuCode,
        hubCode: null,
        hubNameENG: null,
        hubGroupCode: null,
        hubTypeCode: null,
        sortBy: '0',
        tlCode: null,
        isActive: 'true',
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
      };
      status = '';

    } else {
      this.hubService.getHub(Hub_Code).subscribe(
        (par) => {
          this.bindObjEntity = par;
          this.form.controls['ControlhubCode'].disable();
          this.bindObj = this.hubTransfarmer.
            HubTransfarmerEntity(this.bindObjEntity);
        },
        (err: any) => console.log(err));
      status = 'Update';
    }
  }
}
