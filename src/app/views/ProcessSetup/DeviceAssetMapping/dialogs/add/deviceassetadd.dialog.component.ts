import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, Form } from '@angular/forms';

import { AssetService } from '../../../../../Components/Services/Masters/AssetService';
import { AssetTransfarmer } from '../../../../../Components/Transformer/Masters/Asset-Transfarmer';
import { Asset} from '../../../../../Components/Module/Masters/Asset.model';

import { DeviceAssetMapping } from '../../../../../Components/Module/ProcessSetup/DeviceAssetMapping.model';
import { DeviceAssetDataService } from '../../deviceassetdata.service';
import { GlobalService } from '../../../../../Components/Services/GlobalServices/Global.service';
import { CustomComboBox } from '../../../../../Components/Module/GlobalModule/CustomComboBox.model';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/deviceAssetadd.dialog.html',
  styleUrls: ['../../dialogs/add/deviceAssetadd.dialog.css']
})

export class DeviceAssetAddDialogComponent implements OnInit{ 
  asset: Asset[];  
  objassetCodeText: string;    

  constructor(public dialogRef: MatDialogRef<DeviceAssetAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeviceAssetMapping,   
    private assetService: AssetService,
    private globalService: GlobalService,
    private assetTransfarmer: AssetTransfarmer,
    public dataService: DeviceAssetDataService) {
  }
  dataAssetObj: CustomComboBox[];
  @ViewChild('auto', null) auto: any;
  keyword = 'name';

  selectEvent(item) {
    const selectedData = {
      value: item.id,
      text: item.name
    };
    this.data.assetCode = selectedData.value;
    this.objassetCodeText = selectedData.text;
    // alert(this.data1.questionId);
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
   /* return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';*/       
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  AssetsChange(event) {
    const target = event.source.selected._element.nativeElement;
    const selectedData = {
      value: event.value,
      text: target.innerText.trim()
    };
    this.objassetCodeText = selectedData.text;
  }

  public confirmAdd(): void {    
    this.data.assetName = this.objassetCodeText;    
   
    if (this.data.isActive.toString() === 'true') {
      this.data.isActiveText = 'Active';
    } else {
      this.data.isActiveText = 'Inactive';
    }
    this.dataService.addDeviceAssetMapping(this.data);
  }
}
