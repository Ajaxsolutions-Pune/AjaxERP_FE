import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { QaTypeEntity, QaType } from '../../Module/Masters/QA_Type.model';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';

@Injectable()
export class QaTypeService {
    str: string;
    qaType: QaType[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    getQaTypes(): Observable<QaTypeEntity[]> {
        return this.httpClient.get<QaTypeEntity[]>(this.str + '/QAType/getList'
        , this.env.httpOptions);
    }
    fillQaTypes(): Observable<QaTypeEntity[]> {
        return this.httpClient.get<QaTypeEntity[]>(this.str + '/QAType/getList?status=1'
        , this.env.httpOptions);
    }

    getQaType(qaTypeCode: string): Observable<QaTypeEntity> {
        return this.httpClient.get<QaTypeEntity>(this.str + '/QAType/' + qaTypeCode
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Save(saveEntityObj: QaTypeEntity): Observable<Insertstatus> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.httpClient.post<Insertstatus>(this.str + '/QAType', saveEntityObj
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Update(updateEntityObj: QaTypeEntity): Observable<Insertstatus> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/QAType', updateEntityObj
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
