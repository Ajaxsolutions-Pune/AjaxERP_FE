import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Asset } from '../../../Compound/Module/Masters/Asset.model';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent implements OnInit {
  @Input() AssetInput:  Asset;
  bindObj:  Asset;
  constructor(private _router: Router) {
  }

  ngOnInit() {
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
}
