import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BrandService } from '../../../Components/Services/Masters/BrandService';
import { Brand } from '../../../Components/Module/Masters/Brand.model';
import { BrandTransformer } from '../../../Components/Transformer/Masters/Brand-Transformer';

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
    objTrans: BrandTransformer,
    private route: ActivatedRoute) {
      if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
        this._router.navigate(['login']);
      }
      this.brands = this.route.snapshot.data['BrandList'];
  }

  ngOnInit() {
    this.brandService.getBrands().subscribe(
      (par) => this.brands = par,
      (err: any) => console.log(err));
    this.WithoutFilterBrands = this.brands;
    console.log(this.brands);
    this.brand = {
      manufactureCode: null,
      brandCode: null,
      brandDesc: null,
      brandDescUni: null,
      isActive: 1
    };
    console.log(this.brands);
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.Resultbrands = this.WithoutFilterBrands;
    if (this.brand.brandDesc !== null && this.brand.brandDesc !== '') {
      this.Resultbrands = this.Resultbrands.filter(SubResult =>
        SubResult.brandDesc.toLowerCase().indexOf(this.brand.brandDesc.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.brand.brandCode !== null && this.brand.brandCode.toString() !== '') {
      this.Resultbrands = this.Resultbrands.filter(SubResult =>
        SubResult.brandCode.toString().toLowerCase().indexOf(this.brand.brandCode.toString().toLowerCase()) !== -1);
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
