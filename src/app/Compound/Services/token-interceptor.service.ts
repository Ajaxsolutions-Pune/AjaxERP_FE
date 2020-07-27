import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

    constructor() { }
    intercept(req, next) {
        // tslint:disable-next-line:max-line-length
        const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMURwIiwiZXhwIjoxNTk1OTM2MDkxLCJpYXQiOjE1OTU4NDk2OTF9.99VFB5ZqxOKfOIjQzLyOJ_IlydSjpmxsXEG1WQenjGPiSWDWiXeseuCk8c1_TvI2XfqG7xUVVeMnzow6ZP31Mw';
        const tokenizedReq = req.clone({
            setHeaders: {
                Authorization: 'Bearer ' + token

            }
        });
        return next.handle(tokenizedReq);

    }
}
