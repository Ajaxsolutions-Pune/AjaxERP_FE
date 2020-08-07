import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { State } from '../../Module/Masters/State.model';
import { StateEntity } from '../../Module/Masters/StateEntity.model';

@Injectable()
export class StateTransfarmer {
    str: string;
    statesEntity: StateEntity;
    state: State;
    states: State[] = [];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    ListState: State[];
    StateTransfarmers(Entity: StateEntity[]): State[] {
        this.states = [];
        Entity.forEach(element => {
            this.state = new State();
            this.state.state_Code = element.stateCode;
            this.state.Country_Code = element.countryCode;
            this.state.State_Name_Uni = element.stateNameUni;
            this.state.State_Name_Eng = element.stateNameEng;
            this.state.isAuto = element.isAuto;
            this.state.IsActive = element.isActive;
            this.states.push(this.state);
        });
        return this.states;
    }
    StateTransfarmer(state: State): StateEntity {
        this.statesEntity = new StateEntity();
        this.statesEntity.stateCode = state.state_Code;
        this.statesEntity.countryCode = state.Country_Code;
        this.statesEntity.stateNameUni = state.State_Name_Uni;
        this.statesEntity.stateNameEng = state.State_Name_Eng;
        this.statesEntity.isAuto = state.isAuto;
        if (state.IsActive === 'true') { this.statesEntity.isActive = '1'; } else { this.statesEntity.isActive = '1'; }
        return this.statesEntity;
    }

    StateTransfarmerEntity(Entity: StateEntity): State {
        this.state = new State();
        console.log(Entity);
        this.state.state_Code = Entity.stateCode;
        this.state.Country_Code = Entity.countryCode;
        this.state.State_Name_Uni = Entity.stateNameUni;
        this.state.State_Name_Eng = Entity.stateNameEng;
        this.state.isAuto = Entity.isAuto;
        this.state.IsActive = Entity.isActive;

        return this.state;
    }
}
