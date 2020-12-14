import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DistrictService } from '../../../Components/Services/Masters/DistrictService';
import { DistrictTransfarmer } from '../../../Components/Transformer/Masters/District-Transformer';
import { environment } from '../../../Components/Module/environment';
import * as alasql from 'alasql';
import { DistrictEntity } from '../../../Components/Module/Masters/District.Entity.model';
import { District } from '../../../Components/Module/Masters/District';
alasql['private'].externalXlsxLib = require('xlsx');

@Component({
  selector: 'app-district-list',
  templateUrl: './district-list.component.html',
  styleUrls: ['./district-list.component.scss']
})
export class DistrictListComponent implements OnInit {

  districts: District[];
  districtEntity: DistrictEntity[];
  WithoutFilterDistricts: District[];
  Resultdistrict: District[];
  SerachCri: number;
  district: District;
  config: { itemsPerPage: any; currentPage: number; totalItems: any; };
  env= environment;

  constructor(private _router: Router,
    private districtService: DistrictService,
    private districtTransfarmer: DistrictTransfarmer,
    private route: ActivatedRoute) {
      if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
        window.location.href='login';
      }
    this.districtEntity = this.route.snapshot.data['DistrictList'];
    this.districts = this.districtTransfarmer.DistrictTransfarmers(this.districtEntity);
    this.WithoutFilterDistricts = this.districts;
    this.config = {
      itemsPerPage: this.env.paginationPageSize,
      currentPage: 1,
      totalItems: this.districts.length
    };
  }
  ngOnInit() {
      this.WithoutFilterDistricts = this.districts;
     this.district = {
      ID: null,
      districtCode: null,
      districtNameEng: null,
      districtNameUni: null,
      stateCode: null,
      isActive: '3',
      createdBy:null,
      createdDate:null,
      modifiedBy:null,
      modifiedDate:null,
      sortBy:null,
    };
  }
  pageChanged(event) {
    this.config.currentPage = event;
  }
  resultChanged(): void {
    this.SerachCri = 0;
    this.Resultdistrict = this.WithoutFilterDistricts;
    if (this.district.districtNameEng !== null && this.district.districtNameEng !== '') {
      this.Resultdistrict = this.Resultdistrict.filter(SubResult =>
        SubResult.districtNameEng.toLowerCase().indexOf(this.district.districtNameEng.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
      console.log('districtNameEng');
    }
    if (this.district.districtCode !== null && this.district.districtCode.toString() !== '') {
      this.Resultdistrict = this.Resultdistrict.filter(SubResult =>
        SubResult.districtCode.toString().toLowerCase().indexOf(this.district.districtCode.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.district.isActive !== null && this.district.isActive.toString() !== '-1') {
      if (this.district.isActive.toString() === '3') {
        this.Resultdistrict = this.Resultdistrict.filter(SubResultProd =>
          SubResultProd.isActive.toString() === 'Active' || SubResultProd.isActive.toString() === 'Inactive');
      } else {
        this.Resultdistrict = this.Resultdistrict.filter(SubResultProd =>
          SubResultProd.isActive.toString() === this.district.isActive.toString());
      }
      this.SerachCri = 1;
      console.log('districtCode');
      console.log(this.Resultdistrict);
    }
    if (this.SerachCri === 0) {
      this.Resultdistrict = this.WithoutFilterDistricts;
    }
    this.districts = this.Resultdistrict;
    this.config = {
      itemsPerPage: this.env.paginationPageSize,
      currentPage: 1,
      totalItems: this.districts.length
    };
  }

  ExportToExcel(): void {
    alasql('SELECT districtCode District_Code,districtNameEng District_Name,' +
      'isActive Status INTO XLSX("districtList.xlsx",{headers:true}) FROM ?', [this.districts]);
  }
}
