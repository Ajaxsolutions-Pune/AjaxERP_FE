import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Process, ProcessEntity } from '../../Module/Masters/Process.model';

@Injectable()
export class ProcessService1 {
    str: string;
    processs: Process[];
    env = environment;
    Listprocess: Process[];
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    getprocesss(): Observable<ProcessEntity[]> {
        console.log(this.str + '/Process/getList');
        return this.httpClient.get<ProcessEntity[]>(this.str + '/Process/getList'
        , this.env.httpOptions);
    }

    getprocess(processCode: string): Observable<ProcessEntity> {
        return this.httpClient.get<ProcessEntity>(this.str + '/Process/' + processCode
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Save(saveEntityObj: ProcessEntity): Observable<ProcessEntity> {
        saveEntityObj.processId = null;
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.httpClient.post<ProcessEntity>(this.str + '/Process', saveEntityObj
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Update(updateEntityObj: ProcessEntity): Observable<ProcessEntity> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.httpClient.post<ProcessEntity>(this.str + '/Process', updateEntityObj
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
