import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { State } from '../../Module/Masters/State.model';
import { StateEntity } from '../../Module/Masters/StateEntity.model';
import { StateTransfarmer } from '../../Transformer/Masters/State-transformer';

@Injectable()
export class StateService {
    str: string;
    states: State[];
    statesEntity: StateEntity;
    env = environment;
    constructor(private httpClient: HttpClient, ) {
        this.str = this.env.apiServiceIPPort;

    }
    ListState: State[];

    getStates(): Observable<StateEntity[]> {
        return this.httpClient.get<StateEntity[]>(this.str + '/State/getList'
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }
    getState(StateCode: string): Observable<StateEntity[]> {
        console.log(this.str + '/State/' + StateCode);
        return this.httpClient.get<StateEntity[]>(this.str + 'State/' + StateCode
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Save(state: StateEntity): Observable<StateEntity> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.httpClient.post<StateEntity>(this.str + 'State', state
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Update(state: StateEntity): Observable<StateEntity> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.httpClient.post<StateEntity>(this.str + 'State', state
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }
    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
