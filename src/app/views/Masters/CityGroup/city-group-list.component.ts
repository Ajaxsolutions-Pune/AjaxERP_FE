import { Component, OnInit, Input } from '@angular/core';
import { City } from '../../../Compound/Module/City';
import { CityService } from '../../../Compound/Services/Masters/CityService';
import { Router, ActivatedRoute } from '@angular/router';
import { CityGroup } from '../../../Compound/Module/Masters/CityGroup';
import { CityGroupService } from '../../../Compound/Services/Masters/CityGroupService';

@Component({
  selector: 'app-citygroup-list',
  templateUrl: './city-group-list.component.html',
  styleUrls: ['./city-group-list.component.scss']
})
export class CityGroupListComponent implements OnInit {

  CityGroups: CityGroup;
  citygroups: CityGroup[];

  WithoutFilterCityGroups: CityGroup[];
  Resultcitys: City[];
  SerachCri: number;
  citygroup: CityGroup;
  WithoutFilterCitys: any;
  Resultcitygroups: any;

  constructor(private_router:Router,
    private citygroupService: CityGroupService,
    private route: ActivatedRoute) {
      this.citygroups = this.citygroupService.getCityGroups();
      this.WithoutFilterCityGroups = this.citygroups;
     }

  ngOnInit() {
    this.citygroups = this.citygroupService.getCityGroups();
    this.citygroup = {
      Id:null,
      CityGroup_Code:null,
      CityGroup_Name_ENG:null,
      CityGroup_Name_UNI:null,
      IsActive:true,
  
    };
    console.log('CityGroup_Code '+ this.citygroup.CityGroup_Code);
    
    console.log('CityGroup_Name'+ this.citygroup.CityGroup_Name_ENG);
  }
  
  resultChanged(): void {
    this.SerachCri = 0;
    this.Resultcitygroups = this.WithoutFilterCityGroups;
    if (this.citygroup.CityGroup_Name_ENG !== null && this.citygroup.CityGroup_Name_ENG !== '') {
      this.Resultcitygroups= this.Resultcitygroups.filter(SubResult =>
        SubResult.CityGroup_Name_ENG.toLowerCase().indexOf(this.citygroup.CityGroup_Name_ENG.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.citygroup.CityGroup_Code !== null && this.citygroup.CityGroup_Code.toString() !== '') {
      this.Resultcitygroups = this.Resultcitygroups.filter(SubResult =>
        SubResult.CityGroup_Code.toString().toLowerCase().indexOf(this.citygroup.CityGroup_Code.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.Resultcitygroups = this.WithoutFilterCityGroups;
    }
    this.citygroups = this.Resultcitygroups;
  }

  ExportToExcel(): void {
    alasql('SELECT Brand_Code,Brand_Id,Brand_Name_ENg,Brand_Name_Uni,CreatedBy,ModifiedBy,' +
      'CreDate,ModDate,IsActive INTO XLSX("brandList.xlsx",{headers:true}) FROM ?', [this.citygroups]);
  }
}