import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { FormQueAnsMappingEntity } from '../../Module/ProcessSetup/FormQueAnsMapping.model';
@Injectable()
export class FormQueAnsMappingService {
    str: string;
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    getFormQueAnsMappings(): Observable<FormQueAnsMappingEntity[]> {
        return this.httpClient.get<FormQueAnsMappingEntity[]>(this.str +
            '/FormQueAnsMapping/getList',
            this.env.httpOptions);
    }
    filldrpFormQueAnsMappings(): Observable<FormQueAnsMappingEntity[]> {
        return this.httpClient.get<FormQueAnsMappingEntity[]>(this.str +
            '/FormQueAnsMapping/getList?status=1',
            this.env.httpOptions);
    }

    getFormQueAnsMapping(formId: string): Observable<FormQueAnsMappingEntity[]> {
        console.log(this.str + '/GetFQAMapping/getList/Sudarshan/' + this.env.OuCode +
        '?formId=' + formId);
        return this.httpClient.get<FormQueAnsMappingEntity[]>(
            this.str + '/GetFQAMapping/getList/Sudarshan/' + this.env.OuCode +
            '?formId=' + formId
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Save(saveEntityObj: FormQueAnsMappingEntity[]): Observable<Insertstatus> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.httpClient.post<Insertstatus>(this.str + '/FormQueAnsMapping/createList', saveEntityObj
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Update(updateEntityObj: FormQueAnsMappingEntity): Observable<Insertstatus> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/FormQueAnsMapping', updateEntityObj
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
