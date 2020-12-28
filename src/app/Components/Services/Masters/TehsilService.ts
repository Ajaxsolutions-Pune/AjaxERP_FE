import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Tehsil, TehsilEntity } from '../../Module/Masters/Tehsil';
import { District } from '../../Module/Masters/District';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { CommonEntity } from '../../Module/common.model';

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
    getTehsils(): Observable<TehsilEntity[]> {
        console.log(this.str + '/Tehsil/getList');
        return this.httpClient.get<TehsilEntity[]>(this.str + '/Tehsil/getList'
        , this.env.httpOptions);
    }

    getTehsil(TehsilCode: string): Observable<TehsilEntity> {
        return this.httpClient.get<TehsilEntity>(this.str + 'Tehsil/' + TehsilCode
        , this.env.httpOptions);

    }
    getMaxTehsilId(): number {
        return this.tehsils.length;
    }
    Save(saveEntitytehsil: TehsilEntity): Observable<Insertstatus> {
        //   saveEntityObj.tlCode = null;
        console.log(saveEntitytehsil);
        return this.httpClient.post<Insertstatus>(this.str + '/Tehsil',
        saveEntitytehsil, this.env.httpOptions).pipe(catchError(this.handleError));
    }
    checkTehsil(tehsil : string,Code : string): Observable<CommonEntity> {
        console.log(this.str + '/Tehsil/getTehsilByName?name=' + tehsil +
        '&id=' + Code);
        return this.httpClient.get<CommonEntity>(this.str + '/Tehsil/getTehsilByName?name=' +
        tehsil +'&id=' + Code, this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Update(updateEntitytehsil: TehsilEntity): Observable<Insertstatus> {
        //   saveEntityObj.tlCode = null;
        console.log(updateEntitytehsil);
        return this.httpClient.post<Insertstatus>(this.str + '/Tehsil',
        updateEntitytehsil, this.env.httpOptions).pipe(catchError(this.handleError));
        
    }
    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}