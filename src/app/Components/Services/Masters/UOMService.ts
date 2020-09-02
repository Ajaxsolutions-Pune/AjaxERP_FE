import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { UOM } from '../../Module/Masters/UOM.model';

@Injectable()
export class UOMService {
    str: string;
    Units: UOM[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
        this.Units = [];
    }
    ListUnits: UOM[];
    // getUnits(): UOM[] {
    //     return this.Units;
    // }

    getUnit(UnitsId: string): Observable<UOM> {

        const headers_object = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
        const httpOptions = {
            headers: headers_object
        };

        return this.httpClient.get<UOM>(this.str + 'Uom/' + UnitsId,
         this.env.httpOptions).pipe(catchError(this.handleError));
    }

    getUnits(): Observable<UOM[]> {
        console.log('hii');
        return this.httpClient.get<UOM[]>(this.str + '/Uom/getList', this.env.httpOptions);
    }
    getRole(): void {
    }
    Save(Unit: UOM): Observable<UOM> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.httpClient.post<UOM>(this.str + '/Uom',
            Unit, this.env.httpOptions).pipe(catchError(this.handleError));

    }

    Update(Unit: UOM): string {
        const Index = this.Units.findIndex(a => a.uomCode === Unit.uomCode);
        console.log(Index);
        this.Units[Index] = Unit;
        console.log(this.Units[Index]);
        return '';
    }

    // UserList(): Observable<LogIn[]> {
    // tslint:disable-next-line:max-line-length
    //    return this.httpClient.get<LogIn[]>(this.str + '/Master/getUser?UserNo=0&BranchNo=1').pipe(catchError(this.handleError));
    // }
    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
