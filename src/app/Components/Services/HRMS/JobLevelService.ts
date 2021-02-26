import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { CommonEntity } from "../../Module/common.model";
import { environment } from "../../Module/environment";
import { Insertstatus } from "../../Module/Masters/Insert_status.model";
import { DialogService } from "../MatServices/Dialog.service";
import { JobLevel, JobLevelEntity } from '../../Module/HRMS/JobLevel.model';

@Injectable()
export class JobLevelService {
    str: string;
    jobLevels: JobLevel[];
    env = environment;
    constructor(private httpClient: HttpClient, public dialogService: DialogService) {
        this.str = this.env.apiServiceIPPort;
    }
    getjobLevels(): Observable<JobLevelEntity[]> {
        return this.httpClient.get<JobLevelEntity[]>(this.str + '/JobLevel/getList', this.env.httpOptions);
    }

    fillDrpjobLevels(): Observable<JobLevelEntity[]> {
        return this.httpClient.get<JobLevelEntity[]>(this.str + '/JobLevel/getList?status=1', this.env.httpOptions);

    }
    getJobLevel(jobLevelCode: string): Observable<JobLevelEntity> {
        console.log(this.str + '/JobLevel/' + jobLevelCode);
        return this.httpClient.get<JobLevelEntity>(this.str + '/JobLevel/' + jobLevelCode,
            this.env.httpOptions).pipe(catchError(this.handleError));
    }
    checkJobLevel(jobLevel: string, Code: string): Observable<CommonEntity> {
        return this.httpClient.get<CommonEntity>(this.str + '/JobLevel/getJobLevelByName?name=' + jobLevel +
            '&code=' + Code, this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Save(saveEntityObj: JobLevelEntity): Observable<Insertstatus> {
        //   saveEntityObj.tlCode = null;
        console.log(this.str + '/JobLevel');
        console.log(saveEntityObj);
        return this.httpClient.post<Insertstatus>(this.str + '/JobLevel',
            saveEntityObj, this.env.httpOptions).pipe(catchError(this.handleError));
    }


    Update(updateEntityObj: JobLevelEntity): Observable<Insertstatus> {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/JobLevel', updateEntityObj
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

