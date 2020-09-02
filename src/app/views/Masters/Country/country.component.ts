import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../containers';
import { NgForm } from '@angular/forms';
import { CountryService } from '../../../Components/Services/Masters/CountryService';
import { Country, CountryEntity } from '../../../Components/Module/Masters/Country.model';
import { CountryTransfarmer } from '../../../Components/Transformer/Masters/Country-Transfarmer';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  country: Country;
  countryEntity: CountryEntity;
  str: string;
  countryList: Country[];
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private countryTransfarmer: CountryTransfarmer,
    private countryService: CountryService, private router: Router) {
    const status = '';
  }
  ngOnInit() {
    status = '';
    this.route.paramMap.subscribe(parameterMap => { const id = +parameterMap.get('id'); this.getcountrys(id.toString()); });

  }
  save(countryForm: NgForm): void {
    console.log(this.country.countryCode);
    this.countryService.Save(this.country).subscribe(
      () => {
        countryForm.reset();
        this.defaultLayoutComponent.Massage('Insert Sucsessfuly',
          'Data saved successfully !', 'modal-info');
        this.router.navigate(['CountryList']);
      }
    );
  }

  private getcountrys(Id: string) {
    this.countryEntity = {
      countryCode: null,
      countryNameEng: null,
      countryNameUni: null,
      isActive: null,
    };
    this.country = {
      countryCode: null,
      id: null,
      Country_Name_ENg: null,
      Country_Name_Uni: null,
      CreDate: null,
      CreatedBy: null,
      IsActive: null,
      ModDate: null,
      ModifiedBy: null,

    };
    if (Id === null || Id === '0' || Id === '') {
      this.country = {
        countryCode: null,
        id: null,
        Country_Name_ENg: null,
        Country_Name_Uni: null,
        CreDate: null,
        CreatedBy: null,
        IsActive: null,
        ModDate: null,
        ModifiedBy: null,
      };
      status = '';

    } else {
      this.countryService.getCountry(Id).pipe().subscribe(product => this.countryEntity = product);
      console.log('Hiiii---  ' + this.countryEntity.countryCode);
       this.country = this.countryTransfarmer.CountryTransfarmerOne(this.countryEntity);
      JSON.stringify(this.countryEntity);
      status = 'Update';
    }
  }
}
