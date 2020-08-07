import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Asset, AssetEntity } from '../../../Compound/Module/Masters/Asset.model';
import { AssetTransfarmer } from '../../../Compound/Transformer/Masters/Asset-Transfarmer';

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
  constructor(private _router: Router,
    objTrans: AssetTransfarmer,
    private route: ActivatedRoute) {
    this.arrOjectEntity = this.route.snapshot.data['AssetList'];
    console.log(this.arrOjectEntity);
    this.arrOject = objTrans.AssetTransfarmers(this.arrOjectEntity);
    this.WithoutFilterObj = this.arrOject;
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
      assetCategoryCode: null,
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
    this.SerachCri = 0;
    this.ResultOject = this.WithoutFilterObj;
    if (this.bindObj.assetNameENG !== null && this.bindObj.assetNameENG !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.assetNameENG.toLowerCase().indexOf(this.bindObj.assetNameENG.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.assetCode !== null && this.bindObj.assetCode.toString() !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.assetCode.toString().toLowerCase().indexOf(this.bindObj.assetCode.toString().toLowerCase()) !== -1);
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
