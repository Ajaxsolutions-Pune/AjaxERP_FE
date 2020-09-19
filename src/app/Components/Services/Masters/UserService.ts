import { Injectable, Component } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { User, UserEntity } from '../../Module/Masters/User.model';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { DialogService } from '../MatServices/Dialog.service';
import { DatePipe } from '@angular/common';

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
        console.log(this.httpClient.get<UserEntity[]>(this.str + '/User/getList'));
        return this.httpClient.get<UserEntity[]>(this.str + '/User/getList', this.env.httpOptions);
    }

    fillDrpUsers(): Observable<UserEntity[]> {
        console.log(this.httpClient.get<UserEntity[]>(this.str + '/User/getList'));
        return this.httpClient.get<UserEntity[]>(this.str + '/User/getList?status=1', this.env.httpOptions);
    }

    getUser(AnswerCode: string): Observable<UserEntity> {
        return this.httpClient.get<UserEntity>(this.str + '/User/' + AnswerCode,
            this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Save(saveEntityObj: UserEntity): Observable<Insertstatus> {
        saveEntityObj.id = null;
        console.log(this.str + '/User');
        return this.httpClient.post<Insertstatus>(this.str + '/User',
            saveEntityObj, this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Update(updateEntityObj: UserEntity): Observable<Insertstatus> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/Answer', updateEntityObj
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
