import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { State } from '../../Module/Masters/State.model';
import { StateEntity } from '../../Module/Masters/StateEntity.model';
import { StateService } from '../../Services/Masters/StateService';
import { max } from 'rxjs/operators';

@Injectable()
export class StateTransfarmer {
    str: string;
    statesEntity: StateEntity[];
    state: State;
    states: State[] = [];
    env = environment;
    constructor(private httpClient: HttpClient,
        private sateService: StateService) {
        this.str = this.env.apiServiceIPPort;
    }
    ListState: State[];
    getTranStates(): State[] {
        this.sateService.getStates().subscribe(
            (par) => this.ListState = par,
            (err: any) => console.log(err));
        // if (this.statesEntity != null) {
        //  return this.StateTransfarmer(this.statesEntity);
        // }
        return this.ListState;
    }
    getState(StateId: number): State[] {
        // this.httpClient.get<State[]>(this.str + '/Master/getUser?UserNo=' + StateId + '&BranchNo=1');
        this.ListState = this.states.filter(states => states.State_Id.toString().indexOf(StateId.toString()) !== -1);
        return this.states;
    }
    getMaxBrandId(): number {
        return this.states.length;
    }
    getRole(): void {
    }
    Save(state: State): State {
        this.states.push(state);
        return state;
    }
    Update(state: State): string {
        const Index = this.states.findIndex(a => a.State_Id === state.State_Id);
        this.states[Index] = state;
        return '';
    }
    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
    StateTransfarmer(Entity: StateEntity[]): State[] {
        // this.states = new State()[Entity.length + 1];
        Entity.forEach(element => {
            this.state = new State();
            this.state.state_Code = element.stateCode;
            this.state.Country_Code = element.countryCode;
            this.state.State_Name_Uni = element.stateNameUni;
            this.state.State_Name_ENg = 'g';
            this.state.isAuto = element.isAuto;
            this.state.IsActive = element.isActive;
            console.log('aa');
            this.states.push(this.state);
        });
        return this.states;
    }
}
