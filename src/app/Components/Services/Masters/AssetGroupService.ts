import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { AssetGroup, AssetGroupEntity } from '../../Module/Masters/AssetGroup.model';

@Injectable()
export class AssetGroupService {
    str: string;
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    getAssetGroups(): Observable<AssetGroupEntity[]> {
        return this.httpClient.get<AssetGroupEntity[]>(this.str
             + '/AssetGroup/getList', this.env.httpOptions);
    }
    fillAssetGroupDrp(): Observable<AssetGroupEntity[]> {
        return this.httpClient.get<AssetGroupEntity[]>(this.str + '/AssetGroup/getList?status=1'
        , this.env.httpOptions);
    }

    getAssetGroup(qaTypeCode: string): Observable<AssetGroupEntity> {
        return this.httpClient.get<AssetGroupEntity>(this.str + '/AssetGroup/' + qaTypeCode
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Save(saveEntityObj: AssetGroupEntity): Observable<Insertstatus> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.httpClient.post<Insertstatus>(this.str + '/AssetGroup', saveEntityObj
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Update(updateEntityObj: AssetGroupEntity): Observable<Insertstatus> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/AssetGroup', updateEntityObj
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
