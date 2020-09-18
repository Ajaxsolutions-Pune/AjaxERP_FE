import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { AssetGroup, AssetGroupEntity } from '../../../Components/Module/Masters/AssetGroup.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';
import { CrossFieldErrorMatcher } from '../AngularDemo/infrastructure/cross-field-error-matcher';
import { AssetGroupService } from '../../../Components/Services/Masters/AssetGroupService';
import { AssetGroupTransfarmer } from '../../../Components/Transformer/Masters/AssetGroup-Transfarmer';
import { DefaultLayoutComponent } from '../../../containers';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';

@Component({
  selector: 'app-asset-group',
  templateUrl: './asset-group.component.html',
  styleUrls: ['./asset-group.component.scss']
})
export class AssetGroupComponent extends FormComponentBase implements OnInit, AfterViewInit {

  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  bindObj: AssetGroup;
  bindObjEntity: AssetGroupEntity;
  validationMessages: { ControlassetGroupCode:
    { required: string; }; ControlassetGroupNameENG: { required: string; }; ControlzregionNameUNI: { required: string; }; };
  formErrors: { ControlisActive: string; };
  constructor(private _router: Router,
    private assetGroupTransfarmer: AssetGroupTransfarmer,
    private assetGroupService: AssetGroupService,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private defaultLayoutComponent: DefaultLayoutComponent, private router: Router,
    private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlassetGroupCode: {
        required: 'Asset Group Code is required.',
      },
      ControlassetGroupNameENG: {
        required: 'Asset Group Name ENG is required.',
      },
      ControlzregionNameUNI: {
        required: 'Asset Group Name UNI is required.',
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
      ControlassetGroupCode: ['', []],
      ControlassetGroupNameENG: ['', [
        Validators.required]],
        ControlassetGroupNameUNI: ['', []],
      ControlisActive: ['', []],
    });
    this.form.controls['ControlassetGroupCode'].disable();
    this.bindObj = {
      assetGroupCode: null,
      assetGroupNameENG: null,
      assetGroupNameUNI: null,
      isActive:  'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    this.route.paramMap.subscribe(parameterMap => {
      const str = parameterMap.get('id');
      this.getassetGroup(str);
    });
  }

  private getassetGroup(assetGroup_Code: string) {
    this.bindObj = {
      assetGroupCode: null,
      assetGroupNameENG: null,
      assetGroupNameUNI: null,
      isActive:  'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    if (assetGroup_Code === null || assetGroup_Code === '') {
      this.bindObj = {
        assetGroupCode: null,
        assetGroupNameENG: null,
        assetGroupNameUNI: null,
        isActive:  'true',
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
      };
      status = '';

    } else {
      this.assetGroupService.getAssetGroup(assetGroup_Code).subscribe(
        (par) => {
          this.bindObjEntity = par;
          this.bindObj = this.assetGroupTransfarmer.AssetGroupTransfarmerEntity(this.bindObjEntity); },
        (err: any) => console.log(err));
      status = 'Update';
    }
  }
  save(ObjForm: NgForm): void {
    this.bindObj.createdBy = localStorage.getItem('username');
    this.bindObj.createdDate = this.globalService.GerCurrntDateStamp();
    this.bindObj.modifiedBy = localStorage.getItem('username');
    this.bindObj.modifiedDate = this.globalService.GerCurrntDateStamp();
    if (status !== 'Update') {
      this.bindObj.assetGroupCode = null;
      this.assetGroupService.Save(this.assetGroupTransfarmer.AssetGroupTransfarmer(this.bindObj)).subscribe(
        (par) => {
          if (par !== null) {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            ObjForm.reset();
            this.router.navigate(['AssetGroupList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Somethig Wrong', 'modal-info');
          }
        }
      );

    } else {
      this.assetGroupService.Update(this.assetGroupTransfarmer.AssetGroupTransfarmer(this.bindObj)).subscribe(
        (par) => {
          if (par !== null) {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            ObjForm.reset();
            this.router.navigate(['AssetGroupList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Somethig Wrong', 'modal-info');
          }
        }
      );
    }
  }
}
