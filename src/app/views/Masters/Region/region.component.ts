import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Region, RegionEntity } from '../../../Components/Module/Masters/Region.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../containers/default-layout/default-layout.component';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';
import { CrossFieldErrorMatcher } from '../AngularDemo/infrastructure/cross-field-error-matcher';
import { RegionTransfarmer } from '../../../Components/Transformer/Masters/Region-Transfarmer';
import { RegionService } from '../../../Components/Services/Masters/RegionService';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent extends FormComponentBase implements OnInit, AfterViewInit {

  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  bindObj: Region;
  str: string;
  regionEntity: RegionEntity;
  constructor(private route: ActivatedRoute,
    private regionTransfarmer: RegionTransfarmer,
    private regionService: RegionService,
    private globalService: GlobalService,
    private defaultLayoutComponent: DefaultLayoutComponent, private router: Router,
    private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlregionCode: {
        required: 'Zone Code is required.',
      },
      ControlregionNameENG: {
        required: 'Region Name ENG is required.',
      },
      ControlzregionNameUNI: {
        required: 'Region Name UNI is required.',
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

  save(ObjForm: NgForm): void {
    if (status !== 'Update') {
      this.bindObj.regionCode = null;
      this.regionService.Save(this.regionTransfarmer.RegionTransfarmer(this.bindObj)).subscribe(
        (par) => {
          console.log(par);
          if (par !== null) {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            ObjForm.reset();
            this.router.navigate(['RegionList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Somethig Wrong', 'modal-info');
          }
        }
      );

    } else {
      this.regionService.Update(this.regionTransfarmer.RegionTransfarmer(this.bindObj)).subscribe(
        (par) => {
          if (par !== null) {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            ObjForm.reset();
            this.router.navigate(['RegionList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Somethig Wrong', 'modal-info');
          }
        }
      );
    }
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      ControlregionCode: ['', []],
      ControlregionNameENG: ['', [
        Validators.required]],
      ControlregionNameUNI: ['', []],
      ControlisActive: ['', []],
    });
    this.form.controls['ControlregionCode'].disable();
    status = '';
    this.bindObj = {
      regionCode: null,
      regionNameENG: null,
      regionNameUNI: null,
      sortBy: null,
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

  omit_special_char(event) {
    console.log('omit_special_char');
    let k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k === 8 || k === 32 || (k >= 48 && k <= 57));
  }
  private getregion(region_Code: string) {
    this.bindObj = {
      regionCode: null,
      sortBy: null,
      regionNameENG: null,
      regionNameUNI: null,
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    if (region_Code === null || region_Code === '') {
      this.bindObj = {
        sortBy: null,
        regionCode: null,
        regionNameENG: null,
        regionNameUNI: null,
        isActive: 'true',
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
      };
      status = '';

    } else {
      this.regionService.getRegion(region_Code).subscribe(
        (par) => {
          this.regionEntity = par;
          this.bindObj = this.regionTransfarmer.RegionTransfarmerEntity(this.regionEntity); },
        (err: any) => console.log(err));
      status = 'Update';
    }
  }
}
