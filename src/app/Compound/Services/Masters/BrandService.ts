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
    brand: Brand;
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
        this.brands = [];
    }
    ListUnits: Brand[];

    getBrands(): Observable<Brand[]> {
        console.log(this.str + 'Brand/getList');
        return this.httpClient.get<Brand[]>(this.str + 'Brand/getList', this.env.httpOptions);
    }

    getBrand(BrandCode: String): Observable<Brand[]> {
        return this.httpClient.get<Brand[]>(this.str + 'Brand/getUser?UserNo=' +
            BrandCode, this.env.httpOptions);
    }

    Save(Brand1: Brand): Observable<Brand> {
        if (Brand1.brandCode === null) {
            const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
            return this.httpClient.post<Brand>(this.str + 'Brand',
                Brand1, this.env.httpOptions).pipe(catchError(this.handleError));
        }

    }

    Update(Brand1: Brand): string {
        const Index = this.brands.findIndex(a => a.brandCode === Brand1.brandCode);
        console.log(Index);
        this.brands[Index] = Brand1;
        console.log(this.brands[Index]);
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
        return throwError(errorResponse.error);
    }
}

