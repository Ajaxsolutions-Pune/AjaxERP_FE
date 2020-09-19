import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { Device, DeviceEntity } from '../../Module/Masters/Device.model';

@Injectable()
export class DeviceService {
    str: string;
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    
    getDevices(): Observable<DeviceEntity[]> {
        return this.httpClient.get<DeviceEntity[]>(this.str + '/Device/getList'
        , this.env.httpOptions);
    }

    fillDrpAnswers(): Observable<DeviceEntity[]> {
        return this.httpClient.get<DeviceEntity[]>(this.str + '/Device/getList', this.env.httpOptions);
    }

    fillDrpDevices(): Observable<DeviceEntity[]> {
        return this.httpClient.get<DeviceEntity[]>(this.str + '/Device/getList', this.env.httpOptions);
    }

    getDevice(qaTypeCode: string): Observable<DeviceEntity> {
        return this.httpClient.get<DeviceEntity>(this.str + '/Device/' + qaTypeCode
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Save(saveEntityObj: DeviceEntity): Observable<Insertstatus> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.httpClient.post<Insertstatus>(this.str + '/Device', saveEntityObj
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Update(updateEntityObj: DeviceEntity): Observable<Insertstatus> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/Device', updateEntityObj
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
