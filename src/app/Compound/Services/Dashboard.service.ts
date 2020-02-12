import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../Module/environment';
import { DashboardProd } from '../Module/DashboardProd.model';
// import { DashboardProdCount } from '../Module/DashboardProdCount.model';

@Injectable()
export class DashboardService {
    str: string;
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    getDashBoard(BranchNo: string, Date1: string, machineId: string, DrawCode: string): Observable<DashboardProd[]> {
        // tslint:disable-next-line:max-line-length
        console.log(this.str + '/Production/GetDashBoardProdStatus?BranchNo=' + BranchNo + '&Date=' + Date1 + '&machineno=' + machineId + '&DrawC=' + DrawCode);
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<DashboardProd[]>(this.str + '/Production/GetDashBoardProdStatus?BranchNo=' + BranchNo + '&Date=' + Date1 + '&machineno=' + machineId + '&DrawC=' + DrawCode).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
