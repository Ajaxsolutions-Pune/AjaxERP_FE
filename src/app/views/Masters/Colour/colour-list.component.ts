import { Component, OnInit, Input } from '@angular/core';
import { Colour, ColourEntity } from '../../../Components/Module/Masters/Colour.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ColourTransfarmer } from '../../../Components/Transformer/Masters/Colour-Transfarmer';
import { environment } from '../../../Components/Module/environment';
import * as alasql from 'alasql';
alasql['private'].externalXlsxLib = require('xlsx');

@Component({
  selector: 'app-colour-list',
  templateUrl: './colour-list.component.html',
  styleUrls: ['./colour-list.component.scss']
})
export class ColourListComponent implements OnInit {
  @Input() questionInput: Colour;
  arrOject: Colour[];
  arrOjectEntity: ColourEntity[];

  WithoutFilterObj: Colour[];
  ResultOject: Colour[];
  SerachCri: number;
  bindObj: Colour;
  config: any;
  env = environment;
  constructor(private _router: Router,
    objTrans: ColourTransfarmer,
    private route: ActivatedRoute) {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      this._router.navigate(['login']);
    }
    this.arrOjectEntity = this.route.snapshot.data['ColourList'];
    this.arrOject = objTrans.ColourTransfarmers(this.arrOjectEntity);
    this.WithoutFilterObj = this.arrOject;
    this.config = {
      itemsPerPage: this.env.paginationPageSize,
      currentPage: 1,
      totalItems: this.arrOject.length
    };
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }
  ngOnInit() {
    this.WithoutFilterObj = this.arrOject;
    console.log(this.arrOject);
    this.bindObj = {
      colourCode: null,
      colourNameENG: null,
      colourNameUNI: null,
      isActive: '3',
      createdBy: null,
      createdDate: null,
      modifiedBy: null,
      modifiedDate: null
    };
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.ResultOject = this.WithoutFilterObj;
    if (this.bindObj.colourNameENG !== null && this.bindObj.colourNameENG !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.colourNameENG.toLowerCase().indexOf(this.bindObj.colourNameENG.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.colourCode !== null && this.bindObj.colourCode.toString() !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.colourCode.toString().toLowerCase().indexOf(this.bindObj.colourCode.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.isActive !== null && this.bindObj.isActive.toString() !== '-1') {
      if (this.bindObj.isActive.toString() === '3') {
        this.ResultOject = this.ResultOject.filter(SubResultProd =>
          SubResultProd.isActive.toString() === 'Active'
          || SubResultProd.isActive.toString() === 'Inactive');
      } else {
        this.ResultOject = this.ResultOject.filter(SubResultProd =>
          SubResultProd.isActive.toString() === this.bindObj.isActive.toString());
      }
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.ResultOject = this.WithoutFilterObj;
    }
    this.arrOject = this.ResultOject;
    this.config = {
      itemsPerPage: this.env.paginationPageSize,
      currentPage: 1,
      totalItems: this.arrOject.length
    };
  }

  ExportToExcel(): void {
    alasql('SELECT colourCode Colour_Code,colourNameENG Colour_Name,' +
      'isActive Status INTO XLSX("ColourList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
