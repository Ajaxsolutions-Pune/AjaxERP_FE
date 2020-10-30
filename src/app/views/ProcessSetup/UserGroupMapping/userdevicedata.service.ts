import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserGroupMapping } from '../../../Components/Module/ProcessSetup/UserGroupMapping.model';
@Injectable()
export class UserGroupMappingDataService {
  // private readonly API_URL = 'https://api.github.com/repos/angular/angular/issues';

  dataChange: BehaviorSubject<UserGroupMapping[]> = new BehaviorSubject<UserGroupMapping[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) { }

  get data(): UserGroupMapping[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllUserGroupMappings(): void {
    
  }

  addUserGroupMapping(userGroupMapping: UserGroupMapping): void {
    this.dialogData = userGroupMapping;
  }

  updateUserGroupMapping(userGroupMapping: UserGroupMapping): void {
    this.dialogData = userGroupMapping;
  }
}





