import { Injectable, Component } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Answer, AnswerEntity } from '../../Module/Masters/Answer.model';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { DialogService } from '../MatServices/Dialog.service';
import { DatePipe } from '@angular/common';

@Injectable()
export class AnswerService {
    str: string;
    answers: Answer[];
    env = environment;
    ListAnswer: Answer[];
    constructor(private httpClient: HttpClient, public dialogService: DialogService) {
        this.str = this.env.apiServiceIPPort;
    }
    Listanswer: Answer[];
    getAnswers(): Observable<AnswerEntity[]> {
        return this.httpClient.get<AnswerEntity[]>(this.str + '/Answer/getList', this.env.httpOptions);
    }

    fillDrpAnswers(): Observable<AnswerEntity[]> {
        console.log(this.httpClient.get<AnswerEntity[]>(this.str + '/Answer/getList'));
        return this.httpClient.get<AnswerEntity[]>(this.str + '/Answer/getList?status=1', this.env.httpOptions);
    }

    getAnswer(AnswerCode: string): Observable<AnswerEntity> {
        return this.httpClient.get<AnswerEntity>(this.str + '/Answer/' + AnswerCode,
            this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Save(saveEntityObj: AnswerEntity): Observable<Insertstatus> {
        saveEntityObj.answerId = null;
        console.log(this.str + '/Answer');
        return this.httpClient.post<Insertstatus>(this.str + '/Answer',
            saveEntityObj, this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Update(updateEntityObj: AnswerEntity): Observable<Insertstatus> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/Answer', updateEntityObj
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
        const data = null; // call api
        console.log(this.dialogService);
        this.dialogService.openModal('Title1', 'Message Test', () => {
            // confirmed
            console.log('Yes');
        }, () => {
            // not confirmed
            console.log('No');
        });
    }
}
