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

@Injectable()
export class TaxCategoryService {

    str: string;
    TaxCategorys: TaxCategory[];
    env = environment;
    Listtaxcategory: TaxCategory[];
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
        this.TaxCategorys = [{
            Id: 1,
            TaxCategory_Code: '111',
            TaxCategory_Description: 'GST',
            IsActive: true,

        }, {
            Id: 2,
            TaxCategory_Code: '222',
            TaxCategory_Description: 'GST',
            IsActive: true,

        },
        ];
    }
    ListTaxCategory: TaxCategory[];
    getTaxCategorys(): TaxCategory[] {
        return this.TaxCategorys;
    }

    getTaxCategory(TaxCategory_Code: number): TaxCategory[] {
        this.Listtaxcategory = this.TaxCategorys.filter(TaxCategorys =>
            TaxCategorys.TaxCategory_Code.toString().indexOf(TaxCategory_Code.toString())
            !== -1);
        return this.TaxCategorys;
    }
    getMaxTaxCategoryId(): number {
        return this.TaxCategorys.length;
    }
    Save(taxcategory: TaxCategory): TaxCategory {
        this.TaxCategorys.push(taxcategory);
        return taxcategory;

    }

    Update(taxcategory: TaxCategory): string {
        const Index = this.TaxCategorys.findIndex(a => a.TaxCategory_Code === taxcategory.TaxCategory_Code);
        this.TaxCategorys[Index] = taxcategory;
        return '';
    }
    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
