import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Process, ProcessEntity } from '../../../../Compound/Module/Masters/Process.model';
import { ProcessTransfarmer1 } from '../../../../Compound/Transformer/Masters/Process-Transfarmer1';

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.scss']
})
export class ProcessListComponent implements OnInit {
  @Input() processInput: Process;
  processs: Process[];
  processEntity: ProcessEntity[];

  WithoutFilterprocess: Process[];
  Resultprocess: Process[];
  SerachCri: number;
  bindObj: Process;
  constructor(private _router: Router,
     objTrans: ProcessTransfarmer1,
    private route: ActivatedRoute) {
      if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
        this._router.navigate(['login']);
      }
    this.processEntity = this.route.snapshot.data['ProcessList1'];
    console.log(this.processEntity);
     this.processs = objTrans.processTransfarmers(this.processEntity);
    this.WithoutFilterprocess = this.processs;
  }

  ngOnInit() {
    this.WithoutFilterprocess = this.processs;
    this.bindObj = {
      processId: null,
      processName: null,
      geofence: null,
      isActive: null,
    };
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.Resultprocess = this.WithoutFilterprocess;
    if (this.bindObj.processName !== null && this.bindObj.processName !== '') {
      this.Resultprocess = this.Resultprocess.filter(SubResult =>
        SubResult.processName.toLowerCase().indexOf(this.bindObj.processName.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.processId !== null && this.bindObj.processId.toString() !== '') {
      this.Resultprocess = this.Resultprocess.filter(SubResult =>
        SubResult.processId.toString().toLowerCase().indexOf(this.bindObj.processId.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.Resultprocess = this.WithoutFilterprocess;
    }
    this.processs = this.Resultprocess;
  }

  ExportToExcel(): void {
    alasql('SELECT process_Code,process_Id,process_Name_ENg,process_Name_Uni,CreatedBy,ModifiedBy,' +
      'CreDate,ModDate,IsActive INTO XLSX("processList.xlsx",{headers:true}) FROM ?', [this.processs]);
  }
}
