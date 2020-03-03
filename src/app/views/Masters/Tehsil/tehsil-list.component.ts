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
import { Tehsil } from '../../../Compound/Module/Masters/Tehsil';
import { TehsilService } from '../../../Compound/Services/Masters/TehsilService';

@Component({
  selector: 'app-tehsil-list',
  templateUrl: './tehsil-list.component.html',
  styleUrls: ['./tehsil-list.component.scss']
})
export class TehsilListComponent implements OnInit {
  tehsil: Tehsil;
  Tehsils: Tehsil[];
  WithoutFilterTehsils: Tehsil[];
  Resultcast: Tehsil[];
  SerachCri: number;
  WithoutFilterTehsil: any[];
  Resulttehsils: any;
  Resulttehsil: any[];

  constructor(private_router:Router,
    private tehsilsService: TehsilService,
    private route: ActivatedRoute) {
      this.Tehsils = this.tehsilsService.getTehsils();
      this.WithoutFilterTehsil = this.Tehsils;
     }

  ngOnInit() {
    this.WithoutFilterTehsil = this.Tehsils;
    console.log(this.Tehsils);
    this.tehsil = {
      
      Id:null,
      Tehsil_Code:null,
      districtCode:null,
      TehsilName_ENG:null,
      TehsilName_UNI:null,
      IsActive:true,
    };
  }
  
  resultChanged(): void {
    this.SerachCri = 0;
    this.Resulttehsil = this.WithoutFilterTehsil;
    if (this.tehsil.TehsilName_ENG !== null && this.tehsil.TehsilName_ENG !== '') {
      this.Resulttehsil= this.Resulttehsil.filter(SubResult =>
        SubResult.Cast_Description_ENG.toLowerCase().indexOf(this.tehsil.TehsilName_ENG.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.tehsil.Tehsil_Code !== null && this.tehsil.Tehsil_Code.toString() !== '') {
      this.Resulttehsil = this.Resulttehsil.filter(SubResult =>
        SubResult.Tehsil_Code.toString().toLowerCase().indexOf(this.tehsil.Tehsil_Code.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.Resulttehsil = this.WithoutFilterTehsil;
    }
    this.Tehsils = this.Resulttehsil;
  }

  ExportToExcel(): void {
    alasql('SELECT Brand_Code,Brand_Id,Brand_Name_ENg,Brand_Name_Uni,CreatedBy,ModifiedBy,' +
      'CreDate,ModDate,IsActive INTO XLSX("brandList.xlsx",{headers:true}) FROM ?', [this.Tehsils]);
  }
}
