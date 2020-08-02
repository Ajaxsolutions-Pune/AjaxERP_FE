import { Component, OnInit, Input } from '@angular/core';
import { Circle } from '../../../Compound/Module/Masters/Circle.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.scss']
})
export class CircleComponent implements OnInit {
  @Input() CircleInput: Circle;
  bindObj: Circle;
  constructor(private _router: Router) {
  }

  ngOnInit() {
    this.bindObj = {
      circleCode: null,
      circleNameENG: null,
      circleNameUNI: null,
      zoneCode: null,
      isActive: null
    };
  }

  resultChanged(): void {
  }
}
