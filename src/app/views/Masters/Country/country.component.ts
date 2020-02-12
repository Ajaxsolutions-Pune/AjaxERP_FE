import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../containers';
import { NgForm } from '@angular/forms';
import { CountryService } from '../../../Compound/Services/Masters/CountryService';
import { Country } from '../../../Compound/Module/Masters/Country.model';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  country: Country;
  str: string;
  countryList: Country[];
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private countryService: CountryService, private router: Router) {
    const status = '';
  }
  ngOnInit() {
    status = '';
    this.route.paramMap.subscribe(parameterMap => { const id = +parameterMap.get('id'); this.getcountrys(id); });

  }
  save(countryForm: NgForm): void {
    if (status !== 'Update') {
      this.countryService.Save(this.country);
    } else {
      this.countryService.Update(this.country);
    }
    this.router.navigate(['CountryList']);

  }

  private getcountrys(Id: number) {

    console.log(Id);
    console.log(status);
    this.country = {
      Country_Id: null,
      Country_Name_ENg: null,
      Country_Name_Uni: null,
      CreDate: null,
      CreatedBy: null,
      IsActive: null,
      ModDate: null,
      ModifiedBy: null,

    };
    if (Id === null || Id === 0) {
      this.country = {
        Country_Id: null,
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

      this.country = this.countryService.getCountry(Id)[0];
      status = 'Update';
    }
  }
}
