import { Component, OnInit, Input } from '@angular/core';
import { AssetGroup, AssetGroupEntity } from '../../../Compound/Module/Masters/AssetGroup.model';
import { Router } from '@angular/router';

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
  constructor(private _router: Router) {
  }

  ngOnInit() {
    this.WithoutFilterObj = this.arrOject;
    console.log(this.arrOject);
    this.bindObj = {
      assetGroupCode: null,
      assetGroupNameENG: null,
      assetGroupNameUNI: null,
      isActive: null
    };
  }

  resultChanged(): void {
  }

  ExportToExcel(): void {
    alasql('SELECT assetGroupCode,assetGroupNameENG,assetGroupNameUNI,' +
      'isActive INTO XLSX("AssetGroupList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
