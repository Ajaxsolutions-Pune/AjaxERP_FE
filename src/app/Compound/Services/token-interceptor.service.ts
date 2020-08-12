import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

    constructor() { }
    intercept(req, next) {
        console.log('localStorage');
        console.log(localStorage.getItem('user'));
        // tslint:disable-next-line:max-line-length
        const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMURwIiwiZXhwIjoxNTk3MzQ2NTQzLCJpYXQiOjE1OTcyNjAxNDN9.zP8yrMulKZsly9ARo7nR1JoZeJ-jjDaDd3jtUmr54nH5zmZLqPCbqS8IHjwiM01U076LPzXJzDjsJIhLfPCMQg';
        const tokenizedReq = req.clone({
            setHeaders: {
                Authorization: 'Bearer ' + token

            }
        });
        return next.handle(tokenizedReq);

    }
}
