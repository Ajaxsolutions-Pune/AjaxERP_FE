import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Process, ProcessEntity } from '../../Module/Masters/Process.model';
import { ProcessFormMappingEntity } from '../../Module/ProcessSetup/ProcessFormMapping.model';
import { CommonEntity } from '../../Module/common.model';

@Injectable()
export class ProcessService1 {
    str: string;
    processs: Process[];
    env = environment;
    Listprocess: Process[];
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    getprocesss(): Observable<ProcessEntity[]> {
        return this.httpClient.get<ProcessEntity[]>(this.str + '/Process/getList'
            , this.env.httpOptions);
    }
    filldrpProcessFormMappings(): Observable<ProcessEntity[]> {
        return this.httpClient.get<ProcessEntity[]>(this.str +
            '/ProcessFormMapping/getList?status=1',
            this.env.httpOptions);
    }

    fillProcessDrpByAssetGroup(assetGruopCode: string): Observable<Process[]> {
        return this.httpClient.get<Process[]>(this.str + '/Process/getList?status=1&assetGroupCode=' + assetGruopCode, this.env.httpOptions);
    }

    fillDrpProcess(): Observable<ProcessEntity[]> {
        return this.httpClient.get<ProcessEntity[]>(this.str + '/Process/getList?status=1', this.env.httpOptions);
    }

    getprocess(processCode: string): Observable<ProcessEntity> {
        return this.httpClient.get<ProcessEntity>(this.str + '/Process/' + processCode
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    checkProcess(process: string, code: string): Observable<CommonEntity> {
        return this.httpClient.get<CommonEntity>(this.str + '/Process/getProcessByName?name=' + process +
            '&id=' + code
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }



    Save(saveEntityObj: ProcessEntity): Observable<ProcessEntity> {
        saveEntityObj.processId = null;
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.httpClient.post<ProcessEntity>(this.str + '/Process', saveEntityObj
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Update(updateEntityObj: ProcessEntity): Observable<ProcessEntity> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.httpClient.post<ProcessEntity>(this.str + '/Process', updateEntityObj
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
