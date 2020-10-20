import { Injectable, Component } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { dashboard} from '../../Module/Masters/Dashboard.model';
import { DialogService } from '../MatServices/Dialog.service';

@Injectable()
export class DashboardService {

    str: string;
    dashboardObj: dashboard;

    env = environment;  

    constructor(
        private httpClient: HttpClient, 
        public dialogService: DialogService) 
    {
        this.str = this.env.apiServiceIPPort;  
    }      


    getDashboardData(): Observable<dashboard> {
        return this.httpClient.get<dashboard>(this.str + '/Dashboard/getList/Sumit', this.env.httpOptions);
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
