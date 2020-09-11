import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Process, ProcessEntity } from '../../../../Components/Module/Masters/Process.model';
import { ProcessTransfarmer1 } from '../../../../Components/Transformer/Masters/Process-Transfarmer1';
import * as alasql from 'alasql';
import { environment } from '../../../../Components/Module/environment';
alasql['private'].externalXlsxLib = require('xlsx');

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
  config: any;
  env = environment;
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
    this.config = {
      itemsPerPage: this.env.paginationPageSize,
      currentPage: 1,
      totalItems: this.processs.length
    };
  }

  ngOnInit() {
    this.WithoutFilterprocess = this.processs;
    this.bindObj = {
      processId: null,
      processName: null,
      geofence: null,
      isActive: '3',
      createdBy: null,
      createdDate: null,
      modifiedBy: null,
      modifiedDate: null,
    };
  }

  pageChanged(event) {
    this.config.currentPage = event;
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
    if (this.bindObj.isActive !== null && this.bindObj.isActive.toString() !== '-1') {
      if (this.bindObj.isActive.toString() === '3') {
        this.Resultprocess = this.Resultprocess.filter(SubResultProd =>
          SubResultProd.isActive.toString() === 'Active' || SubResultProd.isActive.toString() === 'Inactive');
      } else {
        this.Resultprocess = this.Resultprocess.filter(SubResultProd =>
          SubResultProd.isActive.toString() === this.bindObj.isActive.toString());
      }
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.Resultprocess = this.WithoutFilterprocess;
    }
    this.processs = this.Resultprocess;
    this.config = {
      itemsPerPage: this.env.paginationPageSize,
      currentPage: 1,
      totalItems: this.processs.length
    };
  }

  ExportToExcel(): void {
    alasql('SELECT processId,processName,geofence,isActive' +
      ' INTO XLSX("processList.xlsx",{headers:true}) FROM ?', [this.processs]);
  }
}
