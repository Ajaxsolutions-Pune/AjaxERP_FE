import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { District } from '../../../Compound/Module/Masters/District';
import { DistrictService } from '../../../Compound/Services/Masters/DistrictService';
import { TaxCategory } from '../../../Compound/Module/Masters/TaxCategory';
import { TaxCategoryService } from '../../../Compound/Services/Masters/TaxCategoryService';
import { CastCategory } from '../../../Compound/Module/Masters/CastCategory';
import { CastCategoryService } from '../../../Compound/Services/Masters/CastCategoryService';
import { Cast } from '../../../Compound/Module/Masters/Cast';
import { CastService } from '../../../Compound/Services/Masters/CastService';

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

  constructor(private_router:Router,
    private castsService: CastService,
    private route: ActivatedRoute) {
      this.Casts = this.castsService.getCasts();
      this.WithoutFilterCasts = this.Casts;
     }

  ngOnInit() {
    this.Casts = this.castsService.getCasts();
    this.WithoutFilterCasts = this.Casts;
    console.log(this.Casts);
    this.cast = {
      CastCategory:null,
      Id:null,
      Cast_Code:null,
      Cast_Description_ENG:null,
      Cast_Description_UNI:null,
      IsActive:true,
    };
  }
  
  resultChanged(): void {
    this.SerachCri = 0;
    this.Resultcast = this.WithoutFilterCasts;
    if (this.cast.Cast_Description_ENG !== null && this.cast.Cast_Description_ENG !== '') {
      this.Resultcast= this.Resultcast.filter(SubResult =>
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