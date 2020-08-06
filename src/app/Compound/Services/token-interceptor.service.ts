import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

    constructor() { }
    intercept(req, next) {
        // tslint:disable-next-line:max-line-length
        const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMURwIiwiZXhwIjoxNTk2Njg4NjczLCJpYXQiOjE1OTY2MDIyNzN9.1i93xafnshtdVe21YhP5WDGw6bIb2WQlhtUG3CDnZdqVW-IveQMNZpZwLT8-gEjWK85kY6Q1r44ELXYKeufpVg';
        const tokenizedReq = req.clone({
            setHeaders: {
                Authorization: 'Bearer ' + token

            }
        });
        return next.handle(tokenizedReq);

    }
}
