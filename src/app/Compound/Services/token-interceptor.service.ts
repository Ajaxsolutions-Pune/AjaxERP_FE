import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

    constructor() { }
    intercept(req, next) {
        console.log('localStorage');
        console.log(localStorage.getItem('user'));
        // tslint:disable-next-line:max-line-length
        const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMURwIiwiZXhwIjoxNTk3MzI2MzcyLCJpYXQiOjE1OTcyMzk5NzJ9.OuK-3hUHhete2pF9GCqgnk2xa0kz6Wovexva92cw77rD-7sIBj0kKZzukjF8c7bNTK53Aray0ebxSnJhV2GK8Q';
        const tokenizedReq = req.clone({
            setHeaders: {
                Authorization: 'Bearer ' + token

            }
        });
        return next.handle(tokenizedReq);

    }
}
