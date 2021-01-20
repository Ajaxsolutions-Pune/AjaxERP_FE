import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { DeviceAssetMappingEntity,DeviceAssetMapping_Transmission_Line } from '../../Module/ProcessSetup/DeviceAssetMapping.model';
@Injectable()
export class DeviceAssetMappingService {
    str: string;
    AssetDelete : any;
    TransmissionLine_List = [];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    getDeviceAssetMappings(): Observable<DeviceAssetMappingEntity[]> {
        return this.httpClient.get<DeviceAssetMappingEntity[]>(this.str +
            '/DeviceAssetMapping/getList',            
            this.env.httpOptions);
    }

    getDeviceAssetMapping(deviceId: string): Observable<DeviceAssetMappingEntity[]> {
        console.log(
            this.str + '/DeviceAssetMapping/getList?deviceId=' + deviceId)
        return this.httpClient.get<DeviceAssetMappingEntity[]>(
            this.str + '/DeviceAssetMapping/getList?deviceId=' + deviceId
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    getDeviceAssetMapping_Transmission_Line(deviceId: string, assetgroup:string): Observable<string[]> {    
        console.log( this.str + '/DeviceAssetMapping/getTransmissionLines?deviceId='
        +deviceId+'&assetGroupCode='+assetgroup
        );
        return this.httpClient.get<string[]>(
            this.str + '/DeviceAssetMapping/getTransmissionLines?deviceId='
            +deviceId+'&assetGroupCode='+assetgroup
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    getDeviceAssetMappingNew(deviceId: string,TransmissionLineCode:string,AssetGroupCode:string): Observable<DeviceAssetMappingEntity[]> {
      return this.httpClient.get<DeviceAssetMappingEntity[]>(
            this.str + '/GetDeviceAssetMapping/getList/'+deviceId+'/'+AssetGroupCode+'?transmissionLineCode='+TransmissionLineCode
            , this.env.httpOptions).pipe(catchError(this.handleError));           
    }

    //GetDeviceAssetMapping/getList/4/2?transmissionLineCode=BB

    Save(saveEntityObj: DeviceAssetMappingEntity[]): Observable<Insertstatus> {
        return this.httpClient.post<Insertstatus>(this.str + '/DeviceAssetMapping/createList', saveEntityObj
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    /*Delete(deviceId: string,TransmissionLineCode:string,AssetGroupCode:string): Observable<Insertstatus> {
        return this.httpClient.post<Insertstatus>(this.str + '/DeviceAssetMapping/createList'
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }*/

    Delete(deviceId: string, AssetDelete): Observable<Insertstatus> {
        return this.httpClient.post<Insertstatus>(this.str + '/DeviceAssetMapping/delete/'+ deviceId, AssetDelete
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Update(updateEntityObj: DeviceAssetMappingEntity): Observable<Insertstatus> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/DeviceAssetMapping', updateEntityObj
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
