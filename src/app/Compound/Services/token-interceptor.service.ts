import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

    constructor() { }
    intercept(req, next) {
        // tslint:disable-next-line:max-line-length
        const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMURwIiwiZXhwIjoxNTk2ODczNDE2LCJpYXQiOjE1OTY3ODcwMTZ9.BOaql1oFbNyFXZG31hfmM450rhsu07Vfftwkq2w3uyBS_xAPK-GsrWUJeTDofUZmOweHFQ0uSyVrFTHj3xOluw';
        const tokenizedReq = req.clone({
            setHeaders: {
                Authorization: 'Bearer ' + token

            }
        });
        return next.handle(tokenizedReq);

    }
}
