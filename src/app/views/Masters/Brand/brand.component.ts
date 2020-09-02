import { Component, OnInit } from '@angular/core';
import { Brand } from '../../../Components/Module/Masters/Brand.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../containers';
import { BrandService } from '../../../Components/Services/Masters/BrandService';
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
    this.route.paramMap.subscribe(parameterMap => { const id = +parameterMap.get('id'); this.getcountrys(id.toString()); });

  }
  save(countryForm: NgForm): void {
    console.log(status);
    if (status !== 'Update') {
      this.brand.brandCode = null;
      this.brandService.Save(this.brand).subscribe(
        () => {
          countryForm.reset();
          this.defaultLayoutComponent.Massage('Insert Sucsessfuly',
            'Data saved successfully !', 'modal-info');
          this.router.navigate(['BrandList']);
        }
      );
    } else {
      this.brandService.Update(this.brand);
    }
    this.router.navigate(['BrandList']);

  }

  private getcountrys(Id: string) {
    this.brand = {
      manufactureCode: null,
      brandCode: null,
      brandDesc: null,
      brandDescUni: null,
      isActive: 1
    };
    console.log(Id);
    if (Id === null || Id === '' || Id === '0') {
      this.brand = {
        manufactureCode: null,
        brandCode: null,
        brandDesc: null,
        brandDescUni: null,
        isActive: 1
      };
      status = '';

    } else {
      this.brand = this.brandService.getBrand(Id)[0];
      status = 'Update';
    }
  }
}
