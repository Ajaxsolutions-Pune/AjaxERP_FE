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
import { CityGroup, CityGroupEntity } from '../../../Components/Module/Masters/CityGroup';
import { TehsilService } from '../../../Components/Services/Masters/TehsilService';
import { CityGroupService } from '../../../Components/Services/Masters/CityGroupService';
import { TehsilTransfarmer } from '../../../Components/Transformer/Masters/Tehsil-Transfarmer';
import { CityGroupTransfarmer } from '../../../Components/Transformer/Masters/CityGroup-Transfarmer';
import { CityGroupAsyncValidator } from '../../../helper/async-validator';

@Component({
  selector: 'app-city-group',
  templateUrl: './city-group.component.html',
  styleUrls: ['./city-group.component.scss']
})
export class CityGroupComponent extends FormComponentBase implements OnInit, AfterViewInit{
  citygroup: CityGroup;
  form! :FormGroup;
  str: string;
  citygroupList: CityGroup[];
  citygroupEntity: CityGroupEntity; 

  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private citygroupTransfarmer: CityGroupTransfarmer,
    private citygroupService: CityGroupService, 
    private globalService: GlobalService, 
    private router: Router,
   
    private formBuilder: FormBuilder ) {
      super();
      const status='';
      this.validationMessages = {
        ControlCityGroup_Code: {
          required: 'CityGroup Code is required.',
        },     
        ControlCityGroup_Name_ENG: {
          required: 'CityGroup Name Eng is required.',
        },
        ControlCityGroup_Name_UNI: {
          required: 'CityGroup Name Uni is required.',
        }
      };
      this.formErrors = {
        ControlIsActive: '',
      };
  }
  isCityGroupExist(): boolean {
    return this.form.get('ControlCityGroup_Name_ENG').hasError('queExist');
    
  }
  ngOnInit() {
    status = '';
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href='login';
    }
    this.citygroup = {
    CityGroup_Code: null,
    CityGroup_Name_ENG: null,
    CityGroup_Name_UNI: null,
    IsActive:'true',
    createdBy:localStorage.getItem('username'),
    createdDate:this.globalService.GerCurrntDateStamp(),
    modifiedBy:this.globalService.GerCurrntDateStamp(),
    modifiedDate:localStorage.getItem('username'),
     
    };
    
    this.route.paramMap.subscribe(parameterMap => {
      const str = parameterMap.get('id');
      this.getregion(str);
      this.form = this.formBuilder.group({
        ControlCityGroup_Code:['',[]],
        ControlCityGroup_Name_ENG: ['', [Validators.required],
        [CityGroupAsyncValidator(this.citygroupService, str)]],
        ControlCityGroup_Name_UNI: ['', []],
        ControlIsActive: ['', []],
      });
     
      this.form.controls['ControlCityGroup_Code'].disable();

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
  save(CityGroupForm: NgForm): void {
    this.citygroup.createdBy=localStorage.getItem('username');
    this.citygroup.createdDate=this.globalService.GerCurrntDateStamp();
    this.citygroup.modifiedBy=localStorage.getItem('username');
    this.citygroup.modifiedDate=this.globalService.GerCurrntDateStamp();
    if (status !== 'Update') {
      this.citygroupService.Save(this.citygroupTransfarmer.CityGroupTransfarmer(this.citygroup)).subscribe(
        (par) => {
          if (par !== null) {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
              this.router.navigate(['CityGroupList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );


   } else {
     this.citygroupService.Update(this.citygroupTransfarmer.CityGroupTransfarmer(this.citygroup)).subscribe(
         (par) => {
           if (par !== null) {
             this.defaultLayoutComponent.Massage('',
               'Data saved successfully !', 'modal-info');
               this.router.navigate(['CityGroupList']);
           } else {
             this.defaultLayoutComponent.Massage('',
               'Technical Error Please connect to Ajax Support team', 'modal-info');
           }
         }
       );
   }
 }
 private getregion(Id: string) {
  this.citygroup = {
    CityGroup_Code: null,
    CityGroup_Name_ENG: null,
    CityGroup_Name_UNI: null,
    IsActive:'true',
    createdBy:localStorage.getItem('username'),
    createdDate:this.globalService.GerCurrntDateStamp(),
    modifiedBy:this.globalService.GerCurrntDateStamp(),
    modifiedDate:localStorage.getItem('username'),
     
  };
  if (Id === null || Id === '0' || Id === '') {
    this.citygroup = {
    CityGroup_Code: null,
    CityGroup_Name_ENG: null,
    CityGroup_Name_UNI: null,
    IsActive:'true',
    createdBy:localStorage.getItem('username'),
    createdDate:this.globalService.GerCurrntDateStamp(),
    modifiedBy:this.globalService.GerCurrntDateStamp(),
    modifiedDate:localStorage.getItem('username'),
     
    };
    status = '';
  } else {
    this.citygroupService.getCityGroup(Id).subscribe(
      (par) => {
        this.citygroupEntity = par;
        //this.form.controls['ControlhubCode'].disable();
        if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
          window.location.href='login';
        }
        this.citygroup = this.citygroupTransfarmer.CityGroupTransfarmerEntity(this.citygroupEntity);   
              
      },
      (err: any) => console.log(err));
    status = 'Update';
  }
  
}
}