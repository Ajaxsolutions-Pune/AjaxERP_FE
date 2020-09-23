import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { DialogService } from '../MatServices/Dialog.service';
import { Hub, HubEntity } from '../../Module/Masters/Hub.model';

@Injectable()
export class HubService {
    str: string;
    hubs: Hub[];
    env = environment;
    constructor(private httpClient: HttpClient, public dialogService: DialogService) {
        this.str = this.env.apiServiceIPPort;
    }
    getHubs(): Observable<HubEntity[]> {
        return this.httpClient.get<HubEntity[]>(this.str + '/Hub/getList', this.env.httpOptions);
    }

    fillDrpHubs(): Observable<HubEntity[]> {
        return this.httpClient.get<HubEntity[]>(this.str + '/Hub/getList?status=1', this.env.httpOptions);
    }

    getHub(HubCode: string): Observable<HubEntity> {
        return this.httpClient.get<HubEntity>(this.str + '/Hub/' + HubCode,
            this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Save(saveEntityObj: HubEntity): Observable<Insertstatus> {
     //   saveEntityObj.tlCode = null;
        return this.httpClient.post<Insertstatus>(this.str + '/Hub',
            saveEntityObj, this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Update(updateEntityObj: HubEntity): Observable<Insertstatus> {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/Hub', updateEntityObj
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
        console.log(this.dialogService);
        this.dialogService.openModal('Title1', 'Message Test', () => {
            // confirmed
            console.log('Yes');
        }, () => {
            // not confirmed
            console.log('No');
        });
    }
}