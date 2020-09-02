import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Country } from '../../Module/Masters/Country.model';
import { Brand } from '../../Module/Masters/Brand.model';
import { City } from '../../Module/City';
import { District } from '../../Module/Masters/District';
import { TaxCategory } from '../../Module/Masters/TaxCategory';
import { CastCategory } from '../../Module/Masters/CastCategory';
import { Cast } from '../../Module/Masters/Cast';

@Injectable()
export class CastService {
    str: string;
    Casts: Cast[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
        this.Casts = [{
            Id: 1,
            Cast_Code: '101',
            Cast_Description_ENG: 'AAA',
            Cast_Description_UNI: 'RRR',
            CastCategory: '',
            IsActive: true,
        },
        {
            Id: 1,
            Cast_Code: '102',
            Cast_Description_ENG: 'AAA1',
            Cast_Description_UNI: 'RRR1',
            CastCategory: '',
            IsActive: true,

        },
        ];
    }
    ListCast: Cast[];
    getCasts(): Cast[] {
        return this.Casts;
    }

    getCast(Cast_Code: number): Cast[] {
        this.ListCast = this.Casts.filter(Casts => Casts.Cast_Code.toString().indexOf(Cast_Code.toString()) !== -1);
        return this.Casts;
    }
    getMaxCastId(): number {
        return this.Casts.length;
    }
    Save(cast: Cast): Cast {
        this.Casts.push(cast);
        return cast;

    }

    Update(cast: Cast): string {
        const Index = this.Casts.findIndex(a => a.Cast_Code === cast.Cast_Code);
        this.Casts[Index] = cast;
        return '';
    }
    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
