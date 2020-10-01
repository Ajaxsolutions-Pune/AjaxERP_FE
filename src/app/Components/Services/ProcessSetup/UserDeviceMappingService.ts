import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { UserDeviceMappingEntity } from '../../Module/ProcessSetup/UserDeviceMapping.model';
@Injectable()
export class UserDeviceMappingService {
    str: string;
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    getUserDeviceMappings(): Observable<UserDeviceMappingEntity[]> {
        return this.httpClient.get<UserDeviceMappingEntity[]>(this.str +
            '/UserDeviceMapping/getList',            
            this.env.httpOptions);
            //'/ProcessFormMapping/getList',
    }
    getUserDeviceMapping(deviceId: string): Observable<UserDeviceMappingEntity[]> {
        return this.httpClient.get<UserDeviceMappingEntity[]>(
            this.str + '/UserDeviceMapping/getList?deviceId=' + deviceId
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Save(saveEntityObj: UserDeviceMappingEntity[]): Observable<Insertstatus> {
        return this.httpClient.post<Insertstatus>(this.str + '/UserDeviceMapping/createList', saveEntityObj
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Update(updateEntityObj: UserDeviceMappingEntity): Observable<Insertstatus> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/UserDeviceMapping', updateEntityObj
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
