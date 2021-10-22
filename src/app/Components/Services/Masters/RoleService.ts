import { Injectable, Component } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Role, RoleEntity } from '../../Module/Masters/Role.model';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { DialogService } from '../MatServices/Dialog.service';

@Injectable()
export class RoleService {
    str: string;
    roles: Role[];
    env = environment;
    ListRole: Role[];
    constructor(private httpClient: HttpClient, public dialogService: DialogService) {
        this.str = this.env.apiServiceIPPort;
    }
    Listrole: Role[];
    getRoles(): Observable<RoleEntity[]> {
        return this.httpClient.get<RoleEntity[]>(this.str + '/RoleNew/getList',
            this.env.httpOptions);
    }

    fillDrpRoleNew(): Observable<RoleEntity[]> {
        return this.httpClient.get<RoleEntity[]>(this.str + '/RoleNew/getList?status=1',
            this.env.httpOptions);
    }

    getRole(RoleCode: string): Observable<RoleEntity> {
        return this.httpClient.get<RoleEntity>(this.str + '/RoleNew/' + RoleCode,
            this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Save(saveEntityObj: Role): Observable<Insertstatus> {
        saveEntityObj.roleId = null;
        return this.httpClient.post<Insertstatus>(this.str + '/RoleNew',
            saveEntityObj, this.env.httpOptions).pipe(catchError(this.handleError));
    }

    checkRole(access: string): Observable<RoleEntity> {
       return this.httpClient.get<RoleEntity>(this.str + '/RoleNew/getAccessByName?name=' + access
           , this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Update(updateEntityObj: RoleEntity): Observable<Insertstatus> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/RoleNew', updateEntityObj
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
