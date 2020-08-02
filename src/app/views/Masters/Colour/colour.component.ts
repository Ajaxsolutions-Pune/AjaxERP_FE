import { Component, OnInit, Input } from '@angular/core';
import { Colour, ColourEntity } from '../../../Compound/Module/Masters/Colour.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-colour',
  templateUrl: './colour.component.html',
  styleUrls: ['./colour.component.scss']
})
export class ColourComponent implements OnInit {
  @Input() colourInput: Colour;
  arrOject: Colour[];
  arrOjectEntity: ColourEntity[];

  WithoutFilterObj: Colour[];
  ResultOject: Colour[];
  SerachCri: number;
  bindObj: Colour;
  constructor(private _router: Router) {
  }

  ngOnInit() {
    this.WithoutFilterObj = this.arrOject;
    console.log(this.arrOject);
    this.bindObj = {
      colourCode: null,
      colourNameENG: null,
      colourNameUNI: null,
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
