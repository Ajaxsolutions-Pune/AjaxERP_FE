import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { Zone, ZoneEntity } from '../../Module/Masters/Zone.model';

@Injectable()
export class ZoneService {
    str: string;
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    getZones(): Observable<ZoneEntity[]> {
        console.log(this.httpClient.get<ZoneEntity[]>(this.str + '/Zone/getList'));
        return this.httpClient.get<ZoneEntity[]>(this.str + '/Zone/getList', this.env.httpOptions);
    }
    fillZoneDrp(): Observable<ZoneEntity[]> {
        return this.httpClient.get<ZoneEntity[]>(this.str
            + '/Zone/getList?status=1', this.env.httpOptions);
    }

    getZone(qaTypeCode: string): Observable<ZoneEntity> {
        return this.httpClient.get<ZoneEntity>(this.str + '/Zone/' + qaTypeCode
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Save(saveEntityObj: ZoneEntity): Observable<Insertstatus> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.httpClient.post<Insertstatus>(this.str + '/Zone', saveEntityObj
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Update(updateEntityObj: ZoneEntity): Observable<Insertstatus> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/Zone', updateEntityObj
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
