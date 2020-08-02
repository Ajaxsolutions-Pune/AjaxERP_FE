import { Component, OnInit, Input } from '@angular/core';
import { AssetGroup, AssetGroupEntity } from '../../../Compound/Module/Masters/AssetGroup.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asset-group',
  templateUrl: './asset-group.component.html',
  styleUrls: ['./asset-group.component.scss']
})
export class AssetGroupComponent implements OnInit {
  @Input() colourInput: AssetGroup;
  bindObj: AssetGroup;
  constructor(private _router: Router) {
  }

  ngOnInit() {
    this.bindObj = {
      assetGroupCode: null,
      assetGroupNameENG: null,
      assetGroupNameUNI: null,
      isActive: null
    };
  }

  resultChanged(): void {
  }
}
