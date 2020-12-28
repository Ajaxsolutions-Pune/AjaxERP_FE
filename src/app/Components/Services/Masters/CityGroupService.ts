import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { CommonEntity } from '../../Module/common.model';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { CityGroup, CityGroupEntity } from '../../Module/Masters/CityGroup';
import { CityGroupTransfarmer } from '../../Transformer/Masters/CityGroup-Transfarmer';

@Injectable()
export class CityGroupService {
    str: string;
    cityGroups: CityGroup[];
    cityGroupEntity: CityGroupEntity;
    env = environment;
    constructor(private httpClient: HttpClient,
        private cityGroupTransfarmer: CityGroupTransfarmer) {
        this.str = this.env.apiServiceIPPort;
        this.cityGroups = [];
    }
    ListCityGroup: CityGroupEntity[];
    getCityGroups(): Observable<CityGroupEntity[]> {
        return this.httpClient.get<CityGroupEntity[]>(this.str + '/CityGroup/getList', this.env.httpOptions);
    }

    getCityGroup(cityGroupsId: string): Observable<CityGroupEntity> {
        console.log(this.str + '/CityGroup/'+ cityGroupsId);
                return this.httpClient.get<CityGroupEntity>(this.str + '/CityGroup/'
            + cityGroupsId, this.env.httpOptions).pipe(catchError(this.handleError));
    }

    getRole(): void {
    }
    Save(saveEntitycityGroup: CityGroupEntity): Observable<Insertstatus> {
        console.log(saveEntitycityGroup);
        return this.httpClient.post<Insertstatus>(this.str + '/CityGroup',
        saveEntitycityGroup, this.env.httpOptions).pipe(catchError(this.handleError));
    }

    checkCityGroup(citygroup : string,Code : string): Observable<CommonEntity> {
        console.log(this.str + '/CityGroup/getCityGroupByName?name=' + citygroup +
        '&id=' + Code);
        return this.httpClient.get<CommonEntity>(this.str + '/CityGroup/getCityGroupByName?name=' +
        citygroup +'&id=' + Code, this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Update(updateEntitycityGroup: CityGroupEntity): Observable<Insertstatus> {
        console.log(updateEntitycityGroup);
        //   saveEntityObj.tlCode = null;
        return this.httpClient.post<Insertstatus>(this.str + '/CityGroup',
        updateEntitycityGroup, this.env.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError(errorResponse.error.message);
    }
}
