import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../containers';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DistrictService } from '../../../Components/Services/Masters/DistrictService';
import { DistrictTransfarmer } from '../../../Components/Transformer/Masters/District-Transformer';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import { StateService } from '../../../Components/Services/Masters/StateService';
import { State } from '../../../Components/Module/Masters/State.model';
import { DistrictEntity } from '../../../Components/Module/Masters/District.Entity.model';
import { District } from '../../../Components/Module/Masters/District';
import { City, CityEntity } from '../../../Components/Module/City';
import { CityTransfarmer } from '../../../Components/Transformer/Masters/City-Transfarmer';
import { CityService } from '../../../Components/Services/Masters/CityService';
import { Tehsil } from '../../../Components/Module/Masters/Tehsil';
import { CityGroup } from '../../../Components/Module/Masters/CityGroup';
import { TehsilService } from '../../../Components/Services/Masters/TehsilService';
import { CityGroupService } from '../../../Components/Services/Masters/CityGroupService';
import { TehsilTransfarmer } from '../../../Components/Transformer/Masters/Tehsil-Transfarmer';
import { CityGroupTransfarmer } from '../../../Components/Transformer/Masters/CityGroup-Transfarmer';
import { CityAsyncValidator } from '../../../helper/async-validator';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent extends FormComponentBase implements OnInit, AfterViewInit {
  city: City;
  form!: FormGroup;
  str: string;
  cityList: City[];
  cityEntity: CityEntity;
  districtDrp: District[];
  tehsilDrp: Tehsil[];
  cityGroupDrp: CityGroup[];
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private cityTransfarmer: CityTransfarmer,
    private cityService: CityService,
    private cityGroupService: CityGroupService,
    private cityGroupTransfarmer: CityGroupTransfarmer,
    private districtService: DistrictService,
    private districtTransfarmer: DistrictTransfarmer,
    private globalService: GlobalService,
    private tehsilService: TehsilService,
    private tehsilTransfarmer: TehsilTransfarmer,
    private router: Router,

    private formBuilder: FormBuilder) {
    super();
    const status = '';
    this.validationMessages = {
      ControlcityCode: {
        required: 'City Code is required.',
      },
      ControlcityNameENG: {
        required: 'City Name Eng is required.',
      },
      ControlcityNameUNI: {
        required: 'City Name Uni is required.',
      },
      ControldistrictCode: {
        required: 'District Code is required.',
      },
      ControltehsilCode: {
        required: 'Tehsil Code is required.',
      },
      ControlCityGroup_Code: {
        required: 'CityGroup Code is required.',
      },
      ControlzipPinCode: {
        required: 'Zip Pin Code is required.',
      }
    };
    this.formErrors = {
      ControlisActive: '',
    };

  }
  isCityExist(): boolean {
    return this.form.get('ControlcityNameENG').hasError('queExist');

  }
  ngOnInit() {
    status = '';
    this.districtService.getDistricts().subscribe(
      (par) => {
        this.districtDrp = this.districtTransfarmer.DistrictTransfarmers(par);
      },
      (err: any) => console.log(err));
    this.tehsilService.getTehsils().subscribe(
      (par) => {
        this.tehsilDrp = this.tehsilTransfarmer.TehsilTransfarmers(par);
      },
      (err: any) => console.log(err));
    this.cityGroupService.getCityGroups().subscribe(
      (par) => {
        this.cityGroupDrp = this.cityGroupTransfarmer.CityGroupTransfarmers(par);
        console.log(this.cityGroupDrp);
      },
      (err: any) => console.log(err));

    console.log(this.tehsilDrp);

    this.city = {
      cityCode: null,
      cityNameENG: null,
      cityNameUNI: null,
      districtCode: null,
      tehsilCode: null,
      cityGroupCode: null,
      zipPinCode: null,
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
      this.form = this.formBuilder.group({
        ControlcityCode: ['', []],
        ControlcityNameENG: ['', [Validators.required],
          [CityAsyncValidator(this.cityService, str)]],
        ControlcityNameUNI: ['', []],
        ControldistrictCode: ['', [Validators.required]],
        ControltehsilCode: ['', [Validators.required]],
        ControlCityGroup_Code: ['', [Validators.required]],
        ControlzipPinCode: ['', [Validators.required]],
        ControlisActive: ['', []],
      });

      this.form.controls['ControlcityCode'].disable();

    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
    }, 250);
    this.startControlMonitoring(this.form);
  }

  special_char_val(event) {
    let k;
    k = event.charCode;
    return this.globalService.SpecialCharValidator(k);

  }
  save(): void {
    this.city.createdBy = localStorage.getItem('username');
    this.city.createdDate = this.globalService.GerCurrntDateStamp();
    this.city.modifiedBy = localStorage.getItem('username');
    this.city.modifiedDate = this.globalService.GerCurrntDateStamp();
    if (status !== 'Update') {
      this.cityService.Save(this.cityTransfarmer.CityTransfarmer(this.city)).subscribe(
        (par) => {
          if (par !== null) {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['CityList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );
    } else {
      this.cityService.Update(this.cityTransfarmer.CityTransfarmer(this.city)).subscribe(
        (par) => {
          if (par !== null) {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['CityList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );
    }
  }
  private getregion(Id: string) {
    this.city = {

      cityCode: null,
      cityNameENG: null,
      cityNameUNI: null,
      districtCode: null,
      tehsilCode: null,
      cityGroupCode: null,
      zipPinCode: null,
      sortBy: null,
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: this.globalService.GerCurrntDateStamp(),
      modifiedDate: localStorage.getItem('username'),

    };
    if (Id === null || Id === '0' || Id === '') {
      this.city = {
        cityCode: null,
        cityNameENG: null,
        cityNameUNI: null,
        districtCode: null,
        tehsilCode: null,
        cityGroupCode: null,
        zipPinCode: null,
        sortBy: null,
        isActive: 'true',
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: this.globalService.GerCurrntDateStamp(),
        modifiedDate: localStorage.getItem('username'),
      };
      status = '';
    } else {
      this.cityService.getCity(Id).subscribe(
        (par) => {
          this.cityEntity = par;
          //this.form.controls['ControlhubCode'].disable();
          if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
            window.location.href = 'login';
          }
          this.city = this.cityTransfarmer.CityTransfarmerEntity(this.cityEntity);

        },
        (err: any) => console.log(err));
      status = 'Update';
    }

  }
}