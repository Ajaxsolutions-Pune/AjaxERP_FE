import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { District } from '../../../Compound/Module/Masters/District';
import { DistrictService } from '../../../Compound/Services/Masters/DistrictService';

@Component({
  selector: 'app-district-list',
  templateUrl: './district-list.component.html',
  styleUrls: ['./district-list.component.scss']
})
export class DistrictListComponent implements OnInit {

  Districts: District;
  districts: District[];

  WithoutFilterCitys: District[];
  Resultdistrict: District[];
  SerachCri: number;
  district: District;
  WithoutFilterDistricts: any[];

  constructor(private_router:Router,
    private districtService: DistrictService,
    private route: ActivatedRoute) {
      this.districts = this.districtService.getDistricts();
      this.WithoutFilterDistricts = this.districts;
     }

  ngOnInit() {
    this.districts = this.districtService.getDistricts();
    this.district = {
      ID: null,
      districtCode: null,
      districtName: null,
      districtNameUni: null,
      stateCode:null,
      isActive:true,
      
    };
  }
  
  resultChanged(): void {
    this.SerachCri = 0;
    this.Resultdistrict = this.WithoutFilterDistricts;
    if (this.district.districtName !== null && this.district.districtName !== '') {
      this.Resultdistrict= this.Resultdistrict.filter(SubResult =>
        SubResult.districtName.toLowerCase().indexOf(this.district.districtName.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.district.districtCode !== null && this.district.districtCode.toString() !== '') {
      this.Resultdistrict = this.Resultdistrict.filter(SubResult =>
        SubResult.districtCode.toString().toLowerCase().indexOf(this.district.districtCode.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.Resultdistrict = this.WithoutFilterDistricts;
    }
    this.districts = this.Resultdistrict;
  }

  ExportToExcel(): void {
    alasql('SELECT Brand_Code,Brand_Id,Brand_Name_ENg,Brand_Name_Uni,CreatedBy,ModifiedBy,' +
      'CreDate,ModDate,IsActive INTO XLSX("brandList.xlsx",{headers:true}) FROM ?', [this.districts]);
  }
}
