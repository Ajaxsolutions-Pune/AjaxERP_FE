 import { HttpClient, HttpErrorResponse } from "@angular/common/http";
// import { Injectable } from "@angular/core";
 import { Observable, throwError } from "rxjs";
 import { catchError } from "rxjs/operators";
 import { CommonEntity } from "../../Module/common.model";
 import { environment } from "../../Module/environment";
 import { Insertstatus } from "../../Module/Masters/Insert_status.model";
 import { DialogService } from "../MatServices/Dialog.service";

import { Injectable } from '@angular/core';
import { QualificationLevel, QualificationLevelEntity } from '../../Module/HRMS/QualificationLevel.model';
// import { Qualification, QualificationEntity } from '../../Module/HRMS/Qualification.model';

@Injectable()
export class QualificationLevelService {
    str: string;
    qualificationLevels: QualificationLevel[];
    env = environment;
    constructor(private httpClient: HttpClient, public dialogService: DialogService) {
        this.str = this.env.apiServiceIPPort;
    }
    getqualificationLevels(): Observable<QualificationLevelEntity[]> {
        return this.httpClient.get<QualificationLevelEntity[]>(this.str + '/QualificationLevel/getList', this.env.httpOptions);
    }

    fillDrpqualificationLevels(): Observable<QualificationLevelEntity[]> {
        return this.httpClient.get<QualificationLevelEntity[]>(this.str + '/QualificationLevel/getList?status=1', this.env.httpOptions);
        
    }
    getQualificationLevel(qualificationLevelCode: string): Observable<QualificationLevelEntity> {
        console.log(this.str + '/QualificationLevel/' + qualificationLevelCode);
        return this.httpClient.get<QualificationLevelEntity>(this.str + '/QualificationLevel/' + qualificationLevelCode,
            this.env.httpOptions).pipe(catchError(this.handleError));
    }
    checkQualificationLevel(qualification : string,Code : string): Observable<CommonEntity> {
        console.log(this.str + '/QualificationLevel/getQualificationLevelByName?name=' + qualification +
        '&code=' + Code);
        return this.httpClient.get<CommonEntity>(this.str + '/QualificationLevel/getQualificationLevelByName?name=' + qualification +
        '&code=' + Code, this.env.httpOptions).pipe(catchError(this.handleError));
    }
   
    Save(saveEntityObj: QualificationLevelEntity): Observable<Insertstatus> {
     //   saveEntityObj.tlCode = null;
     console.log(this.str + '/QualificationLevel');
     console.log(saveEntityObj);
        return this.httpClient.post<Insertstatus>(this.str + '/QualificationLevel',
            saveEntityObj, this.env.httpOptions).pipe(catchError(this.handleError));
    }

    
    Update(updateEntityObj: QualificationLevelEntity): Observable<Insertstatus> {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/QualificationLevel', updateEntityObj
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

