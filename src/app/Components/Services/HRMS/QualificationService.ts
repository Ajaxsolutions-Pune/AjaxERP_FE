import { HttpClient, HttpErrorResponse } from "@angular/common/http";
// import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { CommonEntity } from "../../Module/common.model";
import { environment } from "../../Module/environment";
import { Insertstatus } from "../../Module/Masters/Insert_status.model";
import { DialogService } from "../MatServices/Dialog.service";

import { Injectable } from '@angular/core';
import { Qualification, QualificationEntity } from '../../Module/HRMS/Qualification.model';

@Injectable()
export class QualificationService {
    str: string;
    qualifications: Qualification[];
    env = environment;
    constructor(private httpClient: HttpClient, public dialogService: DialogService) {
        this.str = this.env.apiServiceIPPort;
    }
    getqualifications(): Observable<QualificationEntity[]> {
        return this.httpClient.get<QualificationEntity[]>(this.str + '/Qualifications/getList', this.env.httpOptions);
    }

    fillDrpqualifications(): Observable<QualificationEntity[]> {
        return this.httpClient.get<QualificationEntity[]>(this.str + '/Qualifications/getList?status=1', this.env.httpOptions);

    }
    getQualification(qualificationCode: string): Observable<QualificationEntity> {
        console.log(this.str + '/Qualifications/' + qualificationCode);
        return this.httpClient.get<QualificationEntity>(this.str + '/Qualifications/' + qualificationCode,
            this.env.httpOptions).pipe(catchError(this.handleError));
    }
    checkQualification(qualification: string, Code: string): Observable<CommonEntity> {
        return this.httpClient.get<CommonEntity>(this.str + '/Qualifications/getQualificationsByName?name=' + qualification +
            '&code=' + Code, this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Save(saveEntityObj: QualificationEntity): Observable<Insertstatus> {
        //   saveEntityObj.tlCode = null;
        console.log(this.str + '/Qualifications');
        console.log(saveEntityObj);
        return this.httpClient.post<Insertstatus>(this.str + '/Qualifications',
            saveEntityObj, this.env.httpOptions).pipe(catchError(this.handleError));
    }


    Update(updateEntityObj: QualificationEntity): Observable<Insertstatus> {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/Qualifications', updateEntityObj
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

