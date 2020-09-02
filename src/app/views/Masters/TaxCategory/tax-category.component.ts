import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../containers';
import { CityService } from '../../../Components/Services/Masters/CityService';
import { NgForm } from '@angular/forms';
import { DistrictService } from '../../../Components/Services/Masters/DistrictService';
import { District } from '../../../Components/Module/Masters/District';
import { TaxCategory } from '../../../Components/Module/Masters/TaxCategory';
import { TaxCategoryService } from '../../../Components/Services/Masters/TaxCategoryService';

@Component({
  selector: 'app-taxcategory',
  templateUrl: './tax-category.component.html',
  styleUrls: ['./tax-category.component.scss']
})
export class TaxCategoryComponent implements OnInit {
  taxcategory: TaxCategory;
  str: string;
  taxcategoryList: TaxCategory[];
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private taxcategoryService: TaxCategoryService, private router: Router) {
    const status = '';
  }
  ngOnInit() {
    status = '';
    this.route.paramMap.subscribe(parameterMap => { const id = +parameterMap.get('id'); this.gettaxcategorys(id); });

  }
  save(taxcategoryForm: NgForm): void {
    if (status !== 'Update') {
      this.taxcategory.Id = this.taxcategoryService.getMaxTaxCategoryId() + 1;
      this.taxcategoryService.Save(this.taxcategory);
    } else {
      this.taxcategoryService.Update(this.taxcategory);
    }
    this.router.navigate(['TaxCategoryList']);

  }

  private gettaxcategorys(Id: number) {

    console.log(Id);
    console.log(status);
    this.taxcategory = {
      Id: null,
      TaxCategory_Code: null,
      TaxCategory_Description: null,
      IsActive: true,

    };

    if (Id === null || Id === 0) {
      this.taxcategory = {
        Id: null,
        TaxCategory_Code: null,
        TaxCategory_Description: null,
        IsActive: true,
      };

      status = '';

    } else {

      this.taxcategory = this.taxcategoryService.getTaxCategory(Id)[0];
      status = 'Update';
    }
  }
}
