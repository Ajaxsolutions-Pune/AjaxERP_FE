import { Component, OnInit, Input } from '@angular/core';
import { Cluster, ClusterEntity } from '../../../Compound/Module/Masters/Cluster.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cluster-list',
  templateUrl: './cluster-list.component.html',
  styleUrls: ['./cluster-list.component.scss']
})
export class ClusterListComponent implements OnInit {
  @Input() questionInput: Cluster;
  arrOject: Cluster[];
  arrOjectEntity: ClusterEntity[];

  WithoutFilterObj: Cluster[];
  ResultOject: Cluster[];
  SerachCri: number;
  bindObj: Cluster;
  constructor(private _router: Router) {
  }

  ngOnInit() {
    this.WithoutFilterObj = this.arrOject;
    console.log(this.arrOject);
    this.bindObj = {
      clusterCode: null,
      clusterNameENG: null,
      clusterNameUNI: null,
      circleCode: null,
      isActive: null
    };
  }

  resultChanged(): void {
  }

  ExportToExcel(): void {
    alasql('SELECT assetGroupCode,assetGroupNameENG,assetGroupNameUNI,' +
      'isActive INTO XLSX("AssetGroupList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
