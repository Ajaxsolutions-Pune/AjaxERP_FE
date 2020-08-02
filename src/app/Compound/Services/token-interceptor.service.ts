import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

    constructor() { }
    intercept(req, next) {
        // tslint:disable-next-line:max-line-length
        const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMURwIiwiZXhwIjoxNTk2Mjc1NDkzLCJpYXQiOjE1OTYxODkwOTN9.zw8-iJKr5SWa_BpB-rPElRgy8WPKZ3VAwekqxVY2zGvbl4zCFPO3D-hADuMB4ZQzNN7j4809U4i6LA1tju46HQ';
        const tokenizedReq = req.clone({
            setHeaders: {
                Authorization: 'Bearer ' + token

            }
        });
        return next.handle(tokenizedReq);

    }
}
