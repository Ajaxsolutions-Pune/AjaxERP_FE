import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

    constructor() { }
    intercept(req, next) {
        console.log('localStorage');
        console.log(localStorage.getItem('user'));
        // tslint:disable-next-line:max-line-length
        const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMURwIiwiZXhwIjoxNTk3MjA1MTA3LCJpYXQiOjE1OTcxMTg3MDd9.bVLyJDLrumCo3Pp8P8qRKH_gvsUqmI89p4zixSBDYcGmk0JNex_ANtV2KAsvOQzHfmBi40Kuqu6QJ8UjniN8Vg';
        const tokenizedReq = req.clone({
            setHeaders: {
                Authorization: 'Bearer ' + token

            }
        });
        return next.handle(tokenizedReq);

    }
}
