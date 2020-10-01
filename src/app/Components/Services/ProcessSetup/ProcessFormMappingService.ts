import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { ProcessFormMappingEntity } from '../../Module/ProcessSetup/ProcessFormMapping.model';
@Injectable()
export class ProcessFormMappingService {
    str: string;
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    getProcessFormMappings(): Observable<ProcessFormMappingEntity[]> {
        return this.httpClient.get<ProcessFormMappingEntity[]>(this.str +
            '/ProcessFormMapping/getList',
            this.env.httpOptions);
    }

    filldrpProcessFormMappings(): Observable<ProcessFormMappingEntity[]> {
        return this.httpClient.get<ProcessFormMappingEntity[]>(this.str +
            '/ProcessFormMapping/getList?status=1',
            this.env.httpOptions);
    }

    getProcessFormMapping(processId: string): Observable<ProcessFormMappingEntity[]> {
          return this.httpClient.get<ProcessFormMappingEntity[]>(
            this.str + '/GetPFMapping/getList/Sudarshan/12?processId=' + processId +'&activeStatus=1'
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Save(saveEntityObj: ProcessFormMappingEntity[]): Observable<Insertstatus> {
        return this.httpClient.post<Insertstatus>(this.str + '/ProcessFormMapping/createList', saveEntityObj
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Update(updateEntityObj: ProcessFormMappingEntity): Observable<Insertstatus> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/ProcessFormMapping', updateEntityObj
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
