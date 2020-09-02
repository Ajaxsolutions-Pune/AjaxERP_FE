import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { District } from '../../../Components/Module/Masters/District';
import { DistrictService } from '../../../Components/Services/Masters/DistrictService';
import { TaxCategory } from '../../../Components/Module/Masters/TaxCategory';
import { TaxCategoryService } from '../../../Components/Services/Masters/TaxCategoryService';
import { CastCategory } from '../../../Components/Module/Masters/CastCategory';
import { CastCategoryService } from '../../../Components/Services/Masters/CastCategoryService';
import { ItemCategory } from '../../../Components/Module/Masters/ItemCategory';
import { ItemCategoryService } from '../../../Components/Services/Masters/ItemCategoryService';

@Component({
  selector: 'app-itemcategory-list',
  templateUrl: './item-category-list.component.html',
  styleUrls: ['./item-category-list.component.scss']
})
export class ItemCategoryListComponent implements OnInit {
  itemcategory: ItemCategory;
  ItemCategorys: ItemCategory[];
  WithoutFilterItemCategorys: ItemCategory[];
  Resultitemcategorys: ItemCategory[];
  SerachCri: number;

  constructor(private _router: Router,
    private itemcategorysService: ItemCategoryService,
    private route: ActivatedRoute) {
      if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
        this._router.navigate(['login']);
      }
    this.ItemCategorys = this.itemcategorysService.getItemCategorys();
    this.WithoutFilterItemCategorys = this.ItemCategorys;
  }

  ngOnInit() {
    this.ItemCategorys = this.itemcategorysService.getItemCategorys();
    this.WithoutFilterItemCategorys = this.ItemCategorys;
    this.itemcategory = {
      Id: null,
      oUCode: null,
      itemCategoryCode: null,
      itemCategoryNameEng: null,
      itemCategoryNameUni: null,
      isActive: true,
    };
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.Resultitemcategorys = this.WithoutFilterItemCategorys;
    if (this.itemcategory.itemCategoryNameEng !== null && this.itemcategory.itemCategoryNameEng !== '') {
      this.Resultitemcategorys = this.Resultitemcategorys.filter(SubResult =>
        SubResult.itemCategoryNameEng.toLowerCase().indexOf(this.itemcategory.itemCategoryNameEng.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.itemcategory.itemCategoryCode !== null && this.itemcategory.itemCategoryCode.toString() !== '') {
      this.Resultitemcategorys = this.Resultitemcategorys.filter(SubResult =>
        SubResult.itemCategoryCode.toString().toLowerCase().indexOf(this.itemcategory.itemCategoryCode.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.Resultitemcategorys = this.WithoutFilterItemCategorys;
    }
    this.Resultitemcategorys = this.Resultitemcategorys;
  }

  ExportToExcel(): void {
    alasql('SELECT Brand_Code,Brand_Id,Brand_Name_ENg,Brand_Name_Uni,CreatedBy,ModifiedBy,' +
      'CreDate,ModDate,IsActive INTO XLSX("brandList.xlsx",{headers:true}) FROM ?', [this.itemcategory]);
  }
}
