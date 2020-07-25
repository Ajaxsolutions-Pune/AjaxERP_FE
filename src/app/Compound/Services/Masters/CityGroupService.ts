import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { CityGroup } from '../../Module/Masters/CityGroup';

@Injectable()
export class CityGroupService {
    str: string;
    CityGroups: CityGroup[];
    env = environment;
    Listdistrict: CityGroup[];
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
        this.CityGroups = [{
            Id: 1,
            CityGroup_Code: '11',
            CityGroup_Name_ENG: 'pune',
            CityGroup_Name_UNI: 'pune',
            IsActive: true,

        },
        {
            Id: 2,
            CityGroup_Code: '12',
            CityGroup_Name_ENG: 'pune',
            CityGroup_Name_UNI: 'pune',
            IsActive: true,
        },
        ];
    }
    ListCityGroup: CityGroup[];
    getCityGroups(): CityGroup[] {
        return this.CityGroups;
    }

    getCityGroup(Id: number): CityGroup[] {
        this.Listdistrict = this.CityGroups.filter(Groups => Groups.Id.toString().indexOf(Id.toString()) !== -1);
        return this.CityGroups;
    }
    getMaxCityGroupId(): number {
        return this.CityGroups.length;
    }
    Save(citygroup: CityGroup): CityGroup {
        this.CityGroups.push(citygroup);
        return citygroup;

    }

    Update(Groups: CityGroup): string {
        const Index = this.CityGroups.findIndex(a => a.Id === Groups.Id);
        this.CityGroups[Index] = Groups;
        return '';
    }
    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
