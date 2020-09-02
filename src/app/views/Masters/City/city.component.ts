import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../containers';
import { CityService } from '../../../Components/Services/Masters/CityService';
import { NgForm } from '@angular/forms';
import { City } from '../../../Components/Module/City';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  city: City;
  str: string;
  cityList: City[];
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private cityService: CityService, private router: Router) {
    const status = '';
  }
  ngOnInit() {
    status = '';
    this.route.paramMap.subscribe(parameterMap => { const id = +parameterMap.get('id'); this.getcountrys(id); });

  }
  save(countryForm: NgForm): void {
    if (status !== 'Update') {
      this.city.ID = this.cityService.getMaxCityId() + 1;
      this.cityService.Save(this.city);
    } else {
      this.cityService.Update(this.city);
    }
    this.router.navigate(['CityList']);

  }

  private getcountrys(Id: number) {

    console.log(Id);
    console.log(status);
    this.city = {
      ID: null,
      City_Code: null,
      CityGroup_Code: null,
      City_Name_ENG: null,
      City_Name_UNI: null,
      Thesil_Code: null,
      District_Code: null,
      Zip_Pin_Code: null,
      Sort_By: null,
      Is_Auto: null,
      Created_Date: null,
      Created_By: null,
      Is_Active: null,
      Modified_Date: null,
      Modified_By: null,

    };
    if (Id === null || Id === 0) {
      this.city = {
        ID: null,
        City_Code: null,
        CityGroup_Code: null,
        City_Name_ENG: null,
        City_Name_UNI: null,
        Thesil_Code: null,
        District_Code: null,
        Zip_Pin_Code: null,
        Sort_By: null,
        Is_Auto: null,
        Created_Date: null,
        Created_By: null,
        Is_Active: null,
        Modified_Date: null,
        Modified_By: null,
      };
      status = '';

    } else {

      this.city = this.cityService.getCity(Id)[0];
      status = 'Update';
    }
  }
}
