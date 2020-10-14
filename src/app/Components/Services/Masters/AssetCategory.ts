import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { AssetCategory, AssetCategoryEntity } from '../../Module/Masters/AssetCategory.model';
import { CommonEntity } from '../../Module/common.model';

@Injectable()
export class AssetCategoryService {
    str: string;
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    getAssetCategorys(): Observable<AssetCategoryEntity[]> {
        return this.httpClient.get<AssetCategoryEntity[]>(this.str
            + '/AssetCategory/getList', this.env.httpOptions);
    }

    getAssetCategorysByGroupId(assetGroupCode: string): Observable<AssetCategoryEntity[]> {
        return this.httpClient.get<AssetCategoryEntity[]>(this.str
            + '/AssetCategory/getList?assetGroupCode=' + assetGroupCode, this.env.httpOptions);
    }

    checkAssetCategory(assetCat : string,code : string): Observable<CommonEntity> {
        return this.httpClient.get<CommonEntity>(this.str + '/AssetCategory/getAssetCategoryByName?name=' + assetCat +
        '&code=' + code
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }

  

    getAssetCategory(qaTypeCode: string): Observable<AssetCategoryEntity> {
        return this.httpClient.get<AssetCategoryEntity>(this.str
            + '/AssetCategory/' + qaTypeCode, this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Save(saveEntityObj: AssetCategoryEntity): Observable<Insertstatus> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.httpClient.post<Insertstatus>(this.str
            + '/AssetCategory', saveEntityObj, this.env.httpOptions
        ).pipe(catchError(this.handleError));
    }

    Update(updateEntityObj: AssetCategoryEntity): Observable<Insertstatus> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/AssetCategory',
            updateEntityObj, this.env.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
