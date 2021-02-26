import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { CommonEntity } from "../../Module/common.model";
import { environment } from "../../Module/environment";
import { Grade, GradeEntity } from "../../Module/HRMS/Grade.model";
// import { GradeSetEntity } from "../../Module/HRMS/GradeSet.model";
import { Insertstatus } from "../../Module/Masters/Insert_status.model";
import { DialogService } from "../MatServices/Dialog.service";

@Injectable()
export class GradeService {
    str: string;
    grades: Grade[];
    env = environment;
    constructor(private httpClient: HttpClient, public dialogService: DialogService) {
        this.str = this.env.apiServiceIPPort;
    }
    getgrades(): Observable<GradeEntity[]> {
        return this.httpClient.get<GradeEntity[]>(this.str + '/Grade/getList', this.env.httpOptions);
    }

    fillDrpgrades(): Observable<GradeEntity[]> {
        return this.httpClient.get<GradeEntity[]>(this.str + '/Grade/getList?status=1', this.env.httpOptions);
        
    }
    getGrade(gradeCode: string): Observable<GradeEntity> {
        console.log(this.str + '/Grade/' + gradeCode);
        return this.httpClient.get<GradeEntity>(this.str + '/Grade/' + gradeCode,
            this.env.httpOptions).pipe(catchError(this.handleError));
    }
    checkGrade(grade : string,Code : string): Observable<CommonEntity> {
        return this.httpClient.get<CommonEntity>(this.str + '/Grade/getGradeByName?name=' + grade +
        '&code=' + Code, this.env.httpOptions).pipe(catchError(this.handleError));
    }
   
    Save(saveEntityObj: GradeEntity): Observable<Insertstatus> {
     //   saveEntityObj.tlCode = null;
     console.log(this.str + '/Grade');
     console.log(saveEntityObj);
        return this.httpClient.post<Insertstatus>(this.str + '/Grade',
            saveEntityObj, this.env.httpOptions).pipe(catchError(this.handleError));
    }

    
    Update(updateEntityObj: GradeEntity): Observable<Insertstatus> {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/Grade', updateEntityObj
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

