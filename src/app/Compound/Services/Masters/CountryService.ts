import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Country } from '../../Module/Masters/Country.model';

@Injectable()
export class CountryService {
    str: string;
    countrys: Country[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
        this.countrys = [{
            Country_Id: 1,
            Country_Name_ENg: 'India',
            Country_Name_Uni: 'भारत',
            CreatedBy: 'SUPERADMIN',
            ModifiedBy: 'SUPERADMIN',
            CreDate: '08-03-2019',
            ModDate: null,
            IsActive: true
        }, {
            Country_Id: 2,
            Country_Name_ENg: 'pakistan ',
            Country_Name_Uni: 'पाकिस्तान',
            CreatedBy: 'SUPERADMIN',
            ModifiedBy: 'SUPERADMIN',
            CreDate: '08-03-2019',
            ModDate: null,
            IsActive: true
        },
        ];
    }
    ListCountry: Country[];
    getCountrys(): Country[] {
        return this.countrys;
    }

    getCountry(countrysId: number): Country[] {
        this.ListCountry = this.countrys.filter(country => country.Country_Id.toString().indexOf(countrysId.toString()) !== -1);
        return this.countrys;
    }

    getRole(): void {
    }
    Save(country: Country): Country {
        this.countrys.push(country);
        return country;

    }

    Update(country: Country): string {
        const Index = this.countrys.findIndex(a => a.Country_Id === country.Country_Id);
        this.countrys[Index] = country;
        return '';
    }
    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
