import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../containers';
import {CityService } from '../../../Compound/Services/Masters/CityService';
import { NgForm } from '@angular/forms';
import { DistrictService } from '../../../Compound/Services/Masters/DistrictService';
import { District } from '../../../Compound/Module/Masters/District';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss']
})
export class DistrictComponent implements OnInit {
  district: District;
  str: string;
  districtList: District[];
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private districtService:DistrictService, private router: Router) {
    const status = '';
  }
  ngOnInit() {
    status = '';
    this.route.paramMap.subscribe(parameterMap => { const id = +parameterMap.get('id'); this.getdistricts(id); });

  }
  save(districtForm: NgForm): void {
    if (status !== 'Update') {
      this.district.ID = this.districtService.getMaxDistrictId() + 1;
      this.districtService.Save(this.district);
    } else {
      this.districtService.Update(this.district);
    }
    this.router.navigate(['DistrictList']);

  }

  private getdistricts(Id: number) {

    console.log(Id);
    console.log(status);
    this.district = {
    ID:null, 
    districtCode:null,
    districtName:null,
    districtNameUni:null,
    stateCode:null,
    isActive:true,

  
  };
  
  if (Id === null || Id === 0) {
    this.district = {
    ID:null, 
    districtCode:null,
    districtName:null,
    districtNameUni:null,
    stateCode:null,
    isActive:true,
    };
  
      status = '';

    } else {

      this.district = this.districtService.getDistrict(Id)[0];
      status = 'Update';
    }
  }
}
