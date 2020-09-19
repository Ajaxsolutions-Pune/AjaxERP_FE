import { Component, OnInit, Input } from '@angular/core';
import { Cluster, ClusterEntity } from '../../../Components/Module/Masters/Cluster.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ClusterTransfarmer } from '../../../Components/Transformer/Masters/Cluster-Transfarmer';
import { environment } from '../../../Components/Module/environment';
import * as alasql from 'alasql';
alasql['private'].externalXlsxLib = require('xlsx');

@Component({
  selector: 'app-cluster-list',
  templateUrl: './cluster-list.component.html',
  styleUrls: ['./cluster-list.component.scss']
})
export class ClusterListComponent implements OnInit {
  @Input() questionInput: Cluster;
  arrOject: Cluster[];
  arrOjectEntity: ClusterEntity[];

  WithoutFilterObj: Cluster[];
  ResultOject: Cluster[];
  SerachCri: number;
  bindObj: Cluster;
  config: any;
  env = environment;
  constructor(private _router: Router,
    objTrans: ClusterTransfarmer,
    private route: ActivatedRoute) {
      if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
        this._router.navigate(['login']);
      }
    this.arrOjectEntity = this.route.snapshot.data['ClusterList'];
    this.arrOject = objTrans.ClusterTransfarmers(this.arrOjectEntity);
    this.WithoutFilterObj = this.arrOject;
    this.config = {
      itemsPerPage:  this.env.paginationPageSize,
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
      clusterCode: null,
      clusterNameENG: null,
      clusterNameUNI: null,
      circleCode: null,
      isActive: '3',
      createdBy: localStorage.getItem('username'),
      createdDate: null,
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: null,
    };
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.ResultOject = this.WithoutFilterObj;
    if (this.bindObj.clusterNameENG !== null && this.bindObj.clusterNameENG !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.clusterNameENG.toLowerCase().indexOf(this.bindObj.clusterNameENG.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.clusterCode !== null && this.bindObj.clusterCode.toString() !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.clusterCode.toString().toLowerCase().indexOf(this.bindObj.clusterCode.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.ResultOject = this.WithoutFilterObj;
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
    this.arrOject = this.ResultOject;
    this.config = {
      itemsPerPage: this.env.paginationPageSize,
      currentPage: 1,
      totalItems: this.arrOject.length
    };
  }

  ExportToExcel(): void {
    alasql('SELECT clusterCode Cluster_Code,clusterNameENG Cluster_Name,isActive Is_Active' +
      ' INTO XLSX("clusterList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
