import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { CommonEntity } from "../../Module/common.model";
import { environment } from "../../Module/environment";
import { Insertstatus } from "../../Module/Masters/Insert_status.model";
import { DialogService } from "../MatServices/Dialog.service";
import { JobEntity, Job } from '../../Module/HRMS/Job.model';

@Injectable()
export class JobService {
    str: string;
    jobs: Job[];
    env = environment;
    constructor(private httpClient: HttpClient, public dialogService: DialogService) {
        this.str = this.env.apiServiceIPPort;
    }
    getjobs(): Observable<JobEntity[]> {
        return this.httpClient.get<JobEntity[]>(this.str + '/Job/getList', this.env.httpOptions);
    }

    fillDrpjobs(): Observable<JobEntity[]> {
        return this.httpClient.get<JobEntity[]>(this.str + '/Job/getList?status=1', this.env.httpOptions);

    }
    getJob(jobCode: string): Observable<JobEntity> {
        console.log(this.str + '/Job/' + jobCode);
        return this.httpClient.get<JobEntity>(this.str + '/Job/' + jobCode,
            this.env.httpOptions).pipe(catchError(this.handleError));
    }
    checkJob(job: string, Code: string): Observable<CommonEntity> {
        return this.httpClient.get<CommonEntity>(this.str + '/Job/getJobByName?name=' + job +
            '&code=' + Code, this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Save(saveEntityObj: JobEntity): Observable<Insertstatus> {
        //   saveEntityObj.tlCode = null;
        console.log(this.str + '/Job');
        console.log(saveEntityObj);
        return this.httpClient.post<Insertstatus>(this.str + '/Job',
            saveEntityObj, this.env.httpOptions).pipe(catchError(this.handleError));
    }


    Update(updateEntityObj: JobEntity): Observable<Insertstatus> {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/Job', updateEntityObj
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

