import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UOMService } from '../../../Compound/Services/Masters/UOMService';
import { UOM } from '../../../Compound/Module/Masters/UOM.model';

@Component({
  selector: 'app-list-uom',
  templateUrl: './list-uom.component.html',
  styleUrls: ['./list-uom.component.scss']
})
export class ListUOMComponent implements OnInit {
  @Input() UnitInput: UOM;
  Units: UOM[];

  WithoutFilterUnits: UOM[];
  ResultUnits: UOM[];
  SerachCri: number;
  Unit: UOM;

  constructor(private _router: Router,
    private unitService: UOMService,
    private route: ActivatedRoute) {
    this.Units = this.unitService.getUnits();
    this.WithoutFilterUnits = this.Units;
  }

  ngOnInit() {
    this.Units = this.unitService.getUnits();
    this.WithoutFilterUnits = this.Units;
    this.Unit = {
      UOM_Id: null,
      UOM_Description: null,
      UOM_ShortDescription: null,
      CreatedBy: null,
      ModifiedBy: null,
      CreDate: null,
      ModDate: null,
      IsActive: null
    };
    console.log(this.Units);
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.ResultUnits = this.WithoutFilterUnits;
    console.log(this.Unit.UOM_Id);
    if (this.Unit.UOM_ShortDescription !== null && this.Unit.UOM_ShortDescription !== '') {
      this.ResultUnits = this.ResultUnits.filter(SubResultunit =>
        SubResultunit.UOM_ShortDescription.toLowerCase().indexOf(this.Unit.UOM_ShortDescription.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.Unit.UOM_Id !== null && this.Unit.UOM_Id.toString() !== '') {
      this.ResultUnits = this.ResultUnits.filter(SubResultunit =>
        SubResultunit.UOM_Id.toString().toLowerCase().indexOf(this.Unit.UOM_Id.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      console.log('resul');
      this.ResultUnits = this.WithoutFilterUnits;
    }
    this.Units = this.ResultUnits;
    console.log(this.Units);
  }

  ExportToExcel(): void {
    // tslint:disable-next-line:max-line-length
    // alasql('SELECT unitNo,unitID,unitName,Creunit,CreDate,IsActive,status,EmpId INTO XLSX("unitList.xlsx",{headers:true}) FROM ?', [this.Units]);
  }
}
