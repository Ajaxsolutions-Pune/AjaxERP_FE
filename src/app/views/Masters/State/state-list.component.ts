import { Component, OnInit, Input } from '@angular/core';
import { State } from '../../../Components/Module/Masters/State.model';
import { Router, ActivatedRoute } from '@angular/router';
import { StateService } from '../../../Components/Services/Masters/StateService';
import { StateEntity } from '../../../Components/Module/Masters/StateEntity.model';
import { StateTransfarmer } from '../../../Components/Transformer/Masters/State-transformer';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.scss']
})
export class StateListComponent implements OnInit {
  @Input() stateInput: State;
  states: State[];
  statesEntity: StateEntity[];
  WithoutFilterstates: State[];
  Resultstates: State[];
  SerachCri: number;
  state: State;

  constructor(private _router: Router,
    private stateService: StateService,
    private stateTransfarmer: StateTransfarmer,
    private route: ActivatedRoute) {
      if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
        this._router.navigate(['login']);
      }
    this.statesEntity = this.route.snapshot.data['StateList'];
    this.states = this.stateTransfarmer.StateTransfarmers(this.statesEntity);
  }

  ngOnInit() {
    this.stateService.getStates().subscribe(
      (par) => this.statesEntity = par,
      (err: any) => console.log(err));
    this.state = {
      Country_Code: null,
      CreDate: null,
      CreatedBy: null,
      IsActive: null,
      ModDate: null,
      ModifiedBy: null,
      State_Id: null,
      State_Name_Eng: null,
      State_Name_Uni: null,
      isAuto: null,
      state_Code: null,
    };
    this.states = this.stateTransfarmer.StateTransfarmers(this.statesEntity);
    this.WithoutFilterstates = this.states;
  }

  resultChanged(): void {
    this.SerachCri = 0;
    this.Resultstates = this.WithoutFilterstates;
    if (this.state.State_Name_Eng !== null && this.state.State_Name_Eng !== '') {
      this.Resultstates = this.Resultstates.filter(SubResultcountry =>
        SubResultcountry.State_Name_Eng.toLowerCase().indexOf(this.state.State_Name_Eng.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.state.State_Id !== null && this.state.State_Id.toString() !== '') {
      this.Resultstates = this.Resultstates.filter(SubResultcountry =>
        SubResultcountry.Country_Code.toString().toLowerCase().indexOf(this.state.State_Id.toString().toLowerCase()) !== -1);
      this.SerachCri = 1;
    }
    if (this.SerachCri === 0) {
      this.Resultstates = this.WithoutFilterstates;
    }
    this.states = this.Resultstates;
  }

  ExportToExcel(): void {
    alasql('SELECT Country_Id,Country_Name_ENg,Country_Name_Uni,CreatedBy,ModifiedBy,' +
      'CreDate,ModDate,IsActive INTO XLSX("unitList.xlsx",{headers:true}) FROM ?', [this.states]);
  }
}
