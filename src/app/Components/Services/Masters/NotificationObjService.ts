import { Injectable, Component } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { DialogService } from '../MatServices/Dialog.service';
import { CommonEntity } from '../../Module/common.model';
import { NotificationObj, NotificationObjEntity } from '../../Module/Masters/NotificationObj.model';

@Injectable()
export class NotificationObjService {
    str: string;
    notificationObjs: NotificationObj[];
    env = environment;
    ListUserGroup: NotificationObj[];
    constructor(private httpClient: HttpClient, public dialogService: DialogService) {
        this.str = this.env.apiServiceIPPort;
    }
    Listanswer: NotificationObj[];
    getNotificationObjs(): Observable<NotificationObjEntity[]> {
        console.log(this.str + '/Notification/getList');
        return this.httpClient.get<NotificationObjEntity[]>(this.str + '/Notification/getList/'+this.env.OuCode, this.env.httpOptions);
    }

    fillDrpNotificationObjs(): Observable<NotificationObjEntity[]> {
        console.log(this.str + '/Notification/getList?ouCode='+this.env.OuCode+'?status=1');
        return this.httpClient.get<NotificationObjEntity[]>(this.str + '/Notification/getList?'
        +'ouCode='+this.env.OuCode+'&status=1', this.env.httpOptions);
    }

    getNotificationObj(UserCode: string): Observable<NotificationObjEntity> {
        return this.httpClient.get<NotificationObjEntity>(this.str + '/Notification/' + UserCode,
            this.env.httpOptions).pipe(catchError(this.handleError));
    }
    
    Save(saveEntityObj: NotificationObjEntity): Observable<Insertstatus> {
        saveEntityObj.notificationId = null;
        //console.log(this.str + '/User');
        console.log(saveEntityObj);
        return this.httpClient.post<Insertstatus>(this.str + '/Notification',
            saveEntityObj, this.env.httpOptions).pipe(catchError(this.handleError));
        
    }
    
    Update(updateEntityObj: NotificationObjEntity): Observable<Insertstatus> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/Notification', updateEntityObj
        , this.env.httpOptions).pipe(catchError(this.handleError)); 
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
