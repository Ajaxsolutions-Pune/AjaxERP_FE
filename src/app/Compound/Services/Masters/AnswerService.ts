import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Answer, AnswerEntity } from '../../Module/Masters/Answer.model';

@Injectable()
export class AnswerService {
    str: string;
    answers: Answer[];
    env = environment;
    ListAnswer: Answer[];
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    Listanswer: Answer[];
    getAnswers(): Observable<AnswerEntity[]> {
        return this.httpClient.get<AnswerEntity[]>(this.str + '/Answer/getList');
    }

    getAnswer(AnswerCode: string): Observable<AnswerEntity> {
        console.log(this.str + '/Answer/' + AnswerCode);
        return this.httpClient.get<AnswerEntity>(this.str + '/Answer/' + AnswerCode).pipe(catchError(this.handleError));
    }
    Save(saveEntityObj: AnswerEntity): Observable<AnswerEntity> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.httpClient.post<AnswerEntity>(this.str + 'Answer', saveEntityObj, httpOptions).pipe(catchError(this.handleError));
    }

    Update(updateEntityObj: AnswerEntity): Observable<AnswerEntity> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.httpClient.post<AnswerEntity>(this.str + 'Answer', updateEntityObj, httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
