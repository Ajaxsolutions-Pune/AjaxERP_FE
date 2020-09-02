import { Component, OnInit } from '@angular/core';
import { State } from '../../../Components/Module/Masters/State.model';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { DefaultLayoutComponent } from '../../../containers';
import { StateService } from '../../../Components/Services/Masters/StateService';
import { NgForm } from '@angular/forms';
import { Country } from '../../../Components/Module/Masters/Country.model';
import { CountryService } from '../../../Components/Services/Masters/CountryService';
import { StateTransfarmer } from '../../../Components/Transformer/Masters/State-transformer';

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
    this.route.paramMap.subscribe(parameterMap => { const id = +parameterMap.get('id'); this.getstates(id.toString()); });
  }
  save(stateForm: NgForm): void {
    if (status !== 'Update') {

      this.insertflag = false;
      this.state.state_Code = null;
      this.stateService.Save(this.stateTransfarmer.StateTransfarmer(this.state)).subscribe(
        () => {
          stateForm.reset();
          this.defaultLayoutComponent.Massage('Insert Sucsessfuly',
            'Data saved successfully !', 'modal-info');
          this.router.navigate(['BrandList']);
        }
      );

    } else {
      this.stateService.Save(this.stateTransfarmer.StateTransfarmer(this.state)).subscribe(
        () => {
          stateForm.reset();
          this.defaultLayoutComponent.Massage('Insert Sucsessfuly',
            'Data saved successfully !', 'modal-info');
          this.router.navigate(['BrandList']);
        }
      );
    }
    if (this.insertflag) {
      this.router.navigate(['StateList']);
    }
  }

  private getstates(StateCode: string) {
    this.state = {
      Country_Code: '1',
      isAuto: '1',
      state_Code: null,
      State_Id: null,
      State_Name_Eng: null,
      State_Name_Uni: null,
      CreDate: null,
      CreatedBy: null,
      IsActive: null,
      ModDate: null,
      ModifiedBy: null,

    };
    if (StateCode === null || StateCode === '') {
      this.state = {
        Country_Code: '1',
        isAuto: '1',
        state_Code: null,
        State_Id: null,
        State_Name_Eng: null,
        State_Name_Uni: null,
        CreDate: null,
        CreatedBy: null,
        IsActive: null,
        ModDate: null,
        ModifiedBy: null,
      };
      status = '';

    } else {
      console.log(this.stateService.getState(StateCode)[0]);
      this.state = this.stateTransfarmer.StateTransfarmerEntity(this.stateService.getState(StateCode)[0]);
      status = 'Update';
    }
  }
}
