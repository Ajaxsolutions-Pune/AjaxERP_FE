
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { MasterDrp } from '../../Module/Masters/MasterDrp.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { DialogService } from '../MatServices/Dialog.service';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

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
        return this.datePipe.transform(this.myDate, 'yyyy-MM-dd HH:mm:ss.sss');
    }
    GerCurrntDate(): string {
        return this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
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
    ConfirmPasswor(PassFild: string, ConfirmPassFild: string): any {
        if (PassFild == ConfirmPassFild)
            return true;
        else
            return false;
    }

    fillMasterDrp(MasterCode: string): Observable<MasterDrp[]> {
        return this.httpClient.get<MasterDrp[]>(this.str + '/MastersList/'
            + MasterCode, this.env.httpOptions);
    }

    getExcelfil(fromDate: string, toDate: string, assetGroupCode: string, processId: string
        , userId: string, customerCode: string, assetCode: string,withImage: string) {
        let ReportUrl = '/Report/assetMonitoringRpt?ouCode=' + this.env.OuCode +
            '&loginId=' + localStorage.getItem('username').toString() +
            '&fromDate=' + fromDate + '&toDate=' + toDate + '&' +
            'assetGroupCode=' + assetGroupCode + '&processId=' + processId +
             '&userId=' + userId + '&customerCode=' + customerCode
              + '&assetCode=' + assetCode + '&withImage='+ withImage;
         const baseUrl = this.str + ReportUrl;
         const token = localStorage.getItem('token').toString();
         const headers = new HttpHeaders().set('authorization', 'Bearer ' + token);
         this.httpClient.get(baseUrl, { headers, responseType: 'blob' as 'json' }).subscribe(
             (response: any) => {
                 let dataType = response.type;
                 let binaryData = [];
                 binaryData.push(response);
                 let downloadLink = document.createElement('a');
                 downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
                 if (true)
                     downloadLink.setAttribute('download', 'MonitoringReport.xlsx');
                 document.body.appendChild(downloadLink);
                 downloadLink.click();
             }
         )
    }



    limitKeypress(event, value, maxLength) {
        if (value !== undefined && value.toString().length >= maxLength) {
            event.preventDefault();
        }
    }


}
