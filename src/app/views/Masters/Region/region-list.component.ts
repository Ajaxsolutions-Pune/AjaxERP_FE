import { Component, OnInit, Input } from '@angular/core';
import { Region, RegionEntity } from '../../../Compound/Module/Masters/Region.model';
import { Router, ActivatedRoute } from '@angular/router';
import { RegionTransfarmer } from '../../../Compound/Transformer/Masters/Region-Transfarmer';

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
  constructor(private _router: Router,
    objTrans: RegionTransfarmer,
    private route: ActivatedRoute) {
    this.arrOjectEntity = this.route.snapshot.data['RegionList'];
    this.arrOject = objTrans.RegionTransfarmers(this.arrOjectEntity);
    this.WithoutFilterObj = this.arrOject;
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
    this.SerachCri = 0;
    this.ResultOject = this.WithoutFilterObj;
    if (this.bindObj.regionNameENG !== null && this.bindObj.regionNameENG !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.regionNameENG.toLowerCase().indexOf(this.bindObj.regionNameENG.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.regionCode !== null && this.bindObj.regionCode.toString() !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.regionCode.toString().toLowerCase().indexOf(this.bindObj.regionCode.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.ResultOject = this.WithoutFilterObj;
    }
    this.arrOject = this.ResultOject;
  }

  ExportToExcel(): void {
    alasql('SELECT regionCode,regionNameENG,zoneNameUNI,' +
      'isActive INTO XLSX("zoneList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
