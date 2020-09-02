import { Component, OnInit, Input } from '@angular/core';
import { City } from '../../../Components/Module/City';
import { CityService } from '../../../Components/Services/Masters/CityService';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {

  Citys: City;
  citys: City[];

  WithoutFilterCitys: City[];
  Resultcitys: City[];
  SerachCri: number;
  city: City;

  constructor(private _router: Router,
    private cityService: CityService,
    private route: ActivatedRoute) {
      if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
        this._router.navigate(['login']);
      }
    this.citys = this.cityService.getCitys();
    this.WithoutFilterCitys = this.citys;
  }

  ngOnInit() {
    this.citys = this.cityService.getCitys();
    this.city = {
      ID: null,
      City_Code: null,
      City_Name_ENG: null,
      City_Name_UNI: null,
      CityGroup_Code: null,
      District_Code: null,
      Is_Active: null,
      Is_Auto: null,
      Sort_By: null,
      Thesil_Code: null,
      Zip_Pin_Code: null,
      Created_By: null,
      Created_Date: null,
      Modified_By: null,
      Modified_Date: null,
    };
    console.log('City_Code ' + this.city.City_Code);

    console.log('City_Name' + this.city.City_Name_ENG);
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.Resultcitys = this.WithoutFilterCitys;
    if (this.city.City_Name_ENG !== null && this.city.City_Name_ENG !== '') {
      this.Resultcitys = this.Resultcitys.filter(SubResult =>
        SubResult.City_Name_ENG.toLowerCase().indexOf(this.city.City_Name_ENG.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.city.City_Code !== null && this.city.City_Code.toString() !== '') {
      this.Resultcitys = this.Resultcitys.filter(SubResult =>
        SubResult.City_Code.toString().toLowerCase().indexOf(this.city.City_Code.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.Resultcitys = this.WithoutFilterCitys;
    }
    this.citys = this.Resultcitys;
  }

  ExportToExcel(): void {
    alasql('SELECT Brand_Code,Brand_Id,Brand_Name_ENg,Brand_Name_Uni,CreatedBy,ModifiedBy,' +
      'CreDate,ModDate,IsActive INTO XLSX("brandList.xlsx",{headers:true}) FROM ?', [this.citys]);
  }
}
