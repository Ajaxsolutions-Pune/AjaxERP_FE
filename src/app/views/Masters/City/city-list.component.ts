import { Component, OnInit, Input } from '@angular/core';
import { City, CityEntity } from '../../../Components/Module/City';
import { CityService } from '../../../Components/Services/Masters/CityService';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../Components/Module/environment';
import { CityTransfarmer } from '../../../Components/Transformer/Masters/City-Transfarmer';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import * as alasql from 'alasql';
alasql['private'].externalXlsxLib = require('xlsx');

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {

  citys: City[];
  cityEntity: CityEntity[];
  WithoutFilterCitys: City[];
  Resultcitys: City[];
  SerachCri: number;
  city: City;
  config: { itemsPerPage: any; currentPage: number; totalItems: any; };
  env= environment;

  constructor(private _router: Router,
    private cityService: CityService,
    private cityTransfarmer: CityTransfarmer,
    private globalService: GlobalService, 
    private route: ActivatedRoute,
    ) {
      if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
        window.location.href='login';
      }
      this.cityEntity = this.route.snapshot.data['CityList'];
      console.log(this.cityEntity);
      this.citys = this.cityTransfarmer.CityTransfarmers(this.cityEntity);
      this.WithoutFilterCitys = this.citys;
      this.config = {
        itemsPerPage: this.env.paginationPageSize,
        currentPage: 1,
        totalItems: this.citys.length
      };
  }
  ngOnInit() {
    this.WithoutFilterCitys = this.citys;
    this.city = {
    cityCode: null,
    cityNameENG: null,
    cityNameUNI: null,
    districtCode:null,
    tehsilCode:null,
    cityGroupCode: null,
    zipPinCode: null,
    sortBy: null,
    isActive:'3',
    createdBy:localStorage.getItem('username'),
    createdDate:this.globalService.GerCurrntDateStamp(),
    modifiedBy:this.globalService.GerCurrntDateStamp(),
    modifiedDate:localStorage.getItem('username'),
     
    };
  }
  pageChanged(event) {
    this.config.currentPage = event;
  }
  resultChanged(): void {
    this.SerachCri = 0;
    this.Resultcitys = this.WithoutFilterCitys;
    if (this.city.cityNameENG !== null && this.city.cityNameENG !== '') {
      this.Resultcitys = this.Resultcitys.filter(SubResult =>
        SubResult.cityNameENG.toLowerCase().indexOf(this.city.cityNameENG.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.city.cityCode !== null && this.city.cityCode.toString() !== '') {
      this.Resultcitys = this.Resultcitys.filter(SubResult =>
        SubResult.cityCode.toString().toLowerCase().indexOf(this.city.cityCode.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.city.isActive !== null && this.city.isActive.toString() !== '-1') {
      if (this.city.isActive.toString() === '3') {
        this.Resultcitys = this.Resultcitys.filter(SubResultProd =>
          SubResultProd.isActive.toString() === 'Active' || SubResultProd.isActive.toString() === 'Inactive');
      } else {
        this.Resultcitys = this.Resultcitys.filter(SubResultProd =>
          SubResultProd.isActive.toString() === this.city.isActive.toString());
      }
      this.SerachCri = 1;
      console.log('cityCode');
      console.log(this.Resultcitys);
    }
    if (this.SerachCri === 0) {
      this.Resultcitys = this.WithoutFilterCitys;
    }
    this.citys = this.Resultcitys;
  }

  ExportToExcel(): void {
    alasql('SELECT cityCode City_Code,cityNameENG City_Name,' +
      'isActive Status INTO XLSX("cityList.xlsx",{headers:true}) FROM ?', [this.citys]);
  }
}