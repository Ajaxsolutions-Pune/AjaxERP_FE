import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { District } from '../../Module/Masters/District';
import { DistrictEntity } from '../../Module/Masters/DistrictEntity.model';

@Injectable()
export class DistrictService {
    str: string;
    Districts: District[];
    env = environment;
    Listdistrict: District[];
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    ListDistrict: District[];
    getDistricts(): Observable<DistrictEntity[]> {
        return this.httpClient.get<DistrictEntity[]>(this.str + '/District/getList',
         this.env.httpOptions);
    }

    getDistrict(DistrictCode: number): Observable<DistrictEntity> {
        console.log(this.str + 'District/' + DistrictCode);
        return this.httpClient.get<DistrictEntity>(this.str + 'District/' + DistrictCode
        , this.env.httpOptions);

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
