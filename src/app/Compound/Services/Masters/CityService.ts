import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Country } from '../../Module/Masters/Country.model';
import { Brand } from '../../Module/Masters/Brand.model';
import { City } from '../../Module/City';

@Injectable()
export class CityService {
    str: string;
    Citys: City[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
        this.Citys = [{
            ID: 1,
            City_Code: '01',
            City_Name_ENG: 'Pune',
            City_Name_UNI: 'Pune',
            CityGroup_Code: '1001',
            District_Code: '1001',
            Thesil_Code: '1',
            Zip_Pin_Code: 'a',
            Is_Auto: true,
            Sort_By: '1',
            Is_Active: true,
            Created_By: 'SUPERADMIN',
            Modified_By: 'SUPERADMIN',
            Created_Date: '08-03-2019',
            Modified_Date: null
        }, {
            ID: 1,
            City_Code: '02',
            City_Name_ENG: 'Dhule',
            City_Name_UNI: 'Dhule',
            CityGroup_Code: '1002',
            District_Code: '1002',
            Thesil_Code: '2',
            Zip_Pin_Code: 'a',
            Is_Auto: true,
            Sort_By: '1',
            Is_Active: true,
            Created_By: 'SUPERADMIN',
            Modified_By: 'SUPERADMIN',
            Created_Date: '08-03-2019',
            Modified_Date: null
        },
        ];
    }
    ListCity: City[];
    getCitys(): City[] {
        return this.Citys;
    }

    getCity(CityCode: number): City[] {
        this.ListCity = this.Citys.filter(Citys => Citys.City_Code.toString().indexOf(CityCode.toString()) !== -1);
        return this.Citys;
    }
    getMaxCityId(): number {
        return this.Citys.length;
    }
    Save(city: City): City {
        this.Citys.push(city);
        return city;

    }

    Update(city: City): string {
        const Index = this.Citys.findIndex(a => a.City_Code === city.City_Code);
        this.Citys[Index] = city;
        return '';
    }
    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
