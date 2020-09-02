
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable()
export class GlobalService {
    myDate = new Date();
    constructor(private datePipe: DatePipe) {
    }
    GerCurrntDateStamp(): string {
        return this.datePipe.transform(this.myDate, 'yyyy-MM-dd hh:mm:ss.sss');
    }
}
