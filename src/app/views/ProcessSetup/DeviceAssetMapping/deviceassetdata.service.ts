import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DeviceAssetMapping } from '../../../Components/Module/ProcessSetup/DeviceAssetMapping.model';
@Injectable()
export class DeviceAssetDataService {
  // private readonly API_URL = 'https://api.github.com/repos/angular/angular/issues';

  dataChange: BehaviorSubject<DeviceAssetMapping[]> = new BehaviorSubject<DeviceAssetMapping[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) { }

  get data(): DeviceAssetMapping[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllDeviceAssetMappings(): void {
    
  }

  addDeviceAssetMapping(deviceAssetMapping: DeviceAssetMapping): void {
    this.dialogData = deviceAssetMapping;
  }

  updateDeviceAssetMapping(deviceAsstMapping: DeviceAssetMapping): void {
    this.dialogData = deviceAsstMapping;
  }

  /*deleteUserDeviceMapping(id: number): void {
    console.log(id);
  }*/
}





