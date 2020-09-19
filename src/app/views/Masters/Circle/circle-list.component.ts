import { Component, OnInit, Input } from '@angular/core';
import { CircleEntity, Circle } from '../../../Components/Module/Masters/Circle.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CircleTransfarmer } from '../../../Components/Transformer/Masters/Circle-Transfarmer';
import { environment } from '../../../Components/Module/environment';
import * as alasql from 'alasql';
alasql['private'].externalXlsxLib = require('xlsx');

@Component({
  selector: 'app-circle-list',
  templateUrl: './circle-list.component.html',
  styleUrls: ['./circle-list.component.scss']
})
export class CircleListComponent implements OnInit {
  @Input() questionInput: Circle;
  arrOject: Circle[];
  arrOjectEntity: CircleEntity[];

  WithoutFilterObj: Circle[];
  config: any;
  env = environment;
  ResultOject: Circle[];
  SerachCri: number;
  bindObj: Circle;
  constructor(private _router: Router,
    objTrans: CircleTransfarmer,
    private route: ActivatedRoute) {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      this._router.navigate(['login']);
    }
    this.arrOjectEntity = this.route.snapshot.data['CircleList'];
    this.arrOject = objTrans.CircleTransfarmers(this.arrOjectEntity);
    this.WithoutFilterObj = this.arrOject;
    this.config = {
      itemsPerPage: this.env.paginationPageSize,
      currentPage: 1,
      totalItems: this.arrOject.length
    };
  }
  ngOnInit() {
    this.WithoutFilterObj = this.arrOject;
    console.log(this.arrOject);
    this.bindObj = {
      circleCode: null,
      circleNameENG: null,
      circleNameUNI: null,
      zoneCode: null,
      isActive: '3',
      createdBy: null,
      createdDate: null,
      modifiedBy: null,
      modifiedDate: null,
    };
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }
  resultChanged(): void {
    this.SerachCri = 0;
    this.ResultOject = this.WithoutFilterObj;
    if (this.bindObj.circleNameENG !== null && this.bindObj.circleNameENG !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.circleNameENG.toLowerCase().indexOf(this.bindObj.circleNameENG.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.circleCode !== null && this.bindObj.circleCode.toString() !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.circleCode.toString().toLowerCase().indexOf(this.bindObj.circleCode.toString().toLowerCase()) !== -1);
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
    alasql('SELECT circleCode circle_Code,circleNameENG circle_Name,' +
      'isActive INTO XLSX("CircleList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
