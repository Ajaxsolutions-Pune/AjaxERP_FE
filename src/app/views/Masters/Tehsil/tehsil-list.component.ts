import { Router, ActivatedRoute } from '@angular/router';
import { Tehsil, TehsilEntity } from '../../../Components/Module/Masters/Tehsil';
import { TehsilService } from '../../../Components/Services/Masters/TehsilService';
import { TehsilTransfarmer } from '../../../Components/Transformer/Masters/Tehsil-Transfarmer';
import * as alasql from 'alasql';
import { environment } from '../../../Components/Module/environment';
import { Component, OnInit } from '@angular/core';
alasql['private'].externalXlsxLib = require('xlsx');

@Component({
  selector: 'app-tehsil-list',
  templateUrl: './tehsil-list.component.html',
  styleUrls: ['./tehsil-list.component.scss']
})
export class TehsilListComponent implements OnInit {

  tehsils: Tehsil[];
  tehsilsEntity: TehsilEntity[];

  WithoutFilterTehsils: Tehsil[];
  Resulttehsil: Tehsil[];
  SerachCri: number;
  tehsil: Tehsil;
  config: { itemsPerPage: any; currentPage: number; totalItems: any; };
  env= environment;

  constructor(private _router: Router,
    private tehsilsService: TehsilService,
    private tehsilsTransfarmer: TehsilTransfarmer,
    private route: ActivatedRoute) {
      if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
        window.location.href='login';
      }
    this.tehsilsEntity = this.route.snapshot.data['TehsilList'];
    this.tehsils = this.tehsilsTransfarmer.TehsilTransfarmers(this.tehsilsEntity);
    this.WithoutFilterTehsils = this.tehsils;
    this.config = {
      itemsPerPage: this.env.paginationPageSize,
      currentPage: 1,
      totalItems: this.tehsils.length
    };
  }

  ngOnInit() {
    this.WithoutFilterTehsils = this.tehsils;
    this.tehsil = {
      tehsilCode: null,
      districtCode: null,
      isActive: '3',
      tehsilNameEng: null,
      tehsilNameUni: null,
      

    };
  }
  pageChanged(event) {
    this.config.currentPage = event;
  }
  resultChanged(): void {
    this.SerachCri = 0;
    this.Resulttehsil = this.WithoutFilterTehsils;
    if (this.tehsil.tehsilNameEng !== null && this.tehsil.tehsilNameEng !== '') {
      this.Resulttehsil = this.Resulttehsil.filter(SubResult =>
        SubResult.tehsilNameEng.toLowerCase().indexOf(this.tehsil.tehsilNameEng.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.tehsil.tehsilCode !== null && this.tehsil.tehsilCode.toString() !== '') {
      this.Resulttehsil = this.Resulttehsil.filter(SubResult =>
        SubResult.tehsilCode.toString().toLowerCase().indexOf(this.tehsil.tehsilCode.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.tehsil.isActive !== null && this.tehsil.isActive.toString() !== '-1') {
      if (this.tehsil.isActive.toString() === '3') {
        this.Resulttehsil = this.Resulttehsil.filter(SubResultProd =>
          SubResultProd.isActive.toString() === 'Active' || SubResultProd.isActive.toString() === 'Inactive');
      } else {
        this.Resulttehsil = this.Resulttehsil.filter(SubResultProd =>
          SubResultProd.isActive.toString() === this.tehsil.isActive.toString());
      }
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.Resulttehsil = this.WithoutFilterTehsils;
    }
    this.tehsils = this.Resulttehsil;
    
    console.log(this.tehsils);
  }

  ExportToExcel(): void {
    alasql('SELECT tehsilCode Tehsil_Code,tehsilNameEng Tehsil_Name,' +
      'isActive Status INTO XLSX("tehsilList.xlsx",{headers:true}) FROM ?', [this.tehsils]);
  }
}