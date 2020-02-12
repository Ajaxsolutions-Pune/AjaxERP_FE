import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Country } from '../../Module/Masters/Country.model';
import { Brand } from '../../Module/Masters/Brand.model';

@Injectable()
export class BrandService {
    str: string;
    brands: Brand[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
        this.brands = [{
            Brand_Id: 1,
            Brand_Code: 'Brand_1',
            Brand_Name_ENg: 'Meswak',
            Brand_Name_Uni: 'मिस्वाक',
            CreatedBy: 'SUPERADMIN',
            ModifiedBy: 'SUPERADMIN',
            CreDate: '08-03-2019',
            ModDate: null,
            IsActive: true
        }, {
            Brand_Id: 2,
            Brand_Code: 'Brand_2',
            Brand_Name_ENg: 'Colgate',
            Brand_Name_Uni: 'कोलगेट',
            CreatedBy: 'SUPERADMIN',
            ModifiedBy: 'SUPERADMIN',
            CreDate: '08-03-2019',
            ModDate: null,
            IsActive: true
        },
        ];
    }
    ListBrand: Brand[];
    getBrands(): Brand[] {
        return this.brands;
    }

    getBrand(BrandId: number): Brand[] {
        this.ListBrand = this.brands.filter(brands => brands.Brand_Id.toString().indexOf(BrandId.toString()) !== -1);
        return this.brands;
    }
    getMaxBrandId(): number {
        return this.brands.length;
    }

    getRole(): void {
    }
    Save(brand: Brand): Brand {
        this.brands.push(brand);
        return brand;

    }

    Update(brand: Brand): string {
        const Index = this.brands.findIndex(a => a.Brand_Id === brand.Brand_Id);
        this.brands[Index] = brand;
        return '';
    }
    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
