import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { State } from '../../Module/Masters/State.model';
import { StateEntity } from '../../Module/Masters/StateEntity.model';
import { StateTransfarmer } from '../../Transformer/Masters/State.transformer';

@Injectable()
export class StateService {
    str: string;
    states: State[];
    statesEntity: StateEntity;
    env = environment;
    constructor(private httpClient: HttpClient,
        private stateTransfarmer: StateTransfarmer, ) {
        this.str = this.env.apiServiceIPPort;
        this.states = [{
            State_Id: '',
            state_Code: '1',
            State_Name_ENg: 'Islamabad',
            State_Name_Uni: 'इस्लामाबाद ',
            Country_Code: '2',
            isAuto: '2',
            CreatedBy: 'SUPERADMIN',
            ModifiedBy: 'SUPERADMIN',
            CreDate: '08-03-2019',
            ModDate: null,
            IsActive: '1'
        }, {
            State_Id: '',
            state_Code: '1',
            State_Name_ENg: 'Islamabad',
            State_Name_Uni: 'इस्लामाबाद ',
            Country_Code: '2',
            isAuto: '2',
            CreatedBy: 'SUPERADMIN',
            ModifiedBy: 'SUPERADMIN',
            CreDate: '08-03-2019',
            ModDate: null,
            IsActive: '1'
        },
        ];
    }
    ListState: State[];
    // getStates(): Observable<StateEntity[]> {
    //  return this.httpClient.get<StateEntity[]>('http://devserver:8085/AjaxErpBackEnd//State/getList');
    //    return this.httpClient.get<StateEntity[]>('http://desvserver:8085/AjaxErpBackEnd//State/getList').
    //    pipe(catchError(this.handleError));
    // }

    getStates(): Observable<StateEntity[]> {
        return this.httpClient.get<StateEntity[]>(this.str + '/State/getList');
    }
    getState(StateId: number): State[] {
        // this.httpClient.get<State[]>(this.str + '/Master/getUser?UserNo=' + StateId + '&BranchNo=1');
        this.ListState = this.states.filter(states => states.State_Id.toString().indexOf(StateId.toString()) !== -1);
        return this.states;
    }
    getMaxBrandId(): string {
        return this.states.length.toString();
    }

    getRole(): void {
    }

    Save(state: StateEntity): Observable<StateEntity> {
        // this.statesEntity = this.stateTransfarmer.StateTransfarmer(state);
        console.log(this.str + 'State');
        console.log(JSON.parse(JSON.stringify(state)));
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.httpClient.post<StateEntity>(this.str + 'State', state, httpOptions).pipe(catchError(this.handleError));

    }

    Update(state: State): boolean {
        const Index = this.states.findIndex(a => a.State_Id === state.State_Id);
        this.states[Index] = state;
        return true;
    }
    private handleError(errorResponse: HttpErrorResponse) {
        console.log('hii');
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
