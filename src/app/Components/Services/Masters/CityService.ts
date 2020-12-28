import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { District } from '../../Module/Masters/District';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { catchError } from 'rxjs/operators';
import { DistrictEntity } from '../../Module/Masters/District.Entity.model';
import { City, CityEntity } from '../../Module/City';
import { CommonEntity } from '../../Module/common.model';

@Injectable()
export class CityService {
    str: string;
    Citys: City[];
    env = environment;
    Listcity: City[];
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    ListCity: City[];
    getCitys(): Observable<CityEntity[]> {
        return this.httpClient.get<CityEntity[]>(this.str + '/City/getList',
         this.env.httpOptions);
    }

    getCity(cityCode: string): Observable<CityEntity> {
        return this.httpClient.get<CityEntity>(this.str + '/City/' + cityCode
        , this.env.httpOptions);

    }
    getMaxDistrictId(): number {
        return this.Citys.length;
    }
    Save(saveEntitycity: CityEntity): Observable<Insertstatus> {
        //   saveEntityObj.tlCode = null;
        return this.httpClient.post<Insertstatus>(this.str + '/City',
        saveEntitycity, this.env.httpOptions).pipe(catchError(this.handleError));
    }
    checkCity(city : string,Code : string): Observable<CommonEntity> {
        console.log(this.str + '/City/getCityByName?name=' + city +
        '&id=' + Code);
        return this.httpClient.get<CommonEntity>(this.str + '/City/getCityByName?name=' +
        city + '&id=' + Code, this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Update(updateEntitydistrict: CityEntity): Observable<Insertstatus> {
        //   saveEntityObj.tlCode = null;
        console.log(updateEntitydistrict);
        return this.httpClient.post<Insertstatus>(this.str + '/City',
        updateEntitydistrict, this.env.httpOptions).pipe(catchError(this.handleError));
        
    }
    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}