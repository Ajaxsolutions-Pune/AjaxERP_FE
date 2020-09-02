import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MFG } from '../../../Components/Module/Masters/MFG';
import { MFGService } from '../../../Components/Services/Masters/MFGService';

@Component({
  selector: 'app-manufacture-list',
  templateUrl: './manufacture-list.component.html',
  styleUrls: ['./manufacture-list.component.scss']
})
export class ManufactureListComponent implements OnInit {

  MFG: MFG;
  str: string;
  MFGList: MFG[];
  MFGs: MFG[];
  WithoutFiltermfgs: MFG[];
  Resultmfgs: MFG[];
  SerachCri: number;
  mfg: MFG;

  constructor(private _router: Router,
    private mfgService: MFGService,
    private route: ActivatedRoute) {
      if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
        this._router.navigate(['login']);
      }
    this.MFGs = this.mfgService.getMFGS();
    this.WithoutFiltermfgs = this.MFGs;
  }

  ngOnInit() {
    this.MFGs = this.mfgService.getMFGS();
    this.WithoutFiltermfgs = this.MFGs;
    this.MFG = {
      ID: null,
      manufactureCode: null,
      manufactureDesc: null,
      manufactureDescUni: null,
      isActive: null
    };
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.Resultmfgs = this.WithoutFiltermfgs;
    if (this.MFG.manufactureDesc !== null && this.MFG.manufactureDesc !== '') {
      this.Resultmfgs = this.Resultmfgs.filter(SubResult =>
        SubResult.manufactureDesc.toLowerCase().indexOf(this.MFG.manufactureDesc.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.MFG.manufactureCode !== null && this.MFG.manufactureCode.toString() !== '') {
      this.Resultmfgs = this.Resultmfgs.filter(SubResult =>
        SubResult.manufactureCode.toString().toLowerCase().indexOf(this.MFG.manufactureCode.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.Resultmfgs = this.WithoutFiltermfgs;
    }
    this.MFGs = this.Resultmfgs;
  }

  ExportToExcel(): void {
    alasql('SELECT * INTO XLSX("brandList.xlsx",{headers:true}) FROM ?', [this.MFGs]);
  }
}
