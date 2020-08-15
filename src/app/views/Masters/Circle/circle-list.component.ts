import { Component, OnInit, Input } from '@angular/core';
import { CircleEntity, Circle } from '../../../Compound/Module/Masters/Circle.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CircleTransfarmer } from '../../../Compound/Transformer/Masters/Circle-Transfarmer';

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
  constructor(private _router: Router,
    objTrans: CircleTransfarmer,
    private route: ActivatedRoute) {
      if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
        this._router.navigate(['login']);
      }
    this.arrOjectEntity = this.route.snapshot.data['CircleList'];
    this.arrOject = objTrans.CircleTransfarmers(this.arrOjectEntity);
    this.WithoutFilterObj = this.arrOject;
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
    this.SerachCri = 0;
    this.ResultOject = this.WithoutFilterObj;
    if (this.bindObj.circleNameENG !== null && this.bindObj.circleNameENG !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.circleNameENG.toLowerCase().indexOf(this.bindObj.circleNameENG.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.bindObj.circleCode !== null && this.bindObj.circleCode.toString() !== '') {
      this.ResultOject = this.ResultOject.filter(SubResult =>
        SubResult.circleCode.toString().toLowerCase().indexOf(this.bindObj.circleCode.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.ResultOject = this.WithoutFilterObj;
    }
    this.arrOject = this.ResultOject;
  }

  ExportToExcel(): void {
    alasql('SELECT circleCode,circleNameENG,circleNameUNI,circleCode,' +
      'isActive INTO XLSX("CircleList.xlsx",{headers:true}) FROM ?', [this.arrOject]);
  }
}
