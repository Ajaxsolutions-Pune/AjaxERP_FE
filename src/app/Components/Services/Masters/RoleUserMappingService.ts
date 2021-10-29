import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { DialogService } from '../MatServices/Dialog.service';
import { RoleUserMapping, RoleUserMappingEntity } from '../../Module/Masters/RoleUserMapping.model';
import { CommonEntity } from '../../Module/common.model';

@Injectable()
export class RoleUserMappingService {
    str: string;
    RoleUserMappings: RoleUserMapping[];
    env = environment;
    constructor(private httpClient: HttpClient, public dialogService: DialogService) {
        this.str = this.env.apiServiceIPPort;
    }
    getRoleUserMappings(): Observable<RoleUserMappingEntity[]> {
        return this.httpClient.get<RoleUserMappingEntity[]>(this.str + '/RoleUserMapping/getList', this.env.httpOptions);
    }

    fillDrpRoleuser(): Observable<RoleUserMappingEntity[]> {
        return this.httpClient.get<RoleUserMappingEntity[]>(this.str + '/RoleUserMapping/getList', this.env.httpOptions);
    }

    getRoleUserMapping(RoleUserMappingCode: string): Observable<RoleUserMappingEntity> {
        return this.httpClient.get<RoleUserMappingEntity>(this.str + '/RoleUserMapping/' + RoleUserMappingCode,
            this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Save(saveEntityObj: RoleUserMappingEntity): Observable<Insertstatus> {
     //   saveEntityObj.tlCode = null;
        return this.httpClient.post<Insertstatus>(this.str + '/RoleUserMapping',
            saveEntityObj, this.env.httpOptions).pipe(catchError(this.handleError));
    }

    checkRoleUserMappings(loginId : string): Observable<CommonEntity> {
        return this.httpClient.get<CommonEntity>(this.str + '/RoleUserMapping/getRoleUserMappingByLoginId?code=' + loginId ,
         this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Update(updateEntityObj: RoleUserMappingEntity): Observable<Insertstatus> {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/RoleUserMapping', updateEntityObj
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
