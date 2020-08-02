import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AssetCategory, AssetCategoryEntity } from '../../../Compound/Module/Masters/AssetCategory.model';

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
  constructor(private _router: Router) {
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
  }

  ExportToExcel(): void {
    alasql('SELECT assetGroupCode,assetGroupNameENG,assetGroupNameUNI,' +
      'isActive INTO XLSX("AssetGroupList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
