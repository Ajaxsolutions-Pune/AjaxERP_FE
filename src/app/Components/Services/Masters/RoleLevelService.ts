import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { DialogService } from '../MatServices/Dialog.service';
import { RoleLevel, RoleLevelEntity } from '../../Module/Masters/RoleLevel.model';

@Injectable()
export class RolelevelService {
    str: string;
    Rolelevels: RoleLevel[];
    env = environment;
    constructor(private httpClient: HttpClient, public dialogService: DialogService) {
        this.str = this.env.apiServiceIPPort;
    }
    getRolelevels(): Observable<RoleLevelEntity[]> {
        return this.httpClient.get<RoleLevelEntity[]>(this.str + '/RoleLevel/getList', this.env.httpOptions);
    }

    fillDrpRolelevels(): Observable<RoleLevelEntity[]> {
        return this.httpClient.get<RoleLevelEntity[]>(this.str + '/RoleLevel/getList?status=1', this.env.httpOptions);
    }

    getRolelevel(RolelevelCode: string): Observable<RoleLevelEntity> {
        return this.httpClient.get<RoleLevelEntity>(this.str + '/RoleLevel/' + RolelevelCode,
            this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Save(saveEntityObj: RoleLevelEntity): Observable<Insertstatus> {
     //   saveEntityObj.tlCode = null;
        return this.httpClient.post<Insertstatus>(this.str + '/RoleLevel',
            saveEntityObj, this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Update(updateEntityObj: RoleLevelEntity): Observable<Insertstatus> {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/RoleLevel', updateEntityObj
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
