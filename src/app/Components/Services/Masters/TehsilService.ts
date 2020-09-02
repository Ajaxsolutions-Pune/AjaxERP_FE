import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Tehsil, TehsilEntity } from '../../Module/Masters/Tehsil';
import { District } from '../../Module/Masters/District';

@Injectable()
export class TehsilService {
    str: string;
    tehsils: Tehsil[];
    env = environment;
    listTehsil: Tehsil[];
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    ListDistrict: Tehsil[];
    getTehsils(): Observable<Tehsil[]> {
        console.log('ji');
        return this.httpClient.get<Tehsil[]>(this.str + '/Tehsil/getList'
        , this.env.httpOptions);
    }

    getDistricts(): Observable<District[]> {
        return this.httpClient.get<District[]>(this.str + '/District/getList'
        , this.env.httpOptions);
    }

    getTehsil(TehsilCode: number): Observable<TehsilEntity> {
        console.log(this.str + 'Tehsil/' + TehsilCode);
        return this.httpClient.get<TehsilEntity>(this.str + 'Tehsil/' + TehsilCode
        , this.env.httpOptions);

    }
    getMaxTehsilId(): number {
        return this.tehsils.length;
    }
    Save(tehsil: Tehsil): Tehsil {
        this.tehsils.push(tehsil);
        return tehsil;

    }
    Update(tehsil: Tehsil): Observable<TehsilEntity> {
        console.log(this.str + 'Tehsil/');
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.httpClient.post<TehsilEntity>(this.str + 'State', tehsil
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
