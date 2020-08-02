import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Cluster } from '../../../Compound/Module/Masters/Cluster.model';

@Component({
  selector: 'app-cluster',
  templateUrl: './cluster.component.html',
  styleUrls: ['./cluster.component.scss']
})
export class ClusterComponent implements OnInit {
  @Input() CircleInput:  Cluster;
  bindObj:  Cluster;
  constructor(private _router: Router) {
  }

  ngOnInit() {
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
}
