import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { District } from '../../../Components/Module/Masters/District';
import { DistrictService } from '../../../Components/Services/Masters/DistrictService';
import { TaxCategory } from '../../../Components/Module/Masters/TaxCategory';
import { TaxCategoryService } from '../../../Components/Services/Masters/TaxCategoryService';
import { CastCategory } from '../../../Components/Module/Masters/CastCategory';
import { CastCategoryService } from '../../../Components/Services/Masters/CastCategoryService';
import { Cast } from '../../../Components/Module/Masters/Cast';
import { CastService } from '../../../Components/Services/Masters/CastService';

@Component({
  selector: 'app-cast-list',
  templateUrl: './cast-list.component.html',
  styleUrls: ['./cast-list.component.scss']
})
export class CastListComponent implements OnInit {
  cast: Cast;
  Casts: Cast[];
  WithoutFilterCasts: Cast[];
  Resultcast: Cast[];
  SerachCri: number;
  WithoutFilterCast: any[];
  Resultcasts: any;

  constructor(private _router: Router,
    private castsService: CastService,
    private route: ActivatedRoute) {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      this._router.navigate(['login']);
    }
    this.Casts = this.castsService.getCasts();
    this.WithoutFilterCasts = this.Casts;
  }

  ngOnInit() {
    this.Casts = this.castsService.getCasts();
    this.WithoutFilterCasts = this.Casts;
    console.log(this.Casts);
    this.cast = {
      CastCategory: null,
      Id: null,
      Cast_Code: null,
      Cast_Description_ENG: null,
      Cast_Description_UNI: null,
      IsActive: true,
    };
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.Resultcast = this.WithoutFilterCasts;
    if (this.cast.Cast_Description_ENG !== null && this.cast.Cast_Description_ENG !== '') {
      this.Resultcast = this.Resultcast.filter(SubResult =>
        SubResult.Cast_Description_ENG.toLowerCase().indexOf(this.cast.Cast_Description_ENG.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.cast.Cast_Code !== null && this.cast.Cast_Code.toString() !== '') {
      this.Resultcast = this.Resultcast.filter(SubResult =>
        SubResult.Cast_Code.toString().toLowerCase().indexOf(this.cast.Cast_Code.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.Resultcast = this.WithoutFilterCasts;
    }
    this.Casts = this.Resultcast;
  }

  ExportToExcel(): void {
    alasql('SELECT Brand_Code,Brand_Id,Brand_Name_ENg,Brand_Name_Uni,CreatedBy,ModifiedBy,' +
      'CreDate,ModDate,IsActive INTO XLSX("brandList.xlsx",{headers:true}) FROM ?', [this.Casts]);
  }
}
