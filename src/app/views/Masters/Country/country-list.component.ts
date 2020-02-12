import { Component, OnInit, Input } from '@angular/core';
import { CountryService } from '../../../Compound/Services/Masters/CountryService';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from '../../../Compound/Module/Masters/Country.model';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  @Input() countryInput: Country;
  countrys: Country[];

  WithoutFiltercountrys: Country[];
  Resultcountrys: Country[];
  SerachCri: number;
  country: Country;

  constructor(private _router: Router,
    private unitService: CountryService,
    private route: ActivatedRoute) {
    this.countrys = this.unitService.getCountrys();
    this.WithoutFiltercountrys = this.countrys;
  }

  ngOnInit() {
    this.countrys = this.unitService.getCountrys();
    this.WithoutFiltercountrys = this.countrys;
    this.country = {
      Country_Id: null,
      Country_Name_ENg: null,
      Country_Name_Uni: null,
      CreatedBy: null,
      ModifiedBy: null,
      CreDate: null,
      ModDate: null,
      IsActive: null
    };
    console.log(this.countrys);
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.Resultcountrys = this.WithoutFiltercountrys;
    console.log(this.country.Country_Id);
    if (this.country.Country_Name_ENg !== null && this.country.Country_Name_ENg !== '') {
      this.Resultcountrys = this.Resultcountrys.filter(SubResultcountry =>
        SubResultcountry.Country_Name_ENg.toLowerCase().indexOf(this.country.Country_Name_ENg.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.country.Country_Id !== null && this.country.Country_Id.toString() !== '') {
      this.Resultcountrys = this.Resultcountrys.filter(SubResultcountry =>
        SubResultcountry.Country_Id.toString().toLowerCase().indexOf(this.country.Country_Id.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      console.log('resul');
      this.Resultcountrys = this.WithoutFiltercountrys;
    }
    this.countrys = this.Resultcountrys;
    console.log(this.countrys);
  }

  ExportToExcel(): void {
    alasql('SELECT Country_Id,Country_Name_ENg,Country_Name_Uni,CreatedBy,ModifiedBy,' +
      'CreDate,ModDate,IsActive INTO XLSX("unitList.xlsx",{headers:true}) FROM ?', [this.countrys]);
  }
}
