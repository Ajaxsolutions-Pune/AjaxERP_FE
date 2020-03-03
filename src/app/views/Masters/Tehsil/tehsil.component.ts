import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../containers';
import {CityService } from '../../../Compound/Services/Masters/CityService';
import { NgForm } from '@angular/forms';
import { CastCategoryService } from '../../../Compound/Services/Masters/CastCategoryService';
import { Cast } from '../../../Compound/Module/Masters/Cast';
import { CastService } from '../../../Compound/Services/Masters/CastService';
import { CastCategory } from '../../../Compound/Module/Masters/CastCategory';
import { Tehsil } from '../../../Compound/Module/Masters/Tehsil';
import { DistrictService } from '../../../Compound/Services/Masters/DistrictService';
import { TehsilService } from '../../../Compound/Services/Masters/TehsilService';
import { District } from '../../../Compound/Module/Masters/District';

@Component({
  selector: 'app-tehsil',
  templateUrl: './tehsil.component.html',
  styleUrls: ['./tehsil.component.scss']
})
export class TehsilComponent implements OnInit {
  tehsil: Tehsil;
  str: string;
  tehsilList: Tehsil[];
  districtDrpList: District[];
  districtCodeDrpList: District[];
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    districtService: DistrictService,
    private tehsilService:TehsilService, private router: Router) {
      this.districtCodeDrpList =districtService.getDistricts(); 
    const status = '';
  }
  ngOnInit() {
    status = '';
    this.tehsil = {
      Id:null,
    districtCode:null,
    TehsilName_ENG:null,
    TehsilName_UNI:null,
    Tehsil_Code:null,
    IsActive:true,
  };
    this.route.paramMap.subscribe(parameterMap => { const id = +parameterMap.get('id'); this.gettehsils(id); });

  }
  save(tehsilForm: NgForm): void {
    if (status !== 'Update') {
      this.tehsil.Id = this.tehsilService.getMaxTehsilId() + 1;
      this.tehsilService.Save(this.tehsil);
    } else {
      this.tehsilService.Update(this.tehsil);
    }
    this.router.navigate(['TehsilList']);

  }

  private gettehsils(Id: number) {

    console.log(Id);
    console.log(status);
    this.tehsil = {
      Id:null,
    districtCode:null,
    TehsilName_ENG:null,
    TehsilName_UNI:null,
    Tehsil_Code:null,
    IsActive:true,
  };
  
  if (Id === null || Id === 0) {
    this.tehsil = {
      Id:1,
    districtCode:null,
    TehsilName_ENG:null,
    TehsilName_UNI:null,
    Tehsil_Code:null,
    IsActive:true,
  };
  
      status = '';

    } else {

      this.tehsil = this.tehsilService.getTehsil(Id)[0];
      status = 'Update';
    }
  }
}
