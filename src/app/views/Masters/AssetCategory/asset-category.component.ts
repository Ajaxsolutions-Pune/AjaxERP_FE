import { Component, OnInit, Input } from '@angular/core';
import { AssetCategory } from '../../../Compound/Module/Masters/AssetCategory.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asset-category',
  templateUrl: './asset-category.component.html',
  styleUrls: ['./asset-category.component.scss']
})
export class AssetCategoryComponent implements OnInit {
  @Input() CircleInput:  AssetCategory;
  bindObj:  AssetCategory;
  constructor(private _router: Router) {
  }

  ngOnInit() {
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
}
