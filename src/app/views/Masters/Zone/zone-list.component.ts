import { Component, OnInit, Input } from '@angular/core';
import { Zone, ZoneEntity } from '../../../Compound/Module/Masters/Zone.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ZoneTransfarmer } from '../../../Compound/Transformer/Masters/ZoneTransfarmer';

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
  constructor(private _router: Router,
    objTrans: ZoneTransfarmer,
    private route: ActivatedRoute) {
    this.arrOjectEntity = this.route.snapshot.data['ClusterList'];
    this.arrOject = objTrans.ZoneTransfarmers(this.arrOjectEntity);
    this.WithoutFilterObj = this.arrOject;
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
    this.SerachCri = 0;
    this.ResultOject = this.WithoutFilterObj;
    if (this.bindObj.zoneNameENG !== null && this.bindObj.zoneNameENG !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.zoneNameENG.toLowerCase().indexOf(this.bindObj.zoneNameENG.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.zoneCode !== null && this.bindObj.zoneCode.toString() !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.zoneCode.toString().toLowerCase().indexOf(this.bindObj.zoneCode.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.ResultOject = this.WithoutFilterObj;
    }
    this.arrOject = this.ResultOject;
  }

  ExportToExcel(): void {
    alasql('SELECT zoneCode,zoneNameENG,zoneNameUNI,' +
      'isActive INTO XLSX("zoneList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
