import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Tehsil, TehsilEntity } from '../../../Components/Module/Masters/Tehsil';
import { TehsilService } from '../../../Components/Services/Masters/TehsilService';
import { TehsilTransfarmer } from '../../../Components/Transformer/Masters/Tehsil-Transfarmer';

@Component({
  selector: 'app-tehsil-list',
  templateUrl: './tehsil-list.component.html',
  styleUrls: ['./tehsil-list.component.scss']
})
export class TehsilListComponent implements OnInit {

  tehsils: Tehsil[];
  tehsilsEntity: TehsilEntity[];

  WithoutFilterCitys: Tehsil[];
  resultTehsil: Tehsil[];
  SerachCri: number;
  tehsil: Tehsil;
  WithoutFilterTehsils: any[];

  constructor(private _router: Router,
    private tehsilsService: TehsilService,
    private tehsilsTransfarmer: TehsilTransfarmer,
    private route: ActivatedRoute) {
      if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
        this._router.navigate(['login']);
      }
    this.tehsilsEntity = this.route.snapshot.data['TehsilList'];
    this.tehsils = this.tehsilsTransfarmer.TehsilTransfarmers(this.tehsilsEntity);
    this.WithoutFilterTehsils = this.tehsils;
  }

  ngOnInit() {
    this.tehsilsService.getTehsils().subscribe(
      (par) => this.tehsils = par,
      (err: any) => console.log(err));
    this.tehsil = {
      tehsilCode: null,
      districtCode: null,
      isActive: null,
      tehsilNameEng: null,
      tehsilNameUni: null,

    };
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.resultTehsil = this.WithoutFilterTehsils;
    if (this.tehsil.tehsilNameEng !== null && this.tehsil.tehsilNameEng !== '') {
      this.resultTehsil = this.resultTehsil.filter(SubResult =>
        SubResult.tehsilNameEng.toLowerCase().indexOf(this.tehsil.tehsilNameEng.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.tehsil.tehsilCode !== null && this.tehsil.tehsilCode.toString() !== '') {
      this.resultTehsil = this.resultTehsil.filter(SubResult =>
        SubResult.tehsilCode.toString().toLowerCase().indexOf(this.tehsil.tehsilCode.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.resultTehsil = this.WithoutFilterTehsils;
    }
    this.tehsils = this.resultTehsil;
  }

  ExportToExcel(): void {
    alasql('SELECT Brand_Code,Brand_Id,Brand_Name_ENg,Brand_Name_Uni,CreatedBy,ModifiedBy,' +
      'CreDate,ModDate,IsActive INTO XLSX("brandList.xlsx",{headers:true}) FROM ?', [this.tehsils]);
  }
}
