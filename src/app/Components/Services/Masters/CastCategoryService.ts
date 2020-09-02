import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { TaxCategory } from '../../Module/Masters/TaxCategory';
import { CastCategory } from '../../Module/Masters/CastCategory';

@Injectable()
export class CastCategoryService {
    str: string;
    CastCategorys: CastCategory[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
        this.CastCategorys = [{
            Id: 1,
            CastCategory_Code: 'abc1',
            CastCategory_Description_ENG: 'abc1',
            CastCategory_Description_UNI: 'abc3',
            IsActive: true,
        }, {
            Id: 1,
            CastCategory_Code: 'abc2',
            CastCategory_Description_ENG: 'abc2',
            CastCategory_Description_UNI: 'abc3',
            IsActive: true,
        },
        ];
    }
    ListCastCategory: CastCategory[];
    getCastCategorys(): CastCategory[] {
        return this.CastCategorys;
    }

    getCastCategory(CastCategory_Code: number): CastCategory[] {
        this.ListCastCategory =
            this.CastCategorys.filter(CastCategorys =>
                CastCategorys.CastCategory_Code.toString()
                    .indexOf(CastCategory_Code.toString()) !== -1);
        return this.CastCategorys;
    }
    getMaxTaxCategoryId(): number {
        return this.CastCategorys.length;
    }
    Save(castcategory: CastCategory): CastCategory {
        this.CastCategorys.push(castcategory);
        return castcategory;

    }

    Update(castcategory: CastCategory): string {
        const Index = this.CastCategorys.findIndex(a => a.CastCategory_Code === castcategory.CastCategory_Code);
        this.CastCategorys[Index] = castcategory;
        return '';
    }
    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
