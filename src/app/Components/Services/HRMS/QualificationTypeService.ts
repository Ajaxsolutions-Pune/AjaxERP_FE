import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { CommonEntity } from "../../Module/common.model";
import { environment } from "../../Module/environment";
import { Insertstatus } from "../../Module/Masters/Insert_status.model";
import { DialogService } from "../MatServices/Dialog.service";
import { Injectable } from '@angular/core';
import { QualificationType, QualificationTypeEntity } from '../../Module/HRMS/QualificationType.model';

@Injectable()
export class QualificationTypeService {
    str: string;
    qualificationTypes: QualificationType[];
    env = environment;
    constructor(private httpClient: HttpClient, public dialogService: DialogService) {
        this.str = this.env.apiServiceIPPort;
    }
    getqualificationTypes(): Observable<QualificationTypeEntity[]> {
        return this.httpClient.get<QualificationTypeEntity[]>(this.str + '/QualificationType/getList', this.env.httpOptions);
    }

    fillDrpqualificationTypes(): Observable<QualificationTypeEntity[]> {
        return this.httpClient.get<QualificationTypeEntity[]>(this.str + '/QualificationType/getList?status=1', this.env.httpOptions);

    }
    getQualificationType(qualificationTypeCode: string): Observable<QualificationTypeEntity> {
        console.log(this.str + '/QualificationType/' + qualificationTypeCode);
        return this.httpClient.get<QualificationTypeEntity>(this.str + '/QualificationType/' + qualificationTypeCode,
            this.env.httpOptions).pipe(catchError(this.handleError));
    }
    checkQualificationType(qualificationType: string, Code: string): Observable<CommonEntity> {
        console.log(this.str + '/QualificationType/getQualificationTypeByName?name=' + qualificationType +
            '&code=' + Code);
        return this.httpClient.get<CommonEntity>(this.str + '/QualificationType/getQualificationTypeByName?name=' + qualificationType +
            '&code=' + Code, this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Save(saveEntityObj: QualificationTypeEntity): Observable<Insertstatus> {
        //   saveEntityObj.tlCode = null;
        console.log(this.str + '/QualificationType');
        console.log(saveEntityObj);
        return this.httpClient.post<Insertstatus>(this.str + '/QualificationType',
            saveEntityObj, this.env.httpOptions).pipe(catchError(this.handleError));
    }


    Update(updateEntityObj: QualificationTypeEntity): Observable<Insertstatus> {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/QualificationType', updateEntityObj
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
        const data = null; // call api
        this.dialogService.openModal('Title1', 'Message Test', () => {
        }, () => {
        });
    }
}

