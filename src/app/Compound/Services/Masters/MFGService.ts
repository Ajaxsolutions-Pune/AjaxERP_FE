import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { MFG } from '../../Module/Masters/MFG';

@Injectable()
export class MFGService {
    str: string;
    MFGS: MFG[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
        this.MFGS = [
            {
                ID: 1,
                manufactureCode: '1',
                manufactureDesc: '"Mhiii"',
                manufactureDescUni: '"DELL"',
                isActive: true
            }, {
                ID: 2,
                manufactureCode: '"2"',
                manufactureDesc: '"HP"',
                manufactureDescUni: '"HP"',
                isActive: true
            },
        ];
    }
    ListMFGS: MFG[];
    getMFGS(): MFG[] {
        return this.MFGS;
    }

    getMFG(manufactureCode: number): MFG[] {
        this.ListMFGS = this.MFGS.filter(mFGS => mFGS.manufactureCode.toString().indexOf(manufactureCode.toString()) !== -1);
        return this.MFGS;
    }
    getMaxMFGId(): number {
        return this.MFGS.length;
    }
    Save(mfg: MFG): MFG {
        this.MFGS.push(mfg);
        return mfg;

    }

    Update(mfg: MFG): string {
        const Index = this.MFGS.findIndex(a => a.manufactureCode === mfg.manufactureCode);
        this.MFGS[Index] = mfg;
        return '';
    }
    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
