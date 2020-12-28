import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Country, CountryEntity } from '../../Module/Masters/Country.model';
import { CountryTransfarmer } from '../../Transformer/Masters/Country-Transfarmer';
import { CommonEntity } from '../../Module/common.model';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';

@Injectable()
export class CountryService {
    str: string;
    countrys: Country[];
    countryEntity: CountryEntity;
    env = environment;
    constructor(private httpClient: HttpClient,
        private countryTransfarmer: CountryTransfarmer) {
        this.str = this.env.apiServiceIPPort;
        this.countrys = [];
    }
    ListCountry: CountryEntity[];
    getCountrys(): Observable<CountryEntity[]> {
        return this.httpClient.get<CountryEntity[]>(this.str + '/Country/getList', this.env.httpOptions);
    }

    getCountry(countrysId: string): Observable<CountryEntity> {
        console.log(this.str + '/Country/'+ countrysId);
                return this.httpClient.get<CountryEntity>(this.str + '/Country/'
            + countrysId, this.env.httpOptions).pipe(catchError(this.handleError));
    }

    getRole(): void {
    }
    Save(saveEntitycountry: CountryEntity): Observable<Insertstatus> {
        console.log(saveEntitycountry);
        return this.httpClient.post<Insertstatus>(this.str + '/Country',
            saveEntitycountry, this.env.httpOptions).pipe(catchError(this.handleError));
    }
    checkCountry(country : string,Code : string): Observable<CommonEntity> {
        return this.httpClient.get<CommonEntity>(this.str + '/Country/getCountryByName?name=' +
        country +'&id=' + Code, this.env.httpOptions).pipe(catchError(this.handleError));
    }
    
    Update(updateEntitycountry: CountryEntity): Observable<Insertstatus> {
        console.log(updateEntitycountry);
        //   saveEntityObj.tlCode = null;
        return this.httpClient.post<Insertstatus>(this.str + '/Country',
        updateEntitycountry, this.env.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError(errorResponse.error.message);
    }
}
