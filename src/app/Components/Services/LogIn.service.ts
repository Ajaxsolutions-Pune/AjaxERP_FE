
import { Injectable } from '@angular/core';
import { LogIn } from '../../Components/Module/login.model';
import { Observable, throwError, observable } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../Module/environment';
import { User } from '../Module/User.model';
import { Insertstatus } from '../Module/Masters/Insert_status.model';
import { DatePipe } from '@angular/common';

@Injectable()
export class LogInService {
    str: string;
    env = environment;
    constructor(
        private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    login: LogIn;

    Login(loginEntityObj: LogIn): Observable<Insertstatus> {
        console.log(loginEntityObj);
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.httpClient.post<Insertstatus>
            (this.str + '/authenticate',
                loginEntityObj,
                httpOptions).pipe(catchError(this.handleError));
    }

    Logout(branchNo: string, userId: string): Observable<string> {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<string>(this.str + '/Master/LogOut?BranchNo=' + branchNo + '&UserId=' + userId + '').pipe(catchError(this.handleError));
    }
    UserList(): Observable<LogIn[]> {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get<LogIn[]>(this.str + '/Master/getUser?UserNo=0&BranchNo=1').pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
