import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { Asset, AssetEntity } from '../../Module/Masters/Asset.model';
import { CommonEntity } from '../../Module/common.model';

@Injectable()
export class AssetService {
    str: string;
    qaType: Asset[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    getAssets(): Observable<AssetEntity[]> {
        return this.httpClient.get<AssetEntity[]>(this.str + '/Asset/getList'
            , this.env.httpOptions);
    }

    getAsset(qaTypeCode: string): Observable<AssetEntity> {
        return this.httpClient.get<AssetEntity>(this.str + '/Asset/' + qaTypeCode
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    fillDrpAssets(): Observable<AssetEntity[]> {
        return this.httpClient.get<AssetEntity[]>(this.str + '/Asset/getList?status=1', this.env.httpOptions);
    }

    fillDrpAssetsByAssetGruopCode(sssetGruopCode: string): Observable<AssetEntity[]> {
        return this.httpClient.get<AssetEntity[]>(this.str +
            '/Asset/getList?status=1&assetGroupCode=' + sssetGruopCode, this.env.httpOptions);
    }

    checkAsset(asset: string, code: string): Observable<CommonEntity> {
        return this.httpClient.get<CommonEntity>(this.str + '/Asset/getAssetByName?name=' + asset +
            '&code=' + code
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Save(saveEntityObj: AssetEntity): Observable<Insertstatus> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.httpClient.post<Insertstatus>(this.str + '/Asset', saveEntityObj
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Update(updateEntityObj: AssetEntity): Observable<Insertstatus> {
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
