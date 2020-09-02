import { Component, OnInit, Input } from '@angular/core';
import { CountryService } from '../../../Components/Services/Masters/CountryService';
import { ActivatedRoute, Router } from '@angular/router';
import { Country, CountryEntity } from '../../../Components/Module/Masters/Country.model';
import { CountryTransfarmer } from '../../../Components/Transformer/Masters/Country-Transfarmer';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  @Input() countryInput: Country;
  countrys: Country[];
  countrysEntitys: CountryEntity[];

  WithoutFiltercountrys: Country[];
  Resultcountrys: Country[];
  SerachCri: number;
  country: Country;

  constructor(private _router: Router,
    private countryService: CountryService,
    private countryTransfarmer: CountryTransfarmer,
    private route: ActivatedRoute) {
      if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
        this._router.navigate(['login']);
      }
    this.countrysEntitys = this.route.snapshot.data['CountryList'];
    console.log(this.countrysEntitys);
    this.countrys = this.countryTransfarmer.CountryTransfarmers(this.countrysEntitys);
  }

  ngOnInit() {

    this.countryService.getCountrys().subscribe(
      (par) => this.countrysEntitys = par,
      (err: any) => console.log(err));
    this.country = {
      Country_Name_ENg: null,
      Country_Name_Uni: null,
      CreatedBy: null,
      ModifiedBy: null,
      CreDate: null,
      ModDate: null,
      IsActive: null,
      countryCode: null,
      id: null,
    };
    this.countrys = this.countryTransfarmer.CountryTransfarmers(this.countrysEntitys);
    this.WithoutFiltercountrys = this.countrys;
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.Resultcountrys = this.WithoutFiltercountrys;
    console.log(this.country.id);
    if (this.country.Country_Name_ENg !== null && this.country.Country_Name_ENg !== '') {
      this.Resultcountrys = this.Resultcountrys.filter(SubResultcountry =>
        SubResultcountry.Country_Name_ENg.toLowerCase().indexOf(this.country.Country_Name_ENg.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.country.countryCode !== null && this.country.countryCode.toString() !== '') {
      this.Resultcountrys = this.Resultcountrys.filter(SubResultcountry =>
        SubResultcountry.countryCode.toString().toLowerCase().indexOf(this.country.countryCode.toString().toLowerCase()) !== -1);
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
