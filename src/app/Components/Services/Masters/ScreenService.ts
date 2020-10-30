import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonEntity } from '../../Module/common.model';
import { environment } from '../../Module/environment';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { DialogService } from '../MatServices/Dialog.service';
import { ScreenObjEntity } from '../../Module/Masters/Screen.model';

@Injectable()
export class ScreenObjService {
    str: string;
    env = environment;
    constructor(private httpClient: HttpClient, public dialogService: DialogService) {
        this.str = this.env.apiServiceIPPort;
    }
    getScreens(): Observable<ScreenObjEntity[]> {
        return this.httpClient.get<ScreenObjEntity[]>(this.str + '/Screen/getList', this.env.httpOptions);
    }

    fillDrpScreens(): Observable<ScreenObjEntity[]> {
        return this.httpClient.get<ScreenObjEntity[]>(this.str + '/Screen/getList?status=1', this.env.httpOptions);
    }

    getScreen(ScreenCode: string): Observable<ScreenObjEntity> {
        return this.httpClient.get<ScreenObjEntity>(this.str + '/Screen/' + ScreenCode,
            this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Save(saveEntityObj: ScreenObjEntity): Observable<Insertstatus> {
        return this.httpClient.post<Insertstatus>(this.str + '/Screen',
            saveEntityObj, this.env.httpOptions).pipe(catchError(this.handleError));
    }

    checkScreen(Screen: string, Code: string): Observable<CommonEntity> {
        return this.httpClient.get<CommonEntity>(this.str + '/Screen/getScreenByName?name=' +
            Screen + '&code=' + Code
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Update(updateEntityObj: ScreenObjEntity): Observable<Insertstatus> {
        return this.httpClient.post<Insertstatus>(this.str + '/Screen', updateEntityObj
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
