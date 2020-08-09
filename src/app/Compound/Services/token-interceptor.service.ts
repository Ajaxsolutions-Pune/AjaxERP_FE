import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

    constructor() { }
    intercept(req, next) {
        console.log('localStorage');
        console.log(localStorage.getItem('user'));
        // tslint:disable-next-line:max-line-length
        const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMURwIiwiZXhwIjoxNTk2OTQ1MDkwLCJpYXQiOjE1OTY4NTg2OTB9.84pXDHdXJqAiiEeyOsnw4xItdgfQXH6EwGwbdb2tJFTz0eOw8Bk_VBFc5r4tHBGptnXqYi1eOWf6tTOr5cIeYw';
        const tokenizedReq = req.clone({
            setHeaders: {
                Authorization: 'Bearer ' + token

            }
        });
        return next.handle(tokenizedReq);

    }
}
