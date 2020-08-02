import { Component, OnInit, Input } from '@angular/core';
import { Zone, ZoneEntity } from '../../../Compound/Module/Masters/Zone.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zone-list',
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.scss']
})
export class ZoneListComponent implements OnInit {
  @Input() questionInput: Zone;
  arrOject: Zone[];
  arrOjectEntity: ZoneEntity[];

  WithoutFilterObj: Zone[];
  ResultOject: Zone[];
  SerachCri: number;
  bindObj: Zone;
  constructor(private _router: Router) {
  }

  ngOnInit() {
    this.WithoutFilterObj = this.arrOject;
    console.log(this.arrOject);
    this.bindObj = {
      zoneCode: null,
      zoneNameENG: null,
      zoneNameUNI: null,
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
