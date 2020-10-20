import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { Circle, CircleEntity } from '../../Module/Masters/Circle.model';
import { CommonEntity } from '../../Module/common.model';

@Injectable()
export class CircleService {
    str: string;
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    fillCircleDrp(): Observable<CircleEntity[]> {
        return this.httpClient.get<CircleEntity[]>(this.str + '/Circle/getList'
            , this.env.httpOptions);
    }

    getCircles(): Observable<CircleEntity[]> {
        return this.httpClient.get<CircleEntity[]>(this.str + '/Circle/getList'
            , this.env.httpOptions);
    }

    getCircle(qaTypeCode: string): Observable<CircleEntity> {
        return this.httpClient.get<CircleEntity>(this.str + '/Circle/' + qaTypeCode
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Save(saveEntityObj: CircleEntity): Observable<CircleEntity> {
        return this.httpClient.post<CircleEntity>(this.str + '/Circle', saveEntityObj
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Update(updateEntityObj: CircleEntity): Observable<CircleEntity> {
        return this.httpClient.post<CircleEntity>(this.str + '/Circle', updateEntityObj
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }
    checkCircle(circle: string, Code: string): Observable<CommonEntity> {
        console.log(this.str
            + '/Circle/getCircleByName?name=' + circle + '&code=' + Code);
        return this.httpClient.get<CommonEntity>(this.str
            + '/Circle/getCircleByName?name=' + circle + '&code=' + Code
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
