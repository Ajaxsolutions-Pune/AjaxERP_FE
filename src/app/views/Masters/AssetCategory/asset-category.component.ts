import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { AssetCategory, AssetCategoryEntity } from '../../../Components/Module/Masters/AssetCategory.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { CrossFieldErrorMatcher } from '../AngularDemo/infrastructure/cross-field-error-matcher';
import { AssetGroupEntity, AssetGroup } from '../../../Components/Module/Masters/AssetGroup.model';
import { Colour } from '../../../Components/Module/Masters/Colour.model';
import { ColourTransfarmer } from '../../../Components/Transformer/Masters/Colour-Transfarmer';
import { ColourService } from '../../../Components/Services/Masters/ColourService';
import { AssetGroupService } from '../../../Components/Services/Masters/AssetGroupService';
import { AssetGroupTransfarmer } from '../../../Components/Transformer/Masters/AssetGroup-Transfarmer';
import { AssetCategoryService } from '../../../Components/Services/Masters/AssetCategory';
import { AssetCategoryTransfarmer } from '../../../Components/Transformer/Masters/Asset-Category-Transfarmer';
import { DefaultLayoutComponent } from '../../../containers';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';

@Component({
  selector: 'app-asset-category',
  templateUrl: './asset-category.component.html',
  styleUrls: ['./asset-category.component.scss']
})
export class AssetCategoryComponent extends FormComponentBase implements OnInit, AfterViewInit {

  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  bindObj: AssetCategory;
  str: string;
  assetGroupdrp: AssetGroup[];
  colourdrp: Colour[];
  bindObjEntity: AssetCategoryEntity;
  constructor(private _router: Router, private route: ActivatedRoute,
    private assetGroupService: AssetGroupService,
    private assetGroupTransfarmer: AssetGroupTransfarmer,
    private assetCategoryService: AssetCategoryService,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private router: Router,
    private globalService: GlobalService,
    private assetCategoryTransfarmer: AssetCategoryTransfarmer,
    private colourService: ColourService,
    private colourTransfarmer: ColourTransfarmer,
    private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlassetCategoryCode: {
        required: 'Category Code is required.',
      },
      ControlCategoryNameENG: {
        required: 'Category Name is required.',
      },
      ControlassetGroup: {
        required: 'Asset Group is required.',
      },
      ControlassetCategoryNameUNI: {
        required: 'Category Name UNI is required.',
      },
      Controlcolour: {
        required: 'Colour is required.',
      }
    };
    this.formErrors = {
      ControlisActive: '',
    };
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      ControlassetCategoryCode: ['', []],
      ControlCategoryNameENG: ['', [
        Validators.required]],
      ControlassetCategoryNameUNI: ['', []],
      ControlassetGroup: ['', [
        Validators.required]],
      Controlcolour: ['', [
        Validators.required]],
      ControlisActive: ['', []],
    });
    this.form.controls['ControlassetCategoryCode'].disable();
    status = '';
    this.colourService.fillColoursDrp().subscribe(
      (par) => {
        this.colourdrp = this.colourTransfarmer.ColourTransfarmers(par);
      },
      (err: any) => console.log(err));
    this.assetGroupService.fillAssetGroupDrp().subscribe(
      (par) => {
        this.assetGroupdrp = this.assetGroupTransfarmer.AssetGroupTransfarmers(par);
      },
      (err: any) => console.log(err));
    this.bindObj = {
      assetCategoryCode: null,
      assetCategoryNameENG: null,
      assetCategoryNameUNI: null,
      assetGroupCode: null,
      colourCode: null,
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
    this.bindObj.createdBy = localStorage.getItem('username');
    this.bindObj.createdDate = this.globalService.GerCurrntDateStamp();
    this.bindObj.modifiedBy = localStorage.getItem('username');
    this.bindObj.modifiedDate = this.globalService.GerCurrntDateStamp();
    if (status !== 'Update') {
      this.bindObj.assetCategoryCode = null;
      this.assetCategoryService.Save(this.assetCategoryTransfarmer.AssetCategoryTransfarmer(this.bindObj)).subscribe(
        (par) => {
          if (par !== null) {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            ObjForm.reset();
            this.router.navigate(['AssetCategoryList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Somethig Wrong', 'modal-info');
          }
        }
      );

    } else {
      this.assetCategoryService.Update(this.assetCategoryTransfarmer.AssetCategoryTransfarmer(this.bindObj)).subscribe(
        (par) => {
          if (par !== null) {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            ObjForm.reset();
            this.router.navigate(['AssetCategoryList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Somethig Wrong', 'modal-info');
          }
        }
      );
    }
  }
  private getregion(assetCategory_Code: string) {
    this.bindObj = {
      assetCategoryCode: null,
      assetCategoryNameENG: null,
      assetCategoryNameUNI: null,
      assetGroupCode: null,
      colourCode: null,
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    if (assetCategory_Code === null || assetCategory_Code === '') {
      this.bindObj = {
        assetCategoryCode: null,
        assetCategoryNameENG: null,
        assetCategoryNameUNI: null,
        assetGroupCode: null,
        colourCode: null,
        isActive: 'true',
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
      };
      status = '';

    } else {
      this.assetCategoryService.getAssetCategory(assetCategory_Code).subscribe(
        (par) => {
          this.bindObjEntity = par;
          this.bindObj = this.assetCategoryTransfarmer.
            AssetCategoryTransfarmerEntity(this.bindObjEntity);
        },
        (err: any) => console.log(err));
      status = 'Update';
    }
  }
}
