
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

    fillMasterDrp(MasterCode: string): Observable<MasterDrp[]> {
        return this.httpClient.get<MasterDrp[]>(this.str + '/MastersList/' + MasterCode, this.env.httpOptions);
    }

    limitKeypress(event, value, maxLength) {
        if (value !== undefined && value.toString().length >= maxLength) {
            event.preventDefault();
        }
    }


}
