import { Component, OnInit, Input } from '@angular/core';
import { CountryService } from '../../../Components/Services/Masters/CountryService';
import { ActivatedRoute, Router } from '@angular/router';
import { Country, CountryEntity } from '../../../Components/Module/Masters/Country.model';
import { CountryTransfarmer } from '../../../Components/Transformer/Masters/Country-Transfarmer';
import * as alasql from 'alasql';
import { environment } from '../../../Components/Module/environment';
alasql['private'].externalXlsxLib = require('xlsx');

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
  env = environment;
  config: { itemsPerPage: any; currentPage: number; totalItems: any; };
  Country: Country[];

  constructor(private _router: Router,
    private countryService: CountryService,
    private countryTransfarmer: CountryTransfarmer,
    private route: ActivatedRoute) {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';
    }
    this.countrysEntitys = this.route.snapshot.data['CountryList'];
    this.countrys = this.countryTransfarmer.CountryTransfarmers(this.route.snapshot.data['CountryList']);
    this.WithoutFiltercountrys = this.countrys;
    this.config = {
      itemsPerPage: this.env.paginationPageSize,
      currentPage: 1,
      totalItems: this.countrys.length
    };
  }

  ngOnInit() {
    this.country = {
      countryCode: null,
      Country_Name_Eng: null,
      Country_Name_Uni: null,
      CreatedBy: null,
      ModifiedBy: null,
      CreDate: null,
      ModDate: null,
      isActive: '3',
      id: null,
    };

  }
  pageChanged(event) {
    this.config.currentPage = event;
  }
  
  resultChanged(): void {
    this.SerachCri = 0;
    this.Resultcountrys = this.WithoutFiltercountrys;
    if (this.country.Country_Name_Eng !== null && this.country.Country_Name_Eng !== '') {
      this.Resultcountrys = this.Resultcountrys.filter(SubResultcountry =>
        SubResultcountry.Country_Name_Eng.toLowerCase().indexOf(this.country.Country_Name_Eng.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.country.countryCode !== null && this.country.countryCode.toString() !== '') {
      this.Resultcountrys = this.Resultcountrys.filter(SubResultcountry =>
        SubResultcountry.countryCode.toString().toLowerCase().indexOf(this.country.countryCode.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.country.isActive !== null && this.country.isActive.toString() !== '-1') {
      if (this.country.isActive.toString() === '3') {
        this.Resultcountrys = this.Resultcountrys.filter(SubResultProd =>
          SubResultProd.isActive.toString() === 'Active' || SubResultProd.isActive.toString() === 'Inactive');
      } else {
        this.Resultcountrys = this.Resultcountrys.filter(SubResultProd =>
          SubResultProd.isActive.toString() === this.country.isActive.toString());
      }
      this.SerachCri = 1;
      console.log('Country_Name_Eng');
      console.log(this.Resultcountrys);
    }
    if (this.SerachCri === 0) {
      this.Resultcountrys = this.WithoutFiltercountrys;
    }
    this.countrys = this.Resultcountrys;
    this.config = {
      itemsPerPage: this.env.paginationPageSize,
      currentPage: 1,
      totalItems: this.countrys.length
    };
  }
    ExportToExcel(): void {
      alasql('SELECT countryCode Country_Code,Country_Name_Eng Country_Name,' +
      'isActive Status INTO XLSX("countryList.xlsx",{headers:true}) FROM ?', [this.countrys]);
  }
}
