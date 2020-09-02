import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UOMService } from '../../../Components/Services/Masters/UOMService';
import { UOM } from '../../../Components/Module/Masters/UOM.model';

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
      if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
        this._router.navigate(['login']);
      }
    this.unitService.getUnits().subscribe(
      (par) => this.Units = par,
      (err: any) => console.log(err));

    // this.Units = this.unitService.getUnits();
    this.WithoutFilterUnits = this.Units;
  }

  ngOnInit() {
    this.unitService.getUnits().subscribe(
      (par) => this.Units = par,
      (err: any) => console.log(err));
    this.WithoutFilterUnits = this.Units;
    this.Unit = {
      uomCode: null,
      uomDesc: null,
      isActive: null,
      uomDescUni: null,
    };
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.ResultUnits = this.WithoutFilterUnits;
    if (this.Unit.uomDesc !== null && this.Unit.uomDesc !== '') {
      this.ResultUnits = this.ResultUnits.filter(SubResultunit =>
        SubResultunit.uomDesc.toLowerCase().indexOf(this.Unit.uomDesc.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.Unit.uomCode !== null && this.Unit.uomCode.toString() !== '') {
      this.ResultUnits = this.ResultUnits.filter(SubResultunit =>
        SubResultunit.uomCode.toString().toLowerCase().indexOf(this.Unit.uomCode.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.ResultUnits = this.WithoutFilterUnits;
    }
    this.Units = this.ResultUnits;
  }

  ExportToExcel(): void {
    // tslint:disable-next-line:max-line-length
    // alasql('SELECT unitNo,unitID,unitName,Creunit,CreDate,IsActive,status,EmpId INTO XLSX("unitList.xlsx",{headers:true}) FROM ?', [this.Units]);
  }
}
