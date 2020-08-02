import { Component, OnInit, Input } from '@angular/core';
import { CircleEntity, Circle } from '../../../Compound/Module/Masters/Circle.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-circle-list',
  templateUrl: './circle-list.component.html',
  styleUrls: ['./circle-list.component.scss']
})
export class CircleListComponent implements OnInit {
  @Input() questionInput: Circle;
  arrOject: Circle[];
  arrOjectEntity: CircleEntity[];

  WithoutFilterObj: Circle[];
  ResultOject: Circle[];
  SerachCri: number;
  bindObj: Circle;
  constructor(private _router: Router) {
  }

  ngOnInit() {
    this.WithoutFilterObj = this.arrOject;
    console.log(this.arrOject);
    this.bindObj = {
      circleCode: null,
      circleNameENG: null,
      circleNameUNI: null,
      zoneCode: null,
      isActive: null,
    };
  }

  resultChanged(): void {
  }

  ExportToExcel(): void {
    alasql('SELECT circleCode,circleNameENG,circleNameUNI,zoneCode,' +
      'isActive INTO XLSX("CircleList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
