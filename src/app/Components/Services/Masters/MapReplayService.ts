import { Injectable, Component } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { mapReplayModel} from '../../Module/Masters/Map.Replay.model';
import { DialogService } from '../MatServices/Dialog.service';

@Injectable()
export class MapReplayService {

    str: string;
    mapReplayModelObj: mapReplayModel;

    env = environment;  

    constructor(
        private httpClient: HttpClient, 
        public dialogService: DialogService) 
    {
        this.str = this.env.apiServiceIPPort;  
    }      


    getMapReplayData(LoginId:String, Start_Date:String, End_Date:String): Observable<mapReplayModel> {
        return this.httpClient.get<mapReplayModel>(this.str + '/MapReplay/getList/'+LoginId+'/'+Start_Date+'/'+End_Date+'', this.env.httpOptions);
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
