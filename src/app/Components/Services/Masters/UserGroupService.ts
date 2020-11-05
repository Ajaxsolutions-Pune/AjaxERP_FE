import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { DialogService } from '../MatServices/Dialog.service';
import { UserGroup, UserGroupEntity } from '../../Module/Masters/UserGroup.model';
import { CommonEntity } from '../../Module/common.model';

@Injectable()
export class UserGroupService {
    str: string;
    env = environment;
    constructor(private httpClient: HttpClient, public dialogService: DialogService) {
        this.str = this.env.apiServiceIPPort;
    }
    getUserGroups(): Observable<UserGroupEntity[]> {
        return this.httpClient.get<UserGroupEntity[]>(this.str + '/UserGroup/getList/'+ this.env.OuCode,
         this.env.httpOptions);
    }

    fillDrpUserGroups(): Observable<UserGroupEntity[]> {
        console.log(this.str + 
            '/UserGroup/getList'+ this.env.OuCode+'?status=1');
        return this.httpClient.get<UserGroupEntity[]>(this.str + 
            '/UserGroup/getList/'+ this.env.OuCode+'?status=1', this.env.httpOptions);
    }

    getUserGroup(UserGroupCode: string): Observable<UserGroupEntity> {
        return this.httpClient.get<UserGroupEntity>(this.str + '/UserGroup/' + UserGroupCode,
            this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Save(saveEntityObj: UserGroupEntity): Observable<Insertstatus> {
     //   saveEntityObj.tlCode = null;
        return this.httpClient.post<Insertstatus>(this.str + '/UserGroup',
            saveEntityObj, this.env.httpOptions).pipe(catchError(this.handleError));
    }

    checkUserGroup(UserGroup : string,Code : string): Observable<CommonEntity> {
        return this.httpClient.get<CommonEntity>(this.str + '/UserGroup/getUserGroupByName?name=' + UserGroup +
        '&id=' + Code, this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Update(updateEntityObj: UserGroupEntity): Observable<Insertstatus> {
        return this.httpClient.post<Insertstatus>(this.str + '/UserGroup', updateEntityObj
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
        this.dialogService.openModal('Title1', 'Message Test', () => {
        }, () => {
        });
    }
}
