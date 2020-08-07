import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { Circle, CircleEntity } from '../../Module/Masters/Circle.model';

@Injectable()
export class CircleService {
    str: string;
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    getCircles(): Observable<CircleEntity[]> {
        return this.httpClient.get<CircleEntity[]>(this.str + '/Circle/getList');
    }

    getCircle(qaTypeCode: string): Observable<CircleEntity> {
        return this.httpClient.get<CircleEntity>(this.str + '/Circle/' + qaTypeCode).pipe(catchError(this.handleError));
    }
    Save(saveEntityObj: CircleEntity): Observable<Insertstatus> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.httpClient.post<Insertstatus>(this.str + '/Circle', saveEntityObj, httpOptions).pipe(catchError(this.handleError));
    }

    Update(updateEntityObj: CircleEntity): Observable<Insertstatus> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/Circle', updateEntityObj, httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
