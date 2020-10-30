import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { UserGroupMappingEntity } from '../../Module/ProcessSetup/UserGroupMapping.model';
@Injectable()
export class UserGroupMappingService {
    str: string;
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    getUserGroupMappings(): Observable<UserGroupMappingEntity[]> {
        return this.httpClient.get<UserGroupMappingEntity[]>(this.str +
            '/UserGroupUserMapping/getList',            
            this.env.httpOptions);
            //'/ProcessFormMapping/getList',
    }
    getUserGroupMapping(deviceId: string): Observable<UserGroupMappingEntity[]> {
        return this.httpClient.get<UserGroupMappingEntity[]>(
            this.str + '/UserGroupUserMapping/getList/' + this.env.OuCode + '?userGroupId=' + deviceId
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Save(saveEntityObj: UserGroupMappingEntity[]): Observable<Insertstatus> {
        return this.httpClient.post<Insertstatus>(this.str + '/UserGroupUserMapping/createList', saveEntityObj
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Update(updateEntityObj: UserGroupMappingEntity): Observable<Insertstatus> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/UserGroupUserMapping', updateEntityObj
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
