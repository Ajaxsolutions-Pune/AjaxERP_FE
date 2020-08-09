import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AssetCategory, AssetCategoryEntity } from '../../../Compound/Module/Masters/AssetCategory.model';
import { AssetCategoryTransfarmer } from '../../../Compound/Transformer/Masters/Asset-Category-Transfarmer';

@Component({
  selector: 'app-asset-category-list',
  templateUrl: './asset-category-list.component.html',
  styleUrls: ['./asset-category-list.component.scss']
})
export class AssetCategoryListComponent implements OnInit {
  @Input() questionInput: AssetCategory;
  arrOject: AssetCategory[];
  arrOjectEntity: AssetCategoryEntity[];

  WithoutFilterObj: AssetCategory[];
  ResultOject: AssetCategory[];
  SerachCri: number;
  bindObj: AssetCategory;
  constructor(private _router: Router,
    objTrans: AssetCategoryTransfarmer,
    private route: ActivatedRoute) {
    this.arrOjectEntity = this.route.snapshot.data['AssetCategoryList1'];
    console.log('this.arrOjectEntity');
    console.log(this.arrOjectEntity);
    this.arrOject = objTrans.AssetCategoryTransfarmers(this.arrOjectEntity);
    this.WithoutFilterObj = this.arrOject;
  }
  ngOnInit() {
    this.WithoutFilterObj = this.arrOject;
    console.log(this.arrOject);
    this.bindObj = {
      assetCategoryCode: null,
      assetCategoryNameENG: null,
      assetCategoryNameUNI: null,
      assetGroupCode: null,
      colourCode: null,
      isActive: null,
    };
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.ResultOject = this.WithoutFilterObj;
    if (this.bindObj.assetCategoryNameENG !== null && this.bindObj.assetCategoryNameENG !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.assetCategoryNameENG.toLowerCase().indexOf(this.bindObj.assetCategoryNameENG.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.assetCategoryCode !== null && this.bindObj.assetCategoryCode.toString() !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.assetCategoryCode.toString().toLowerCase().indexOf(this.bindObj.assetCategoryCode.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.ResultOject = this.WithoutFilterObj;
    }
    this.arrOject = this.ResultOject;
  }

  ExportToExcel(): void {
    alasql('SELECT assetGroupCode,assetGroupNameENG,assetGroupNameUNI,' +
      'isActive INTO XLSX("AssetGroupList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
