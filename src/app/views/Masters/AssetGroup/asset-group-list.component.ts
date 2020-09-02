import { Component, OnInit, Input } from '@angular/core';
import { AssetGroup, AssetGroupEntity } from '../../../Components/Module/Masters/AssetGroup.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AssetGroupTransfarmer } from '../../../Components/Transformer/Masters/AssetGroup-Transfarmer';
import { environment } from '../../../Components/Module/environment';

@Component({
  selector: 'app-asset-group-list',
  templateUrl: './asset-group-list.component.html',
  styleUrls: ['./asset-group-list.component.scss']
})
export class AssetGroupListComponent implements OnInit {
  @Input() questionInput: AssetGroup;
  arrOject: AssetGroup[];
  arrOjectEntity: AssetGroupEntity[];

  WithoutFilterObj: AssetGroup[];
  ResultOject: AssetGroup[];
  SerachCri: number;
  bindObj: AssetGroup;
  config: any;
  env = environment;
  constructor(private _router: Router,
    objTrans: AssetGroupTransfarmer,
    private route: ActivatedRoute) {
      if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
        this._router.navigate(['login']);
      }
    this.arrOjectEntity = this.route.snapshot.data['AssetGroupList'];
    this.arrOject = objTrans.AssetGroupTransfarmers(this.arrOjectEntity);
    this.WithoutFilterObj = this.arrOject;
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
      assetGroupCode: null,
      assetGroupNameENG: null,
      assetGroupNameUNI: null,
      isActive: '3'
    };
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.ResultOject = this.WithoutFilterObj;
    if (this.bindObj.assetGroupNameENG !== null && this.bindObj.assetGroupNameENG !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.assetGroupNameENG.toLowerCase().indexOf(this.bindObj.assetGroupNameENG.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.assetGroupCode !== null && this.bindObj.assetGroupCode.toString() !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.assetGroupCode.toString().toLowerCase().indexOf(this.bindObj.assetGroupCode.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.isActive !== null && this.bindObj.isActive.toString() !== '-1') {
      if (this.bindObj.isActive.toString() === '3') {
        this.ResultOject = this.ResultOject.filter(SubResultProd =>
          SubResultProd.isActive.toString() === 'Active' || SubResultProd.isActive.toString() === 'Inactive');
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
    alasql('SELECT assetGroupCode,assetGroupNameENG,assetGroupNameUNI,' +
      'isActive INTO XLSX("AssetGroupList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
