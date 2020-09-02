import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Country, CountryEntity } from '../../Module/Masters/Country.model';
import { CountryTransfarmer } from '../../Transformer/Masters/Country-Transfarmer';

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
        console.log(this.str + 'Country/' + countrysId);
        return this.httpClient.get<CountryEntity>(this.str + 'Country/'
            + countrysId, this.env.httpOptions).pipe(catchError(this.handleError));
    }

    getRole(): void {
    }
    Save(country: Country): Observable<CountryEntity> {
        this.countryEntity = this.countryTransfarmer.CountryTransfarmer(country);
        this.countryEntity.countryCode = null;
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.httpClient.post<CountryEntity>(this.str + '/Country',
            this.countryEntity, this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Update(country: Country): string {
        const Index = this.countrys.findIndex(a => a.id === country.id);
        this.countrys[Index] = country;
        return '';
    }
    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError(errorResponse.error.message);
    }
}
