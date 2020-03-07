import { Component, OnInit } from '@angular/core';
import { State } from '../../../Compound/Module/Masters/State.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../../containers';
import { StateService } from '../../../Compound/Services/Masters/StateService';
import { NgForm } from '@angular/forms';
import { Country } from '../../../Compound/Module/Masters/Country.model';
import { CountryService } from '../../../Compound/Services/Masters/CountryService';
import { StateTransfarmer } from '../../../Compound/Transformer/Masters/State.transformer';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {
  state: State;
  str: string;
  insertflag: boolean;
  CountryList: Country[];
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private stateService: StateService,
    private stateTransfarmer: StateTransfarmer,
    private countryService: CountryService, private router: Router) {
    const status = '';
  }
  ngOnInit() {
    status = '';
    this.route.paramMap.subscribe(parameterMap => { const id = +parameterMap.get('id'); this.getstates(id); });
   // this.CountryList = this.stateService.getStates();
  }
  save(stateForm: NgForm): void {
    if (status !== 'Update') {
      this.insertflag = false;
      this.state.State_Id = this.stateService.getMaxBrandId() + 1;
      console.log(this.stateTransfarmer.StateTransfarmer(this.state));
      this.stateService.Save(this.stateTransfarmer.StateTransfarmer(this.state));
    } else {
      this.insertflag = this.stateService.Update(this.state);
    }
    if (this.insertflag) {
      this.router.navigate(['StateList']);
    }
  }

  private getstates(Id: number) {
    this.state = {
      Country_Code: '1',
      isAuto: '1',
      state_Code: null,
      State_Id: null,
      State_Name_ENg: null,
      State_Name_Uni: null,
      CreDate: null,
      CreatedBy: null,
      IsActive: null,
      ModDate: null,
      ModifiedBy: null,

    };
    if (Id === null || Id === 0) {
      this.state = {
        Country_Code: '1',
        isAuto: '1',
        state_Code: null,
        State_Id: null,
        State_Name_ENg: null,
        State_Name_Uni: null,
        CreDate: null,
        CreatedBy: null,
        IsActive: null,
        ModDate: null,
        ModifiedBy: null,
      };
      status = '';

    } else {

      this.state = this.stateService.getState(Id)[0];
      status = 'Update';
    }
  }
}
