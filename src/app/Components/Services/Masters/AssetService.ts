import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { Asset, AssetEntity } from '../../Module/Masters/Asset.model';

@Injectable()
export class AssetService {
    str: string;
    qaType: Asset[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    getAssets(): Observable<AssetEntity[]> {
        console.log(this.str + '/Asset/getList');
        return this.httpClient.get<AssetEntity[]>(this.str + '/Asset/getList'
        , this.env.httpOptions);
    }

    getAsset(qaTypeCode: string): Observable<AssetEntity> {
        return this.httpClient.get<AssetEntity>(this.str + '/Asset/' + qaTypeCode
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Save(saveEntityObj: AssetEntity): Observable<Insertstatus> {
        console.log('service');
        console.log(AssetEntity);
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.httpClient.post<Insertstatus>(this.str + '/Asset', saveEntityObj
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Update(updateEntityObj: AssetEntity): Observable<Insertstatus> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/Asset', updateEntityObj
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
