import { Component, OnInit, Input } from '@angular/core';
import { State } from '../../../Compound/Module/Masters/State.model';
import { Router, ActivatedRoute } from '@angular/router';
import { StateService } from '../../../Compound/Services/Masters/StateService';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.scss']
})
export class StateListComponent implements OnInit {
  @Input() stateInput: State;
  states: State[];

  WithoutFilterstates: State[];
  Resultstates: State[];
  SerachCri: number;
  state: State;

  constructor(private _router: Router,
    private stateService: StateService,
    private route: ActivatedRoute) {
    this.states = this.stateService.getStates();
    this.WithoutFilterstates = this.states;
  }

  ngOnInit() {
    this.states = this.stateService.getStates();
    this.WithoutFilterstates = this.states;
    this.state = {
      Country_Id: null,
      State_Code: null,
      State_Id: null,
      State_Name_ENg: null,
      State_Name_Uni: null,
      CreatedBy: null,
      ModifiedBy: null,
      CreDate: null,
      ModDate: null,
      IsActive: null
    };
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.Resultstates = this.WithoutFilterstates;
    console.log(this.state.State_Id);
    if (this.state.State_Name_ENg !== null && this.state.State_Name_ENg !== '') {
      this.Resultstates = this.Resultstates.filter(SubResultcountry =>
        SubResultcountry.State_Name_ENg.toLowerCase().indexOf(this.state.State_Name_ENg.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.state.State_Id !== null && this.state.State_Id.toString() !== '') {
      this.Resultstates = this.Resultstates.filter(SubResultcountry =>
        SubResultcountry.Country_Id.toString().toLowerCase().indexOf(this.state.State_Id.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      console.log('resul');
      this.Resultstates = this.WithoutFilterstates;
    }
    this.states = this.Resultstates;
    console.log(this.states);
  }

  ExportToExcel(): void {
    alasql('SELECT Country_Id,Country_Name_ENg,Country_Name_Uni,CreatedBy,ModifiedBy,' +
      'CreDate,ModDate,IsActive INTO XLSX("unitList.xlsx",{headers:true}) FROM ?', [this.states]);
  }
}
