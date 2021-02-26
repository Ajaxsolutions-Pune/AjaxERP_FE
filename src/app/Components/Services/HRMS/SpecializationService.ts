import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { CommonEntity } from "../../Module/common.model";
import { environment } from "../../Module/environment";
import { Insertstatus } from "../../Module/Masters/Insert_status.model";
import { DialogService } from "../MatServices/Dialog.service";

import { Injectable } from '@angular/core';
import { Specialization, SpecializationEntity } from "../../Module/HRMS/Specialization.model";

@Injectable()
export class SpecializationService {
    str: string;
    specializations: Specialization[];
    env = environment;
    constructor(private httpClient: HttpClient, public dialogService: DialogService) {
        this.str = this.env.apiServiceIPPort;
    }
    getspecializations(): Observable<SpecializationEntity[]> {
        return this.httpClient.get<SpecializationEntity[]>(this.str + '/Specialization/getList', this.env.httpOptions);
    }

    fillDrpspecializations(): Observable<SpecializationEntity[]> {
        return this.httpClient.get<SpecializationEntity[]>(this.str + '/Specialization/getList?status=1', this.env.httpOptions);

    }
    getSpecialization(specializationCode: string): Observable<SpecializationEntity> {
        console.log(this.str + '/Specialization/' + specializationCode);
        return this.httpClient.get<SpecializationEntity>(this.str + '/Specialization/' + specializationCode,
            this.env.httpOptions).pipe(catchError(this.handleError));
    }
    checkSpecialization(specialization: string, Code: string): Observable<CommonEntity> {
        console.log(this.str + '/Specialization/getSpecializationByName?name=' + specialization +
            '&code=' + Code);
        return this.httpClient.get<CommonEntity>(this.str + '/Specialization/getSpecializationByName?name=' + specialization +
            '&code=' + Code, this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Save(saveEntityObj: SpecializationEntity): Observable<Insertstatus> {
        //   saveEntityObj.tlCode = null;
        console.log(this.str + '/Specialization');
        console.log(saveEntityObj);
        return this.httpClient.post<Insertstatus>(this.str + '/Specialization',
            saveEntityObj, this.env.httpOptions).pipe(catchError(this.handleError));
    }


    Update(updateEntityObj: SpecializationEntity): Observable<Insertstatus> {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/Specialization', updateEntityObj
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

