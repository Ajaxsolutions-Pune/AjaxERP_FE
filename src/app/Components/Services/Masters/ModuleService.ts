import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonEntity } from '../../Module/common.model';
import { environment } from '../../Module/environment';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { ModuleobjEntity } from '../../Module/Masters/Module.model';
import { DialogService } from '../MatServices/Dialog.service';

@Injectable()
export class ModuleobjService {
    str: string;
    env = environment;
    constructor(private httpClient: HttpClient, public dialogService: DialogService) {
        this.str = this.env.apiServiceIPPort;
    }
    getModuleobjs(): Observable<ModuleobjEntity[]> {
        return this.httpClient.get<ModuleobjEntity[]>(this.str + '/Module/getList', this.env.httpOptions);
    }

    fillDrpModuleobjs(): Observable<ModuleobjEntity[]> {
        return this.httpClient.get<ModuleobjEntity[]>(this.str + '/Module/getList?status=1', this.env.httpOptions);
    }

    getModuleobj(ModuleobjCode: string): Observable<ModuleobjEntity> {
        return this.httpClient.get<ModuleobjEntity>(this.str + '/Module/' + ModuleobjCode,
            this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Save(saveEntityObj: ModuleobjEntity): Observable<Insertstatus> {
        return this.httpClient.post<Insertstatus>(this.str + '/Module',
            saveEntityObj, this.env.httpOptions).pipe(catchError(this.handleError));
    }

    checkModuleobj(Moduleobj: string, Code: string): Observable<CommonEntity> {
        return this.httpClient.get<CommonEntity>(this.str + '/Module/getModuleByName?name=' +
            Moduleobj + '&code=' + Code
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Update(updateEntityObj: ModuleobjEntity): Observable<Insertstatus> {
        return this.httpClient.post<Insertstatus>(this.str + '/Module', updateEntityObj
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
