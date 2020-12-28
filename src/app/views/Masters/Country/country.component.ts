import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../containers';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Country, CountryEntity } from '../../../Components/Module/Masters/Country.model';
import { CountryTransfarmer } from '../../../Components/Transformer/Masters/Country-Transfarmer';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import { CountryService } from '../../../Components/Services/Masters/CountryService';
import { CountryAsyncValidator } from '../../../helper/async-validator';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent  extends FormComponentBase implements OnInit, AfterViewInit {
  country: Country;
  countryEntity: CountryEntity;
  str: string;
  countryList: Country[];
  form!: FormGroup;
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private countryService:CountryService,
    private router: Router,
    private countryTransfarmer: CountryTransfarmer,
    private globalService: GlobalService,

    private formBuilder: FormBuilder) {
      super();
      const status='';
      this.validationMessages = {
        ControlCountryCode: {
          required: 'Country Code is required.',
        },     
        ControlCountry_Name_Eng: {
          required: 'Country Name Eng is required.',
        },
        ControlCountry_Name_Uni: {
          required: 'Country Name Uni is required.',
        },
      };
      this.formErrors = {
        ControlisActive: '',
      };
    }
    isCountryExist(): boolean {
      return this.form.get('ControlCountry_Name_Eng').hasError('queExist');
      
    }
  ngOnInit() {
    status = '';
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href='login';
    }
     this.country = {
       id:null,
       countryCode:null,
       Country_Name_Eng:null,
       Country_Name_Uni:null,
       CreDate: this.globalService.GerCurrntDateStamp(),
       CreatedBy:localStorage.getItem('username'),
       ModDate:localStorage.getItem('username'),
       ModifiedBy: this.globalService.GerCurrntDateStamp(),
       isActive:'true',
    };
    this.route.paramMap.subscribe(parameterMap => {
      const str = parameterMap.get('id');
      console.log(str);
      this.getcountry(str);
      this.form = this.formBuilder.group({
        ControlCountryCode: ['', []],   
        ControlCountry_Name_Eng: ['', [Validators.required],
        [CountryAsyncValidator(this.countryService, str)]],
        ControlCountry_Name_Uni: ['', []],
        ControlisActive: ['', []],

      });

    });
    this.form.controls['ControlCountryCode'].disable();
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
  private getcountry(Id: string) {
    this.country = {
      countryCode: null,
      id: null,
      Country_Name_Eng: null,
      Country_Name_Uni: null,
      CreatedBy : localStorage.getItem('username'),
      CreDate : this.globalService.GerCurrntDateStamp(),
      ModifiedBy : localStorage.getItem('username'),
      ModDate : this.globalService.GerCurrntDateStamp(),
      isActive:'true',
      
    };
    if (Id === null || Id === '0' || Id === '') {
      this.country = {
        countryCode: null,
        id: null,
        Country_Name_Eng: null,
        Country_Name_Uni: null,
        CreatedBy : localStorage.getItem('username'),
        CreDate : this.globalService.GerCurrntDateStamp(),
        ModifiedBy : localStorage.getItem('username'),
        ModDate : this.globalService.GerCurrntDateStamp(),
        isActive:'true',
      };
      status = '';
    } else {
      this.countryService.getCountry(Id).subscribe(
        (par) => {
          this.countryEntity = par;
          if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
            window.location.href='login';
          }
          this.country = this.countryTransfarmer.CountryTransfarmerEntity(this.countryEntity);   
                 
        },
        (err: any) => console.log(err));
      status = 'Update';
    }
  }
  save(CountryForm: NgForm): void {
    this.country.CreatedBy = localStorage.getItem('username');
    this.country.CreDate = this.globalService.GerCurrntDateStamp();
    this.country.ModifiedBy = localStorage.getItem('username');
    this.country.ModDate = this.globalService.GerCurrntDateStamp();
    console.log(this.country);
    if (status !== 'Update') {
      this.countryService.Save(this.countryTransfarmer.CountryTransfarmer(this.country)).subscribe(
        (par) => {
          if (par !== null) {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
              this.router.navigate(['CountryList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );


   } else {
     this.countryService.Update(this.countryTransfarmer.
       CountryTransfarmer(this.country)).subscribe(
         (par) => {
           if (par !== null) {
             this.defaultLayoutComponent.Massage('',
               'Data saved successfully !', 'modal-info');
               this.router.navigate(['CountryList']);
           } else {
             this.defaultLayoutComponent.Massage('',
               'Technical Error Please connect to Ajax Support team', 'modal-info');
           }
         }
       );
   }
 }

  
}
