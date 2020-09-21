import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserDeviceMapping } from '../../../Components/Module/ProcessSetup/UserDeviceMapping.model';
@Injectable()
export class UserDeviceDataService {
  // private readonly API_URL = 'https://api.github.com/repos/angular/angular/issues';

  dataChange: BehaviorSubject<UserDeviceMapping[]> = new BehaviorSubject<UserDeviceMapping[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) { }

  get data(): UserDeviceMapping[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllUserDeviceMappings(): void {
    
  }

  addUserDeviceMapping(userDeviceMapping: UserDeviceMapping): void {
    this.dialogData = userDeviceMapping;
  }

  updateUserDeviceMapping(userDeviceMapping: UserDeviceMapping): void {
    this.dialogData = userDeviceMapping;
  }

  /*deleteUserDeviceMapping(id: number): void {
    console.log(id);
  }*/
}





