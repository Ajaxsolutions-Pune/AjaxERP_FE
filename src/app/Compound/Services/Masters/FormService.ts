import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { FormObj, FormEntity } from '../../Module/Masters/form.model';

@Injectable()
export class FormService {
    str: string;
    form: FormObj[];
    env = environment;
    Listform: FormObj[];
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    ListForm: FormObj[];
    getForms(): Observable<FormEntity[]> {
        return this.httpClient.get<FormEntity[]>(this.str + '/Form/getList');
    }

    getForm(formCode: string): Observable<FormEntity> {
        return this.httpClient.get<FormEntity>(this.str + '/Form/' + formCode).pipe(catchError(this.handleError));
    }
    Save(saveEntityObj: FormEntity): Observable<FormEntity> {
        saveEntityObj.formId = null;
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.httpClient.post<FormEntity>(this.str + '/Form', saveEntityObj, httpOptions).pipe(catchError(this.handleError));
    }

    Update(updateEntityObj: FormEntity): Observable<FormEntity> {
        console.log(this.str + '/Form');
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.httpClient.post<FormEntity>(this.str + '/Form', updateEntityObj, httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
