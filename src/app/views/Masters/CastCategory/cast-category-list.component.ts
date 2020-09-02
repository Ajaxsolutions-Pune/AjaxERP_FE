import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { District } from '../../../Components/Module/Masters/District';
import { DistrictService } from '../../../Components/Services/Masters/DistrictService';
import { TaxCategory } from '../../../Components/Module/Masters/TaxCategory';
import { TaxCategoryService } from '../../../Components/Services/Masters/TaxCategoryService';
import { CastCategory } from '../../../Components/Module/Masters/CastCategory';
import { CastCategoryService } from '../../../Components/Services/Masters/CastCategoryService';

@Component({
  selector: 'app-castcategory-list',
  templateUrl: './cast-category-list.component.html',
  styleUrls: ['./cast-category-list.component.scss']
})
export class CastCategoryListComponent implements OnInit {
  castcategory: CastCategory;
  CastCategorys: CastCategory[];
  WithoutFilterCastCategorys: CastCategory[];
  Resultcastcategory: CastCategory[];
  SerachCri: number;
  WithoutFilterCastCategory: any[];
  Resultcastcategorys: any;

  constructor(private _router: Router,
    private castcategorysService: CastCategoryService,
    private route: ActivatedRoute) {
      if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
        this._router.navigate(['login']);
      }
    this.CastCategorys = this.castcategorysService.getCastCategorys();
    this.WithoutFilterCastCategorys = this.CastCategorys;
  }

  ngOnInit() {
    this.CastCategorys = this.castcategorysService.getCastCategorys();
    this.WithoutFilterCastCategorys = this.CastCategorys;
    console.log(this.CastCategorys);
    this.castcategory = {
      Id: null,
      CastCategory_Code: null,
      CastCategory_Description_ENG: null,
      CastCategory_Description_UNI: null,
      IsActive: true,
    };
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.Resultcastcategory = this.WithoutFilterCastCategorys;
    if (this.castcategory.CastCategory_Description_ENG !== null && this.castcategory.CastCategory_Description_ENG !== '') {
      this.Resultcastcategory = this.Resultcastcategory.filter(SubResult =>
        SubResult.CastCategory_Description_ENG.toLowerCase().
          indexOf(this.castcategory.CastCategory_Description_ENG.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.castcategory.CastCategory_Code !== null && this.castcategory.CastCategory_Code.toString() !== '') {
      this.Resultcastcategory = this.Resultcastcategory.filter(SubResult =>
        SubResult.CastCategory_Code.toString().toLowerCase().indexOf(this.castcategory.CastCategory_Code.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.Resultcastcategory = this.WithoutFilterCastCategorys;
    }
    this.CastCategorys = this.Resultcastcategory;
  }

  ExportToExcel(): void {
    alasql('SELECT Brand_Code,Brand_Id,Brand_Name_ENg,Brand_Name_Uni,CreatedBy,ModifiedBy,' +
      'CreDate,ModDate,IsActive INTO XLSX("brandList.xlsx",{headers:true}) FROM ?', [this.CastCategorys]);
  }
}
