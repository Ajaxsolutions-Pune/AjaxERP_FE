import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

    constructor() { }
    intercept(req, next) {
        console.log('localStorage');
        console.log(localStorage.getItem('user'));
        // tslint:disable-next-line:max-line-length
        const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMURwIiwiZXhwIjoxNTk3MDQxNjE4LCJpYXQiOjE1OTY5NTUyMTh9.PIioO6_kUupAzdaPOJabcivFoTGeH40LOPMMqGaguYzUZPf84wK29wSVQXo04of6MiWbvtwfj2hICx45Lhy0MQ';
        const tokenizedReq = req.clone({
            setHeaders: {
                Authorization: 'Bearer ' + token

            }
        });
        return next.handle(tokenizedReq);

    }
}
