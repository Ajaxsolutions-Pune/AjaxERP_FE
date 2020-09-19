import { Component, OnInit, Input } from '@angular/core';
import { Zone, ZoneEntity } from '../../../Components/Module/Masters/Zone.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ZoneTransfarmer } from '../../../Components/Transformer/Masters/ZoneTransfarmer';
import { environment } from '../../../Components/Module/environment';
import * as alasql from 'alasql';
alasql['private'].externalXlsxLib = require('xlsx');

@Component({
  selector: 'app-zone-list',
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.scss']
})
export class ZoneListComponent implements OnInit {
  @Input() questionInput: Zone;
  arrOject: Zone[];
  arrOjectEntity: ZoneEntity[];

  WithoutFilterObj: Zone[];
  ResultOject: Zone[];
  SerachCri: number;
  bindObj: Zone;
  config: any;
  env = environment;
  constructor(private _router: Router,
    objTrans: ZoneTransfarmer,
    private route: ActivatedRoute) {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      this._router.navigate(['login']);
    }
    this.arrOjectEntity = this.route.snapshot.data['ZoneList'];
    this.arrOject = objTrans.ZoneTransfarmers(this.arrOjectEntity);
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
      zoneCode: null,
      zoneNameENG: null,
      zoneNameUNI: null,
      isActive: '3',
      createdBy: null,
      createdDate: null,
      modifiedBy: null,
      modifiedDate: null,
    };
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.ResultOject = this.WithoutFilterObj;
    if (this.bindObj.zoneNameENG !== null && this.bindObj.zoneNameENG !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.zoneNameENG.toLowerCase().indexOf(this.bindObj.zoneNameENG.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.zoneCode !== null && this.bindObj.zoneCode.toString() !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.zoneCode.toString().toLowerCase().indexOf(this.bindObj.zoneCode.toString().toLowerCase()) !== -1);
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
    alasql('SELECT zoneCode Code,zoneNameENG Zone,' +
      'isActive Is_Active INTO XLSX("zoneList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
