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
        console.log(this.httpClient.get<RoleEntity[]>(this.str + '/Role/getList'));
        return this.httpClient.get<RoleEntity[]>(this.str + '/Role/getList', 
        this.env.httpOptions);
    }

    fillDrpAnswers(): Observable<RoleEntity[]> {
        console.log(this.httpClient.get<RoleEntity[]>(this.str + '/Answer/getList'));
        return this.httpClient.get<RoleEntity[]>(this.str + '/Answer/getList?status=1', 
        this.env.httpOptions);
    }

    getRole(RoleCode: string): Observable<RoleEntity> {
        return this.httpClient.get<RoleEntity>(this.str + '/Role/' + RoleCode,
            this.env.httpOptions).pipe(catchError(this.handleError));
   }
    
    Save(saveEntityObj: Role): Observable<Insertstatus> {
        saveEntityObj.roleId = null;
        console.log(this.str + '/Role');
        return this.httpClient.post<Insertstatus>(this.str + '/Role',
            saveEntityObj, this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Update(updateEntityObj: RoleEntity): Observable<Insertstatus> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/Role', updateEntityObj
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
        const data = null; // call api
        console.log(this.dialogService);
        this.dialogService.openModal('Title1', 'Message Test', () => {
            // confirmed
            console.log('Yes');
        }, () => {
            // not confirmed
            console.log('No');
        });
    }
}