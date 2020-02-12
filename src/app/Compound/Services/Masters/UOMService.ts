import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { UOM } from '../../Module/Masters/UOM.model';

@Injectable()
export class UOMService {
    str: string;
    Units: UOM[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
        this.Units = [{
            UOM_Id: 1,
            UOM_ShortDescription: 'KG',
            UOM_Description: 'kilogram',
            CreatedBy: 'SUPERADMIN',
            ModifiedBy: 'SUPERADMIN',
            CreDate: '08-03-2019',
            ModDate: null,
            IsActive: true
        },
        {
            UOM_Id: 2,
            UOM_ShortDescription: 'LTR',
            UOM_Description: 'Litre',
            CreatedBy: 'SUPERADMIN',
            ModifiedBy: 'SUPERADMIN',
            CreDate: '08-03-2019',
            ModDate: null,
            IsActive: true
        }];
    }
    ListUnits: UOM[];
    getUnits(): UOM[] {
        return this.Units;
    }

    getUser(UnitsId: number): UOM[] {
        this.ListUnits = this.Units.filter(Unit => Unit.UOM_Id.toString().indexOf(UnitsId.toString()) !== -1);
        return this.ListUnits; // this.httpClient.get<User[]>(this.str + '/Master/getUser?UserNo=' + userId + '&BranchNo=1');
    }

    getRole(): void {
    }
    Save(Unit: UOM): UOM {
        console.log(Unit);
        this.Units.push(Unit);
        return Unit;

    }

    Update(Unit: UOM): string {
        const Index = this.Units.findIndex(a => a.UOM_Id === Unit.UOM_Id);
        console.log(Index);
        this.Units[Index] = Unit;
        console.log(this.Units[Index]);
        return '';
    }
    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
