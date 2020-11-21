import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

//import { Question } from '../../../../../Components/Module/Masters/Question.model';
//import { Answer } from '../../../../../Components/Module/Masters/Answer.model';
import { Asset } from '../../../../../Components/Module/Masters/Asset.model';
import { AssetService } from '../../../../../Components/Services/Masters/AssetService';
import { AssetTransfarmer } from '../../../../../Components/Transformer/Masters/Asset-Transfarmer';

import { elementAt } from 'rxjs/operators';
import { DeviceAssetMapping } from '../../../../../Components/Module/ProcessSetup/DeviceAssetMapping.model';
import { DeviceAssetDataService } from '../../deviceassetdata.service';
import { CustomComboBox } from '../../../../../Components/Module/GlobalModule/CustomComboBox.model';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: '../../dialogs/edit/deviceassetedit.dialog.html',
  styleUrls: ['../../dialogs/edit/deviceassetedit.dialog.css']
})

export class DeviceAssetEditDialogComponent implements OnInit {
  asset: Asset[];
  objnextAssetIdText: string;

  dataAssetObj: CustomComboBox[];
  nextFormcount=1;
  @ViewChild('auto', null) auto: any;
  keyword = 'name';

  selectEvent(item) {
    if(this.nextFormcount !==1){
      const selectedData = {
        value: item.id,
        text: item.name
      };
      this.data.assetCode = selectedData.value;
      this.objnextAssetIdText = selectedData.text;

    }this.nextFormcount=2;
  }
  constructor(public dialogRef: MatDialogRef<DeviceAssetEditDialogComponent>,
    private assetService: AssetService,
    private assetTransfarmer: AssetTransfarmer,
    @Inject(MAT_DIALOG_DATA) public data: DeviceAssetMapping, public dataService: DeviceAssetDataService) {
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  ngOnInit() {
    this.assetService.fillDrpAssets().subscribe(
      (par) => {
        this.asset = this.assetTransfarmer.AssetTransfarmers(par);
        this.dataAssetObj = [];
        this.asset.forEach(a => {
          this.dataAssetObj.push({ id: a.assetCode, name: a.assetNameENG })
        });
      },
      (err: any) => console.log(err));
  }
  
  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // emppty stuff
  }

  AssetsChange(event) {
    const target = event.source.selected._element.nativeElement;
    const selectedData = {
      value: event.value,
      text: target.innerText.trim()
    };
    this.objnextAssetIdText = selectedData.text;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.objnextAssetIdText = this.asset.
      find(element => element.assetCode === this.data.assetCode).assetNameENG;
    this.data.assetName = this.objnextAssetIdText;
    if (this.data.isActive.toString() === 'true') {
      this.data.isActiveText = 'Active';
    } else {
      this.data.isActiveText = 'Inactive';
    }
    this.dataService.updateDeviceAssetMapping(this.data);
  }
}
