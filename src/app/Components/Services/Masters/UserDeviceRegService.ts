import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { DialogService } from '../MatServices/Dialog.service';
import { UserDeviceReg, UserDeviceRegEntity } from '../../Module/Masters/UserDeviceReg.model';
import { CommonEntity } from '../../Module/common.model';

@Injectable()
export class UserDeviceRegService {
    str: string;
    userDeviceRegs: UserDeviceReg[];
    env = environment;
    constructor(private httpClient: HttpClient, public dialogService: DialogService) {
        this.str = this.env.apiServiceIPPort;
    }
    getUserDeviceRegs(): Observable<UserDeviceRegEntity[]> {
        return this.httpClient.get<UserDeviceRegEntity[]>(this.str + '/UserDeviceReg/getList', this.env.httpOptions);
    }

    fillDrpUserDeviceRegs(): Observable<UserDeviceRegEntity[]> {
        return this.httpClient.get<UserDeviceRegEntity[]>(this.str + '/UserDeviceReg/getList?status=1', this.env.httpOptions);
    }

    getUserDeviceReg(UserDeviceRegCode: string): Observable<UserDeviceRegEntity> {
        return this.httpClient.get<UserDeviceRegEntity>(this.str + '/UserDeviceReg/' + UserDeviceRegCode,
            this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Save(saveEntityObj: UserDeviceRegEntity): Observable<Insertstatus> {
     //   saveEntityObj.tlCode = null;
        return this.httpClient.post<Insertstatus>(this.str + '/UserDeviceReg/approveDevice',
            saveEntityObj, this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Approve(pproveEntityObj: UserDeviceRegEntity): Observable<Insertstatus> {
     //   saveEntityObj.tlCode = null;
        return this.httpClient.post<Insertstatus>(this.str + '/UserDeviceReg/approveDevice',
        pproveEntityObj, this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Resject(pproveEntityObj: UserDeviceRegEntity): Observable<Insertstatus> {
     //   saveEntityObj.tlCode = null;
        return this.httpClient.post<Insertstatus>(this.str + '/UserDeviceReg/approveDevice',
        pproveEntityObj, this.env.httpOptions).pipe(catchError(this.handleError));
    }

    checkUserDeviceReg(UserDeviceReg : string): Observable<CommonEntity> {
        return this.httpClient.get<CommonEntity>(this.str + '/UserDeviceReg/getUserDeviceRegByName?name=' + UserDeviceReg
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Update(updateEntityObj: UserDeviceRegEntity): Observable<Insertstatus> {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/UserDeviceReg', updateEntityObj
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
