import { Injectable, Component } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { User, UserEntity } from '../../Module/Masters/User.model';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { DialogService } from '../MatServices/Dialog.service';
import { DatePipe } from '@angular/common';
import { CommonEntity } from '../../Module/common.model';

@Injectable()
export class UserService {
    str: string;
    users: User[];
    env = environment;
    ListUser: User[];
    constructor(private httpClient: HttpClient, public dialogService: DialogService) {
        this.str = this.env.apiServiceIPPort;
    }
    Listanswer: User[];
    getUsers(): Observable<UserEntity[]> {
        console.log(this.str + '/User/getList');
        return this.httpClient.get<UserEntity[]>(this.str + '/User/getList?ouCode='+this.env.OuCode, this.env.httpOptions);
    }

    fillDrpUsers(): Observable<UserEntity[]> {
        console.log(this.str + '/User/getList?ouCode='+this.env.OuCode+'?status=1');
        return this.httpClient.get<UserEntity[]>(this.str + '/User/getList?'
        +'ouCode='+this.env.OuCode+'&status=1', this.env.httpOptions);
    }

    checkUser(zone: string, Id: string): Observable<CommonEntity> {
        console.log(this.str + '/User/getUserByName?name="' +
        zone + '"&code=' + Id + '');
        return this.httpClient.get<CommonEntity>(this.str + '/User/getUserByName?name=' +
            zone + '&code=' + Id + ''
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    getUser(UserCode: string): Observable<UserEntity> {
        return this.httpClient.get<UserEntity>(this.str + '/User/' + UserCode +'/' + this.env.OuCode +
        '',
            this.env.httpOptions).pipe(catchError(this.handleError));
    }
    
    Save(saveEntityObj: UserEntity): Observable<Insertstatus> {
        saveEntityObj.id = null;
        //console.log(this.str + '/User');
        console.log(saveEntityObj);
        return this.httpClient.post<Insertstatus>(this.str + '/User',
            saveEntityObj, this.env.httpOptions).pipe(catchError(this.handleError));
        
    }

    Update(updateEntityObj: UserEntity): Observable<Insertstatus> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/User', updateEntityObj
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
