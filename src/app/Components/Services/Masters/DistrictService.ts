import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { District } from '../../Module/Masters/District';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { catchError } from 'rxjs/operators';
import { DistrictEntity } from '../../Module/Masters/District.Entity.model';

@Injectable()
export class DistrictService {
    str: string;
    Districts: District[];
    env = environment;
    Listdistrict: District[];
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    ListDistrict: District[];
    getDistricts(): Observable<DistrictEntity[]> {
        return this.httpClient.get<DistrictEntity[]>(this.str + '/District/getList',
         this.env.httpOptions);
    }

    getDistrict(DistrictCode: string): Observable<DistrictEntity> {
        return this.httpClient.get<DistrictEntity>(this.str + '/District/' + DistrictCode
        , this.env.httpOptions);

    }
    getMaxDistrictId(): number {
        return this.Districts.length;
    }
    Save(saveEntitydistrict: DistrictEntity): Observable<Insertstatus> {
        //   saveEntityObj.tlCode = null;
        console.log(saveEntitydistrict);
        return this.httpClient.post<Insertstatus>(this.str + '/District',
            saveEntitydistrict, this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Update(updateEntitydistrict: DistrictEntity): Observable<Insertstatus> {
        //   saveEntityObj.tlCode = null;
        console.log(updateEntitydistrict);
        return this.httpClient.post<Insertstatus>(this.str + '/District',
        updateEntitydistrict, this.env.httpOptions).pipe(catchError(this.handleError));
        
    }
    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
