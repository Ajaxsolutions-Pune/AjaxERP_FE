import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { DialogService } from '../MatServices/Dialog.service';
import { Access, AccessEntity } from '../../Module/Masters/Access.model';
import { CommonEntity } from '../../Module/common.model';

@Injectable()
export class AccessService {
    str: string;
    Accesss: Access[];
    env = environment;
    constructor(private httpClient: HttpClient, public dialogService: DialogService) {
        this.str = this.env.apiServiceIPPort;
    }
    getAccesss(): Observable<AccessEntity[]> {
        return this.httpClient.get<AccessEntity[]>(this.str + '/Access/getList', this.env.httpOptions);
    }

    fillDrpAccesss(): Observable<AccessEntity[]> {
        return this.httpClient.get<AccessEntity[]>(this.str + '/Access/getList?status=1', this.env.httpOptions);
    }

    getAccess(AccessCode: string): Observable<AccessEntity> {
        return this.httpClient.get<AccessEntity>(this.str + '/Access/' + AccessCode,
            this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Save(saveEntityObj: AccessEntity): Observable<Insertstatus> {
     //   saveEntityObj.tlCode = null;
        return this.httpClient.post<Insertstatus>(this.str + '/Access',
            saveEntityObj, this.env.httpOptions).pipe(catchError(this.handleError));
    }

    checkAccess(access : string,Code : string): Observable<CommonEntity> {
        return this.httpClient.get<CommonEntity>(this.str + '/Access/getAccessByName?name=' + access +
        '&id=' + Code, this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Update(updateEntityObj: AccessEntity): Observable<Insertstatus> {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/Access', updateEntityObj
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
