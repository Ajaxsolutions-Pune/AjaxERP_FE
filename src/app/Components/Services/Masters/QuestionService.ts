import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Question, QuestionEntity } from '../../Module/Masters/Question.model';

@Injectable()
export class QuestionService {
    str: string;
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    getQuestions(): Observable<QuestionEntity[]> {
        return this.httpClient.get<QuestionEntity[]>(this.str + '/Question/getList'
        , this.env.httpOptions);
    }

    fillDrpQuestions(): Observable<QuestionEntity[]> {
        return this.httpClient.get<QuestionEntity[]>(this.str +
            '/Question/getList?status=1'
        , this.env.httpOptions);
    }
    getQuestion(questionCode: string): Observable<QuestionEntity> {
        return this.httpClient.get<QuestionEntity>(this.str + '/Question/' + questionCode
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Save(saveEntityObj: QuestionEntity): Observable<string> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.httpClient.post<string>(this.str + '/Question', saveEntityObj
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Update(updateEntityObj: QuestionEntity): Observable<QuestionEntity> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<QuestionEntity>(this.str + '/Question', updateEntityObj
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
