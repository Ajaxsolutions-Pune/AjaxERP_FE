
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { MasterDrp } from '../../Module/Masters/MasterDrp.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { DialogService } from '../MatServices/Dialog.service';

@Injectable()
export class GlobalService {
    str: string;
    myDate = new Date();
    env = environment;
    constructor(private datePipe: DatePipe,
        private httpClient: HttpClient,
        public dialogService: DialogService) {
        this.str = this.env.apiServiceIPPort;
    }
    GerCurrntDateStamp(): string {
        return this.datePipe.transform(this.myDate, 'yyyy-MM-dd hh:mm:ss.sss');
    }

    SpecialCharValidator(charCode: number): boolean {
        return (charCode === 8 || charCode === 32 || charCode === 44 ||
            (charCode >= 45 && charCode <= 57) ||
            (charCode > 62 && charCode < 91) || charCode === 95 ||
            (charCode > 96 && charCode < 123));
    }
    PassCharValidator(charCode: number): boolean {
        return (charCode === 8 || charCode === 35 || charCode === 36 || charCode === 37
            || charCode === 42 || (charCode >= 45 && charCode <= 57) ||
            (charCode > 62 && charCode < 91)
            || charCode === 95 || charCode === 44 ||
            (charCode > 96 && charCode < 123));
    }
    NumberValidator(charCode: number): boolean {
        return (charCode > 47 && charCode < 58);
    }

    fillMasterDrp(MasterCode: string): Observable<MasterDrp[]> {
        return this.httpClient.get<MasterDrp[]>(this.str + '/MastersList/' + MasterCode, this.env.httpOptions);
    }

    limitKeypress(event, value, maxLength) {
        if (value !== undefined && value.toString().length >= maxLength) {
            event.preventDefault();
        }
    }


}
