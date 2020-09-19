import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProcessFormMapping } from '../../../Components/Module/ProcessSetup/ProcessFormMapping.model';
@Injectable()
export class ProcessDataService {
  // private readonly API_URL = 'https://api.github.com/repos/angular/angular/issues';

  dataChange: BehaviorSubject<ProcessFormMapping[]> = new BehaviorSubject<ProcessFormMapping[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) { }

  get data(): ProcessFormMapping[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllProcessFormMappings(): void {
    
  }

  addProcessFormMapping(processFormMapping: ProcessFormMapping): void {
    this.dialogData = processFormMapping;
  }

  updateProcessFormMapping(processFormMapping: ProcessFormMapping): void {
    this.dialogData = processFormMapping;
  }

  deleteProcessFormMapping(id: number): void {
    console.log(id);
  }
}





