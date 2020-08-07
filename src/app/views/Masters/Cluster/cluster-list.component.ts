import { Component, OnInit, Input } from '@angular/core';
import { Cluster, ClusterEntity } from '../../../Compound/Module/Masters/Cluster.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ClusterTransfarmer } from '../../../Compound/Transformer/Masters/Cluster-Transfarmer';

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
  constructor(private _router: Router,
    objTrans: ClusterTransfarmer,
    private route: ActivatedRoute) {
    this.arrOjectEntity = this.route.snapshot.data['ClusterList'];
    this.arrOject = objTrans.ClusterTransfarmers(this.arrOjectEntity);
    this.WithoutFilterObj = this.arrOject;
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
    this.SerachCri = 0;
    this.ResultOject = this.WithoutFilterObj;
    if (this.bindObj.clusterNameENG !== null && this.bindObj.clusterNameENG !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.clusterNameENG.toLowerCase().indexOf(this.bindObj.clusterNameENG.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.clusterCode !== null && this.bindObj.clusterCode.toString() !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.clusterCode.toString().toLowerCase().indexOf(this.bindObj.clusterCode.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.ResultOject = this.WithoutFilterObj;
    }
    this.arrOject = this.ResultOject;
  }

  ExportToExcel(): void {
    alasql('SELECT assetGroupCode,assetGroupNameENG,assetGroupNameUNI,' +
      'isActive INTO XLSX("AssetGroupList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
