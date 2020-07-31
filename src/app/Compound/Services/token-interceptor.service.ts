import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

    constructor() { }
    intercept(req, next) {
        // tslint:disable-next-line:max-line-length
        const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMURwIiwiZXhwIjoxNTk2MDE1ODcxLCJpYXQiOjE1OTU5Mjk0NzF9.uR3QAaHt_WEGUJU0A8vtQTn6ByYPHuFyKVP5DMh-BAiXIVttIDRJoX0CU1XmpsVVPrLbpnCXrfOhOqbGcJ1mvA';
        const tokenizedReq = req.clone({
            setHeaders: {
                Authorization: 'Bearer ' + token

            }
        });
        return next.handle(tokenizedReq);

    }
}
