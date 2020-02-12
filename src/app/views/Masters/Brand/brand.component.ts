import { Component, OnInit } from '@angular/core';
import { Brand } from '../../../Compound/Module/Masters/Brand.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../containers';
import { BrandService } from '../../../Compound/Services/Masters/BrandService';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  brand: Brand;
  str: string;
  brandList: Brand[];
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private brandService: BrandService, private router: Router) {
    const status = '';
  }
  ngOnInit() {
    status = '';
    this.route.paramMap.subscribe(parameterMap => { const id = +parameterMap.get('id'); this.getcountrys(id); });

  }
  save(countryForm: NgForm): void {
    if (status !== 'Update') {
      this.brand.Brand_Id = this.brandService.getMaxBrandId() + 1;
      this.brandService.Save(this.brand);
    } else {
      this.brandService.Update(this.brand);
    }
    this.router.navigate(['BrandList']);

  }

  private getcountrys(Id: number) {

    console.log(Id);
    console.log(status);
    this.brand = {
      Brand_Id: null,
      Brand_Code: null,
      Brand_Name_ENg: null,
      Brand_Name_Uni: null,
      CreDate: null,
      CreatedBy: null,
      IsActive: null,
      ModDate: null,
      ModifiedBy: null,

    };
    if (Id === null || Id === 0) {
      this.brand = {
        Brand_Id: null,
        Brand_Code: null,
        Brand_Name_ENg: null,
        Brand_Name_Uni: null,
        CreDate: null,
        CreatedBy: null,
        IsActive: null,
        ModDate: null,
        ModifiedBy: null,
      };
      status = '';

    } else {

      this.brand = this.brandService.getBrand(Id)[0];
      status = 'Update';
    }
  }
}
