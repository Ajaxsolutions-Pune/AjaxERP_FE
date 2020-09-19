import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { Colour, ColourEntity } from '../../Module/Masters/Colour.model';

@Injectable()
export class ColourService {
    str: string;
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    getColours(): Observable<ColourEntity[]> {
        return this.httpClient.get<ColourEntity[]>(this.str + '/Colour/getList'
        , this.env.httpOptions);
    }
    fillColoursDrp(): Observable<ColourEntity[]> {
        return this.httpClient.get<ColourEntity[]>(this.str + '/Colour/getList?status=1'
        , this.env.httpOptions);
    }
    getColour(qaTypeCode: string): Observable<ColourEntity> {
        return this.httpClient.get<ColourEntity>(this.str + '/Colour/' + qaTypeCode
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Save(saveEntityObj: ColourEntity): Observable<Insertstatus> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.httpClient.post<Insertstatus>(this.str + '/Colour', saveEntityObj
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Update(updateEntityObj: ColourEntity): Observable<Insertstatus> {
        return this.httpClient.post<Insertstatus>(this.str + '/Colour', updateEntityObj
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
