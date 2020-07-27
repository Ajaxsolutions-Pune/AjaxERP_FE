import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Process } from '../../../../Compound/Module/Masters/Process.model';

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.scss']
})
export class ProcessListComponent implements OnInit {
  @Input() FormInput: Process;
  arrOject: Process[];

  WithoutFilterForm: Process[];
  ResultProcess: Process[];
  SerachCri: number;
  bindObj: Process;
  constructor(private _router: Router,
    private route: ActivatedRoute) {
    this.arrOject = this.route.snapshot.data['ProcessList'];
  }

  ngOnInit() {
    this.WithoutFilterForm = this.arrOject;
    this.bindObj = {
      ProcessID: null,
      Process_Name: null,
      Geofence: null,
      Is_Active: null,
      Is_Auto: null,
      Sort_By: null
    };
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.ResultProcess = this.WithoutFilterForm;
    if (this.bindObj.ProcessID !== null && this.bindObj.ProcessID !== '') {
      this.ResultProcess = this.ResultProcess.filter(SubResult =>
        SubResult.ProcessID.toLowerCase().indexOf(this.bindObj.ProcessID.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.Process_Name !== null && this.bindObj.Process_Name.toString() !== '') {
      this.ResultProcess = this.ResultProcess.filter(SubResult =>
        SubResult.Process_Name.toString().toLowerCase().indexOf(this.bindObj.Process_Name.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.ResultProcess = this.WithoutFilterForm;
    }
    this.arrOject = this.ResultProcess;
  }

  ExportToExcel(): void {
    alasql('SELECT Form_Code,Form_Id,Form_Name_ENg,Form_Name_Uni,CreatedBy,ModifiedBy,' +
      'CreDate,ModDate,IsActive INTO XLSX("FormList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
