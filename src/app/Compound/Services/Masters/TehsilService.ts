import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Tehsil } from '../../Module/Masters/Tehsil';

@Injectable()
export class TehsilService {

    str: string;
    Tehsils: Tehsil[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
        this.Tehsils = [{
            Id: 1,
            districtCode: '10',
            TehsilName_ENG: 'ABC',
            TehsilName_UNI: 'PQR',
            Tehsil_Code: 'abc',
            IsActive: true,
        },
        {
            Id: 2,
            districtCode: '11',
            TehsilName_ENG: 'ABC1',
            TehsilName_UNI: 'PQR1',
            Tehsil_Code: 'abc',
            IsActive: true,
        },
        ];
    }
    ListTehsil: Tehsil[];
    getTehsils(): Tehsil[] {
        return this.Tehsils;
    }

    getTehsil(Tehsil_Code: number): Tehsil[] {
        this.ListTehsil = this.Tehsils.filter(Tehsils => Tehsils.Tehsil_Code.toString().indexOf(Tehsil_Code.toString()) !== -1);
        return this.Tehsils;
    }
    getMaxTehsilId(): number {
        return this.Tehsils.length;
    }
    Save(tehsil: Tehsil): Tehsil {
        this.Tehsils.push(tehsil);
        return tehsil;

    }

    Update(tehsil: Tehsil): string {
        const Index = this.Tehsils.findIndex(a => a.Tehsil_Code === tehsil.Tehsil_Code);
        this.Tehsils[Index] = tehsil;
        return '';
    }
    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
