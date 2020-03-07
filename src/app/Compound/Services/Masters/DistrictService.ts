import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { District } from '../../Module/Masters/District';

@Injectable()
export class DistrictService {
    str: string;
    Districts: District[];
    env = environment;
    Listdistrict: District[];
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
        this.Districts = [{
            ID: 1,
            districtCode: '12',
            districtName: 'Pune',
            districtNameUni: 'Pune',
            stateCode: '27',
            isActive: true,

        }, {
            ID: 2,
            districtCode: '2',
            districtName: 'Dhule',
            districtNameUni: 'Dhule',
            stateCode: '27',
            isActive: true,

        },
        ];
    }
    ListDistrict: District[];
    getDistricts(): District[] {
        return this.Districts;
    }

    getDistrict(DistrictCode: number): District[] {
        this.Listdistrict = this.Districts.filter(Districts => Districts.districtCode.toString().indexOf(DistrictCode.toString()) !== -1);
        return this.Districts;
    }
    getMaxDistrictId(): number {
        return this.Districts.length;
    }
    Save(district: District): District {
        this.Districts.push(district);
        return district;

    }

    Update(district: District): string {
        const Index = this.Districts.findIndex(a => a.districtCode === district.districtCode);
        this.Districts[Index] = district;
        return '';
    }
    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
