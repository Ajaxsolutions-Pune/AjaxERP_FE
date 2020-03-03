import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Brand } from '../../Module/Masters/Brand.model';

@Injectable()
export class BrandService {
    str: string;
    brands: Brand[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
        this.brands = [{
            brandCode: 'Brand_1',
            brandDesc: 'Brand_1',
            brandDescUni: 'कोलगेट',
            IsActive: 1
        }, {
            brandCode: 'Brand_1',
            brandDesc: 'Brand_1',
            brandDescUni: 'कोलगेट',
            IsActive: 1
        },
        ];
    }
    ListBrand: Brand[];
    getBrands(): Observable<Brand[]> {
        return this.httpClient.get<Brand[]>(this.str + '/Brand/getList');
    }

    getBrand(brandCode: string): Brand[] {
        this.ListBrand = this.brands.filter(brands => brands.brandCode.toString().indexOf(brandCode.toString()) !== -1);
        return this.brands;
    }
    getMaxBrandId(): number {
        return this.brands.length;
    }

    getRole(): void {
    }
    Save(brand: Brand): Observable<Brand> {
        console.log(brand.brandCode);
        if (brand.brandCode === null) {
            const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
            return this.httpClient.post<Brand>(this.str + '/Brand',
                brand, httpOptions).pipe(catchError(this.handleError));
        }
    }

    Update(brand: Brand): string {
        const Index = this.brands.findIndex(a => a.brandCode === brand.brandCode);
        this.brands[Index] = brand;
        return '';
    }
    private handleError(errorResponse: HttpErrorResponse) {
        console.error('client side error', errorResponse.error.message);
        return throwError('d');
    }
}
