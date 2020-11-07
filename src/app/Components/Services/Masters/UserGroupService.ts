import { Injectable, Component } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { User, UserEntity } from '../../Module/Masters/User.model';
 import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { DialogService } from '../MatServices/Dialog.service';
import { CommonEntity } from '../../Module/common.model';
import { UserGroup, UserGroupEntity } from '../../Module/Masters/UserGroup.model';

@Injectable()
export class UserGroupService {
    
    str: string;
    userGroups: UserGroup[];
    env = environment;
    ListUserGroup: UserGroup[];
    constructor(private httpClient: HttpClient, public dialogService: DialogService) {
        this.str = this.env.apiServiceIPPort;
    }
    Listanswer: UserGroup[];
    getUserGroups(): Observable<UserGroupEntity[]> {
        console.log(this.str + '/UserGroup/getList');
        return this.httpClient.get<UserGroupEntity[]>(this.str + '/UserGroup/getList/'+this.env.OuCode, this.env.httpOptions);
    }

    fillDrpUserGroups(): Observable<UserGroupEntity[]> {
        console.log(this.str + '/UserGroup/getList?ouCode='+this.env.OuCode+'?status=1');
        return this.httpClient.get<UserGroupEntity[]>(this.str + '/UserGroup/getList?'
        +'ouCode='+this.env.OuCode+'&status=1', this.env.httpOptions);
    }

    checkUserGroup(zone: string, Id: string): Observable<CommonEntity> {
        console.log(this.str + '/UserGroup/getUserByName?name="' +
        zone + '"&code=' + Id + '');
        return this.httpClient.get<CommonEntity>(this.str + '/UserGroup/getUserByName?name=' +
            zone + '&code=' + Id + ''
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    getUserGroup(UserCode: string): Observable<UserGroupEntity> {
        return this.httpClient.get<UserGroupEntity>(this.str + '/UserGroup/' + UserCode,
            this.env.httpOptions).pipe(catchError(this.handleError));
    }
    
    Save(saveEntityObj: UserGroupEntity): Observable<Insertstatus> {
        saveEntityObj.userGroupId = null;
        //console.log(this.str + '/User');
        console.log(saveEntityObj);
        return this.httpClient.post<Insertstatus>(this.str + '/UserGroup',
            saveEntityObj, this.env.httpOptions).pipe(catchError(this.handleError));
        
    }

    Update(updateEntityObj: UserGroupEntity): Observable<Insertstatus> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/UserGroup', updateEntityObj
        , this.env.httpOptions).pipe(catchError(this.handleError)); 
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
