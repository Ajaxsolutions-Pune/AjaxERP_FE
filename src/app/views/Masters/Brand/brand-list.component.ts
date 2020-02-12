import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BrandService } from '../../../Compound/Services/Masters/BrandService';
import { Brand } from '../../../Compound/Module/Masters/Brand.model';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements OnInit {
  @Input() BrandInput: Brand;
  brands: Brand[];

  WithoutFilterBrands: Brand[];
  Resultbrands: Brand[];
  SerachCri: number;
  brand: Brand;

  constructor(private _router: Router,
    private brandService: BrandService,
    private route: ActivatedRoute) {
    this.brands = this.brandService.getBrands();
    this.WithoutFilterBrands = this.brands;
  }

  ngOnInit() {
    this.brands = this.brandService.getBrands();
    this.WithoutFilterBrands = this.brands;
    this.brand = {
      Brand_Code: null,
      Brand_Id: null,
      Brand_Name_ENg: null,
      Brand_Name_Uni: null,
      CreatedBy: null,
      ModifiedBy: null,
      CreDate: null,
      ModDate: null,
      IsActive: null
    };
    console.log(this.brands);
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.Resultbrands = this.WithoutFilterBrands;
    if (this.brand.Brand_Name_ENg !== null && this.brand.Brand_Name_ENg !== '') {
      this.Resultbrands = this.Resultbrands.filter(SubResult =>
        SubResult.Brand_Name_ENg.toLowerCase().indexOf(this.brand.Brand_Name_ENg.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.brand.Brand_Code !== null && this.brand.Brand_Code.toString() !== '') {
      this.Resultbrands = this.Resultbrands.filter(SubResult =>
        SubResult.Brand_Code.toString().toLowerCase().indexOf(this.brand.Brand_Code.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.Resultbrands = this.WithoutFilterBrands;
    }
    this.brands = this.Resultbrands;
  }

  ExportToExcel(): void {
    alasql('SELECT Brand_Code,Brand_Id,Brand_Name_ENg,Brand_Name_Uni,CreatedBy,ModifiedBy,' +
      'CreDate,ModDate,IsActive INTO XLSX("brandList.xlsx",{headers:true}) FROM ?', [this.brands]);
  }
}
