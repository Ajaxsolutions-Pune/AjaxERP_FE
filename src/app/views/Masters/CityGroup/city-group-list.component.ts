import { Component, OnInit, Input } from '@angular/core';
import { City } from '../../../Components/Module/City';
import { CityService } from '../../../Components/Services/Masters/CityService';
import { Router, ActivatedRoute } from '@angular/router';
import { CityGroup, CityGroupEntity } from '../../../Components/Module/Masters/CityGroup';
import { CityGroupService } from '../../../Components/Services/Masters/CityGroupService';
import { CityGroupTransfarmer } from '../../../Components/Transformer/Masters/CityGroup-Transfarmer';
import * as alasql from 'alasql';
import { environment } from '../../../Components/Module/environment';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
alasql['private'].externalXlsxLib = require('xlsx');

@Component({
  selector: 'app-citygroup-list',
  templateUrl: './city-group-list.component.html',
  styleUrls: ['./city-group-list.component.scss']
})
export class CityGroupListComponent implements OnInit {

  citygroups:  CityGroup[];
  cityGroupEntity:  CityGroupEntity[];
  WithoutFilterCityGroups:  CityGroup[];
  ResultcityGroup:  CityGroup[];
  SerachCri: number;
  citygroup:  CityGroup;
  config: { itemsPerPage: any; currentPage: number; totalItems: any; };
  env= environment;


  constructor(private _router: Router,
    private citygroupService: CityGroupService,
    private citygroupTransfarmer: CityGroupTransfarmer,
    private globalService:GlobalService,
    private route: ActivatedRoute) {
      if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
        window.location.href='login';
      }
      this.cityGroupEntity = this.route.snapshot.data['CityGroup'];
      this.citygroups = this.citygroupTransfarmer.CityGroupTransfarmers(this.cityGroupEntity);
      this.WithoutFilterCityGroups = this.citygroups;
      this.config = {
        itemsPerPage: this.env.paginationPageSize,
        currentPage: 1,
        totalItems: this.citygroups.length
      };
  }

  ngOnInit() {
    this.WithoutFilterCityGroups = this.citygroups;
    this.citygroup = {
      CityGroup_Code: null,
      CityGroup_Name_ENG: null,
      CityGroup_Name_UNI: null,
      IsActive: '3', 
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
    this.ResultcityGroup = this.WithoutFilterCityGroups;
    if (this.citygroup.CityGroup_Code !== null && this.citygroup.CityGroup_Code.toString() !== '') {
      this.ResultcityGroup = this.ResultcityGroup.filter(SubResult =>
        SubResult.CityGroup_Code.toString().toLowerCase().indexOf(this.citygroup.CityGroup_Code.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.citygroup.CityGroup_Name_ENG !== null && this.citygroup.CityGroup_Name_ENG !== '') {
      this.ResultcityGroup = this.ResultcityGroup.filter(SubResult =>
        SubResult.CityGroup_Name_ENG.toLowerCase().indexOf(this.citygroup.CityGroup_Name_ENG.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.citygroup.IsActive !== null && this.citygroup.IsActive.toString() !== '-1') {
      if (this.citygroup.IsActive.toString() === '3') {
        this.ResultcityGroup = this.ResultcityGroup.filter(SubResultProd =>
          SubResultProd.IsActive.toString() === 'Active' || SubResultProd.IsActive.toString() === 'Inactive');
      } else {
        this.ResultcityGroup = this.ResultcityGroup.filter(SubResultProd =>
          SubResultProd.IsActive.toString() === this.citygroup.IsActive.toString());
      }
      this.SerachCri = 1;
      console.log('CityGroup_Code');
      console.log(this.ResultcityGroup);
    }
   
    if (this.SerachCri === 0) {
      this.ResultcityGroup = this.WithoutFilterCityGroups;
    }
    this.citygroups = this.ResultcityGroup;
  }

  ExportToExcel(): void {
    alasql('SELECT CityGroup_Code CityGroup_Code,CityGroup_Name_ENG CityGroup_Name,' +
      'IsActive Status INTO XLSX("cityGroupList.xlsx",{headers:true}) FROM ?', [this.citygroups]);
  }
}
