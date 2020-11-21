import { Injectable, Component } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { mapModel} from '../../Module/Masters/Map.model';
import { DialogService } from '../MatServices/Dialog.service';

@Injectable()
export class MapService {

    str: string;
    mapModelObj: mapModel;

    env = environment;  

    constructor(
        private httpClient: HttpClient, 
        public dialogService: DialogService) 
    {
        this.str = this.env.apiServiceIPPort;  
    }      


    getMapData(): Observable<mapModel> {
        return this.httpClient.get<mapModel>(this.str + '/Map/getList/Sumit', this.env.httpOptions);
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
