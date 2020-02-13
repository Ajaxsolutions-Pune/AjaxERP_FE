import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { State } from '../../Module/Masters/State.model';

@Injectable()
export class StateService {
    str: string;
    states: State[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
        this.states = [{
            State_Id: 1,
            State_Code: 'maharashtra',
            State_Name_ENg: 'maharashtra',
            State_Name_Uni: 'महाराष्ट्र',
            Country_Id: 1,
            CreatedBy: 'SUPERADMIN',
            ModifiedBy: 'SUPERADMIN',
            CreDate: '08-03-2019',
            ModDate: null,
            IsActive: true
        }, {
            State_Id: 2,
            State_Code: 'Islamabad',
            State_Name_ENg: 'Islamabad',
            State_Name_Uni: 'इस्लामाबाद ',
            Country_Id: 2,
            CreatedBy: 'SUPERADMIN',
            ModifiedBy: 'SUPERADMIN',
            CreDate: '08-03-2019',
            ModDate: null,
            IsActive: true
        },
        ];
    }
    ListState: State[];
    getStates(): State[] {
        return this.states;
    }

    getState(StateId: number): State[] {
        console.log('StateId');
        console.log(StateId);
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
}
