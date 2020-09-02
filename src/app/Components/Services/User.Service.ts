import { Injectable } from '@angular/core';
import { User } from '../Module/User.model';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../Module/environment';

@Injectable()
export class UserService {
    str: string;
    user: User[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
        this.user = [{
            UserNo: 1,
            UserID: 'pooja',
            UserName: 'POOJA DATTATRAY DHAGALE',
            BranchNo: 1,
            Password: 'pooja',
            RoleId: 1,
            CreDate: '08-03-2019',
            CreUser: 'SUPERADMIN',
            ModUser: null,
            ModDate: null, IsActive: true, status: null,
            EmpId: 1
        }];
    }
    ListUser: User[];
    getUsers(): User[] {

        return this.user;
    }

    getUser(userId: number): User[] {
        this.ListUser = this.user.filter(user => user.UserID.indexOf(userId.toString()) !== -1);
        return this.ListUser; // this.httpClient.get<User[]>(this.str + '/Master/getUser?UserNo=' + userId + '&BranchNo=1');
    }

    getRole(): void {
    }
    Save(user: User): Observable<User> {
        if (user.UserNo === null) {
            const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
            return this.httpClient.post<User>(this.str + '/Master/AddUser',
                user, httpOptions).pipe(catchError(this.handleError));
        }
    }

    UpdateUser(user: User): Observable<string> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.httpClient.post<string>(this.str + '/Master/UpdateUser',
            user, httpOptions).pipe(catchError(this.handleError));
    }
    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }

    getToken(user: User): Observable<string>  {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.httpClient.post<string>(this.str + '/authenticate',
            user, httpOptions).pipe(catchError(this.handleError));
    }
}
