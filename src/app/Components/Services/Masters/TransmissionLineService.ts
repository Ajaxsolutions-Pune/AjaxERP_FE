import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { TransmissionLine, TransmissionLineEntity } from '../../Module/Masters/TransmissionLine.model';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { DialogService } from '../MatServices/Dialog.service';

@Injectable()
export class TransmissionLineService {
    str: string;
    transmissionLines: TransmissionLine[];
    env = environment;
    constructor(private httpClient: HttpClient, public dialogService: DialogService) {
        this.str = this.env.apiServiceIPPort;
    }
    getTransmissionLines(): Observable<TransmissionLineEntity[]> {
        return this.httpClient.get<TransmissionLineEntity[]>(this.str + '/TransmissionLine/getList', this.env.httpOptions);
    }

    fillDrpTransmissionLines(): Observable<TransmissionLineEntity[]> {
        return this.httpClient.get<TransmissionLineEntity[]>(this.str + '/TransmissionLine/getList?status=1', this.env.httpOptions);
    }

    getTransmissionLine(TransmissionLineCode: string): Observable<TransmissionLineEntity> {
        return this.httpClient.get<TransmissionLineEntity>(this.str + '/TransmissionLine/' + TransmissionLineCode,
            this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Save(saveEntityObj: TransmissionLineEntity): Observable<Insertstatus> {
      //  saveEntityObj.tlCode = null;
        return this.httpClient.post<Insertstatus>(this.str + '/TransmissionLine',
            saveEntityObj, this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Update(updateEntityObj: TransmissionLineEntity): Observable<Insertstatus> {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/TransmissionLine', updateEntityObj
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
