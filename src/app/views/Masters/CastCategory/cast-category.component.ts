import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../containers';
import { CityService } from '../../../Components/Services/Masters/CityService';
import { NgForm } from '@angular/forms';
import { DistrictService } from '../../../Components/Services/Masters/DistrictService';
import { District } from '../../../Components/Module/Masters/District';
import { TaxCategory } from '../../../Components/Module/Masters/TaxCategory';
import { TaxCategoryService } from '../../../Components/Services/Masters/TaxCategoryService';
import { CastCategory } from '../../../Components/Module/Masters/CastCategory';
import { CastCategoryService } from '../../../Components/Services/Masters/CastCategoryService';

@Component({
  selector: 'app-castcategory',
  templateUrl: './cast-category.component.html',
  styleUrls: ['./cast-category.component.scss']
})
export class CastCategoryComponent implements OnInit {
  castcategory: CastCategory;
  str: string;
  castcategoryList: CastCategory[];
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private castcategoryService: CastCategoryService, private router: Router) {
    const status = '';
  }
  ngOnInit() {
    status = '';
    this.route.paramMap.subscribe(parameterMap => { const id = +parameterMap.get('id'); this.getcastcategorys(id); });

  }
  save(castcategoryForm: NgForm): void {
    if (status !== 'Update') {
      this.castcategory.Id = this.castcategoryService.getMaxTaxCategoryId() + 1;
      this.castcategoryService.Save(this.castcategory);
    } else {
      this.castcategoryService.Update(this.castcategory);
    }
    this.router.navigate(['CastCategoryList']);

  }

  private getcastcategorys(Id: number) {

    console.log(Id);
    console.log(status);
    this.castcategory = {
      Id: null,
      CastCategory_Code: null,
      CastCategory_Description_ENG: null,
      CastCategory_Description_UNI: null,
      IsActive: true,
    };

    if (Id === null || Id === 0) {
      this.castcategory = {
        Id: null,
        CastCategory_Code: null,
        CastCategory_Description_ENG: null,
        CastCategory_Description_UNI: null,
        IsActive: true,
      };

      status = '';

    } else {

      this.castcategory = this.castcategoryService.getCastCategory(Id)[0];
      status = 'Update';
    }
  }
}
