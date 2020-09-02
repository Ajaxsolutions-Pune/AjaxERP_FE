import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { District } from '../../../Components/Module/Masters/District';
import { DistrictService } from '../../../Components/Services/Masters/DistrictService';
import { TaxCategory } from '../../../Components/Module/Masters/TaxCategory';
import { TaxCategoryService } from '../../../Components/Services/Masters/TaxCategoryService';

@Component({
  selector: 'app-taxcategory-list',
  templateUrl: './tax-category-list.component.html',
  styleUrls: ['./tax-category-list.component.scss']
})
export class TaxCategoryListComponent implements OnInit {

  TaxCategory: TaxCategory;
  taxcategorys: TaxCategory[];
  Resultdistrict: TaxCategory[];
  SerachCri: number;
  taxcategory: TaxCategory;
  WithoutFilterTaxCategorys: any[];
  Resulttaxcategory: TaxCategory[];

  constructor(private _router: Router,
    private taxcategorysService: TaxCategoryService,
    private route: ActivatedRoute) {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      this._router.navigate(['login']);
    }
    this.taxcategorys = this.taxcategorysService.getTaxCategorys();
    this.WithoutFilterTaxCategorys = this.taxcategorys;
  }

  ngOnInit() {
    this.taxcategorys = this.taxcategorysService.getTaxCategorys();
    this.WithoutFilterTaxCategorys = this.taxcategorys;
    console.log(this.taxcategorys);
    this.TaxCategory = {
      Id: null,
      TaxCategory_Code: null,
      TaxCategory_Description: null,
      IsActive: true,
    };
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.Resulttaxcategory = this.WithoutFilterTaxCategorys;
    if (this.TaxCategory.TaxCategory_Description !== null && this.TaxCategory.TaxCategory_Description !== '') {
      this.Resulttaxcategory = this.Resulttaxcategory.filter(SubResult =>
        SubResult.TaxCategory_Description.toLowerCase().indexOf(this.TaxCategory.TaxCategory_Description.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.TaxCategory.TaxCategory_Code !== null && this.TaxCategory.TaxCategory_Code.toString() !== '') {
      this.Resulttaxcategory = this.Resulttaxcategory.filter(SubResult =>
        SubResult.TaxCategory_Code.toString().toLowerCase().indexOf(this.TaxCategory.TaxCategory_Code.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.Resulttaxcategory = this.WithoutFilterTaxCategorys;
    }
    this.taxcategorys = this.Resulttaxcategory;
  }

  ExportToExcel(): void {
    alasql('SELECT Brand_Code,Brand_Id,Brand_Name_ENg,Brand_Name_Uni,CreatedBy,ModifiedBy,' +
      'CreDate,ModDate,IsActive INTO XLSX("brandList.xlsx",{headers:true}) FROM ?', [this.taxcategorys]);
  }
}
