import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../containers';
import { NgForm } from '@angular/forms';
import { DistrictService } from '../../../Components/Services/Masters/DistrictService';
import { District } from '../../../Components/Module/Masters/District';
import { DistrictTransfarmer } from '../../../Components/Transformer/Masters/District-Transformer';
import { DistrictEntity } from '../../../Components/Module/Masters/DistrictEntity.model';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss']
})
export class DistrictComponent implements OnInit {
  district: District;
  str: string;
  districtList: District[];
  districtEntityEntity: DistrictEntity;
  obj: any;
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private districtTransfarmer: DistrictTransfarmer,
    private districtService: DistrictService, private router: Router) {
      this.districtEntityEntity = this.route.snapshot.data['District'];
    if (this.districtEntityEntity !== null && this.districtEntityEntity !== undefined) {
      this.district = this.districtTransfarmer.DistrictTransfarmerEntity(this.districtEntityEntity);

    }
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

    if (Id === null || Id === 0) {
      this.districtEntityEntity = {
        districtCode: null,
        districtName: null,
        districtNameUni: null,
        isActive: '1',
        stateCode: null,
      };
      this.district = {
        ID: null,
        districtCode: null,
        districtNameEng: null,
        districtNameUni: null,
        stateCode: null,
        isActive: '1',
      };

      status = '';

    } else {
      status = 'Update';
    }
  }
}
