import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormQueAnsMapping } from '../../../Components/Module/ProcessSetup/FormQueAnsMapping.model';
@Injectable()
export class DataService {
  // private readonly API_URL = 'https://api.github.com/repos/angular/angular/issues';

  dataChange: BehaviorSubject<FormQueAnsMapping[]> = new BehaviorSubject<FormQueAnsMapping[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) { }

  get data(): FormQueAnsMapping[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllFormQueAnsMappings(): void {
    
  }

  addFormQueAnsMapping(formQueAnsMapping: FormQueAnsMapping): void {
    this.dialogData = formQueAnsMapping;
  }

  updateFormQueAnsMapping(formQueAnsMapping: FormQueAnsMapping): void {
    this.dialogData = formQueAnsMapping;
  }

  deleteFormQueAnsMapping(id: number): void {
    console.log(id);
  }
}





