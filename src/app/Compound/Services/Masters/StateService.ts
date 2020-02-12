import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Country } from '../../Module/Masters/Country.model';
import { Brand } from '../../Module/Masters/Brand.model';
import { State } from '../../Module/Masters/State.model';

@Injectable()
export class StateService {
    str: string;
    states: State[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
        this.states = [{
            State_Id: 1,
            State_Code: 'Brand_1',
            State_Name_ENg: 'Meswak',
            State_Name_Uni: 'मिस्वाक',
            Country_Id: 1,
            CreatedBy: 'SUPERADMIN',
            ModifiedBy: 'SUPERADMIN',
            CreDate: '08-03-2019',
            ModDate: null,
            IsActive: true
        }, {
            State_Id: 1,
            State_Code: 'Islamabad',
            State_Name_ENg: 'Islamabad',
            State_Name_Uni: 'इस्लामाबाद ',
            Country_Id: 2,
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
