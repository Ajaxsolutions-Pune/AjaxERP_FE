import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../containers';
import { NgForm } from '@angular/forms';
import { City } from '../../../Components/Module/City';
import { CityGroupService } from '../../../Components/Services/Masters/CityGroupService';
import { CityGroup } from '../../../Components/Module/Masters/CityGroup';

@Component({
  selector: 'app-citygroup',
  templateUrl: './city-group.component.html',
  styleUrls: ['./city-group.component.scss']
})
export class CityGroupComponent implements OnInit {
  citygroup: CityGroup;
  str: string;
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private citygroupService: CityGroupService, private router: Router) {
    const status = '';
  }

  ngOnInit() {
    status = '';
    this.route.paramMap.subscribe(parameterMap => { const id = +parameterMap.get('id'); this.getcitygroup(id); });

  }

  save(citygroupForm: NgForm): void {
    if (status !== 'Update') {
      this.citygroup.Id = this.citygroupService.getMaxCityGroupId() + 1;
      this.citygroupService.Save(this.citygroup);
    } else {
      this.citygroupService.Update(this.citygroup);
    }
    this.router.navigate(['CityGroupList']);

  }

  private getcitygroup(Id: number) {

    this.citygroup = {
      Id: null,
      CityGroup_Code: null,
      CityGroup_Name_ENG: null,
      CityGroup_Name_UNI: null,
      IsActive: true

    };
    if (Id === null || Id === 0) {
      this.citygroup = {
        Id: null,
        CityGroup_Code: null,
        CityGroup_Name_ENG: null,
        CityGroup_Name_UNI: null,
        IsActive: true
      };
      status = '';

    } else {

      this.citygroup = this.citygroupService.getCityGroup(Id)[0];
      status = 'Update';
    }
  }
}
