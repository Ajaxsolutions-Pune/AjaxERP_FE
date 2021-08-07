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
import { DistrictAsyncValidator } from '../../../helper/async-validator';
import { StateTransfarmer } from '../../../Components/Transformer/Masters/State-transformer';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss']
})
export class DistrictComponent extends FormComponentBase implements OnInit, AfterViewInit{
  district: District;
  form! :FormGroup;
  str: string;
  districtList: District[];
  districtEntity: DistrictEntity; 
  stateDrp:State[];
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private districtTransfarmer: DistrictTransfarmer,
    private stateTransfarmer: StateTransfarmer,
    private districtService: DistrictService, 
    private globalService: GlobalService, 
    private stateService: StateService, 
    private router: Router,
   
    private formBuilder: FormBuilder ) {
      super();
      const status='';
      this.validationMessages = {
        ControldistrictCode: {
          required: 'District Code is required.',
        },     
        ControldistrictNameEng: {
          required: 'District Name Eng is required.',
        },
        ControldistrictNameUni: {
          required: 'District Name Uni is required.',
        },
        ControlstateCode: {
          required: 'State Code is required.',
        }
      };
      this.formErrors = {
        ControlisActive: '',
      };
  }
  isDistrictExist(): boolean {
    return this.form.get('ControldistrictNameEng').hasError('queExist');
    
  }
  ngOnInit() {
    status = '';
        this.stateService.getStates().subscribe(
          (par) => {
            this.stateDrp = this.stateTransfarmer.StateTransfarmers(par);
            console.log(this.stateDrp);
          },
          (err: any) => console.log(err));
    this.district = {
      ID:null,
      districtCode: null,
      districtNameEng: null,
      districtNameUni: null,
      stateCode: null,
      isActive: 'true',
      createdBy:localStorage.getItem('username'),
      createdDate:this.globalService.GerCurrntDateStamp(),
      modifiedBy:this.globalService.GerCurrntDateStamp(),
      modifiedDate:localStorage.getItem('username'),
      sortBy:null,
    
    };
    
    this.route.paramMap.subscribe(parameterMap => {
      const str = parameterMap.get('id');
      this.getregion(str);
      this.form = this.formBuilder.group({
        ControldistrictCode: ['', []],     
        ControldistrictNameEng: ['', [Validators.required],
        [DistrictAsyncValidator(this.districtService, str)]],
        ControldistrictNameUni: ['', []],
        ControlstateCode: ['', [ Validators.required]],
        ControlisActive: ['', []],
      });
     
      this.form.controls['ControldistrictCode'].disable();

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
    if (status !== 'Update') {
      this.districtService.Save(this.districtTransfarmer.DistrictTransfarmer(this.district)).subscribe(
        (par) => {
          if (par !== null) {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
              this.router.navigate(['DistrictList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );


   } else {
     this.districtService.Update(this.districtTransfarmer.
       DistrictTransfarmer(this.district)).subscribe(
         (par) => {
           if (par !== null) {
             this.defaultLayoutComponent.Massage('',
               'Data saved successfully !', 'modal-info');
               this.router.navigate(['DistrictList']);
           } else {
             this.defaultLayoutComponent.Massage('',
               'Technical Error Please connect to Ajax Support team', 'modal-info');
           }
         }
       );
   }
 }
 private getregion(Id: string) {
  this.district = {
    ID:null,
    districtCode:null,
    districtNameEng:null,
    districtNameUni:null,
    stateCode:null,
    isActive:'true',
    createdBy:localStorage.getItem('username'),
    createdDate:this.globalService.GerCurrntDateStamp(),
    modifiedBy:this.globalService.GerCurrntDateStamp(),
    modifiedDate:localStorage.getItem('username'),
    sortBy:null,

    
  };
  if (Id === null || Id === '0' || Id === '') {
    this.district = {
      ID:null,
      districtCode:null,
      districtNameEng:null,
      districtNameUni:null,
      stateCode:null,
      isActive:'true',
      createdBy:localStorage.getItem('username'),
      createdDate:this.globalService.GerCurrntDateStamp(),
      modifiedBy:localStorage.getItem('username'),
      modifiedDate:this.globalService.GerCurrntDateStamp(),
      sortBy:null,
    };
    status = '';
  } else {
    this.districtService.getDistrict(Id).subscribe(
      (par) => {
        this.districtEntity = par;
        //this.form.controls['ControlhubCode'].disable();
        if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
          window.location.href='login';
        }
        this.district = this.districtTransfarmer.DistrictTransfarmerEntity(this.districtEntity);   
          this.form.controls['ControldistrictCode'].disable();         
      },
      (err: any) => console.log(err));
    status = 'Update';
  }
  
}
}