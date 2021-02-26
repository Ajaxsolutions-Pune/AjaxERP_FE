import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { CommonEntity } from "../../Module/common.model";
import { environment } from "../../Module/environment";
import { GradeSet, GradeSetEntity } from "../../Module/HRMS/GradeSet.model";
import { Insertstatus } from "../../Module/Masters/Insert_status.model";
import { DialogService } from "../MatServices/Dialog.service";

@Injectable()
export class GradeSetService {
    str: string;
    gradesets: GradeSet[];
    env = environment;
    constructor(private httpClient: HttpClient, public dialogService: DialogService) {
        this.str = this.env.apiServiceIPPort;
    }
    getgradesets(): Observable<GradeSetEntity[]> {
        return this.httpClient.get<GradeSetEntity[]>(this.str + '/GradeSet/getList', this.env.httpOptions);
    }

    fillDrpgradesets(): Observable<GradeSetEntity[]> {
        return this.httpClient.get<GradeSetEntity[]>(this.str + '/GradeSet/getList?status=1', this.env.httpOptions);

    }
    getGradeSet(GradeSetCode: string): Observable<GradeSetEntity> {
        console.log(this.str + '/GradeSet/' + GradeSetCode);
        return this.httpClient.get<GradeSetEntity>(this.str + '/GradeSet/' + GradeSetCode,
            this.env.httpOptions).pipe(catchError(this.handleError));
    }
    checkGradeSet(gradeset: string, Code: string): Observable<CommonEntity> {
        return this.httpClient.get<CommonEntity>(this.str + '/GradeSet/getGradeSetByName?name=' + gradeset +
            '&code=' + Code, this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Save(saveEntityObj: GradeSetEntity): Observable<Insertstatus> {
        //   saveEntityObj.tlCode = null;
        return this.httpClient.post<Insertstatus>(this.str + '/GradeSet',
            saveEntityObj, this.env.httpOptions).pipe(catchError(this.handleError));
    }


    Update(updateEntityObj: GradeSetEntity): Observable<Insertstatus> {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/GradeSet', updateEntityObj
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

