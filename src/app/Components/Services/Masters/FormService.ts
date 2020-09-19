import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { FormObj, FormEntity } from '../../Module/Masters/form.model';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';

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
        console.log(this.str + '/Form/getList');
        return this.httpClient.get<FormEntity[]>(this.str + '/Form/getList', this.env.httpOptions);
    }

    fillDrpForms(): Observable<FormEntity[]> {
        console.log(this.str + '/Form/getList');
        return this.httpClient.get<FormEntity[]>(this.str + '/Form/getList?status=1', this.env.httpOptions);
    }

    fillDrpFormsByProcessId(): Observable<FormEntity[]> {
        console.log(this.str + '/Form/getList');
        return this.httpClient.get<FormEntity[]>(this.str + '/Form/getList?status=1', this.env.httpOptions);
    }


    getForm(formCode: string): Observable<FormEntity> {
        return this.httpClient.get<FormEntity>(this.str + '/Form/' + formCode
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }
    
    Save(saveEntityObj: FormEntity): Observable<Insertstatus> {
        saveEntityObj.formId = null;
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.httpClient.post<Insertstatus>(this.str + '/Form', saveEntityObj
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Update(updateEntityObj: FormEntity): Observable<Insertstatus> {
        console.log(this.str + '/Form');
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.httpClient.post<Insertstatus>(this.str + '/Form', updateEntityObj
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
