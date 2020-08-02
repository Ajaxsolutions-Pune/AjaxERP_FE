import { Component, OnInit, Input } from '@angular/core';
import { Region, RegionEntity } from '../../../Compound/Module/Masters/Region.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.scss']
})
export class RegionListComponent implements OnInit {
  @Input() questionInput: Region;
  arrOject: Region[];
  arrOjectEntity: RegionEntity[];

  WithoutFilterObj: Region[];
  ResultOject: Region[];
  SerachCri: number;
  bindObj: Region;
  constructor(private _router: Router) {
  }

  ngOnInit() {
    this.WithoutFilterObj = this.arrOject;
    console.log(this.arrOject);
    this.bindObj = {
      regionCode: null,
      regionNameENG: null,
      regionNameUNI: null,
      isActive: null
    };
  }

  resultChanged(): void {
  }

  ExportToExcel(): void {
    alasql('SELECT zoneCode,zoneNameENG,zoneNameUNI,' +
      'isActive INTO XLSX("zoneList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
