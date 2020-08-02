import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Asset, AssetEntity } from '../../../Compound/Module/Masters/Asset.model';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss']
})
export class AssetListComponent implements OnInit {
  @Input() questionInput: Asset;
  arrOject: Asset[];
  arrOjectEntity: AssetEntity[];

  WithoutFilterObj: Asset[];
  ResultOject: Asset[];
  SerachCri: number;
  bindObj: Asset;
  constructor(private _router: Router) {
  }

  ngOnInit() {
    this.WithoutFilterObj = this.arrOject;
    console.log(this.arrOject);
    this.bindObj = {
    ouCode: null,
    assetCode: null,
    assetNameENG: null,
    assetNameUNI: null,
    placeName: null,
    assetGroupCode: null,
    customerCode: null,
    projectCode: null,
    zoneCode: null,
    circleCode: null,
    clusterCode: null,
    countryCode: null,
    stateCode: null,
    latitude: null,
    longitude: null,
    redius: null,
    pinCode: null,
    regionCode: null,
    address: null,
    colourCode: null,
    geofenceCode: null,
    sharedCode: null,
    circuitCode: null,
    conductorCode: null,
    classificationCode: null,
    structureCode: null,
    positionCode: null,
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
