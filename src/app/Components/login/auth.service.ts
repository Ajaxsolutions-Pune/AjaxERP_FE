import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import OktaAuth from '@okta/okta-auth-js';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Insertstatus } from '../Module/Masters/Insert_status.model';
import { LogIn } from '../Module/login.model';
import { environment } from '../Module/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  str: string;
  env = environment;
  constructor(private router: Router, private httpClient: HttpClient) {
    this.str = this.env.apiServiceIPPort;
  }
  Login(loginEntityObj: LogIn): Observable<Insertstatus> {
    console.log(loginEntityObj);
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.httpClient.post<Insertstatus>
      ('http://ajaxdevdbcl.eastus.cloudapp.azure.com:8085/AjaxErpBackEnd/authenticate',
    // ('http://ajaxservercl.eastus.cloudapp.azure.com:8090/AjaxErpBackEnd/authenticate',    
        loginEntityObj,
        httpOptions).pipe(catchError(this.handleError));
  }
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('client side error', errorResponse.error.message);
    }
    return throwError('d');
  }
}
