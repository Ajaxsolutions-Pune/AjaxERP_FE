import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

    constructor() { }
    intercept(req, next) {
        // tslint:disable-next-line:max-line-length
        const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMURwIiwiZXhwIjoxNTk1NjgwOTU5LCJpYXQiOjE1OTU2NjI5NTl9.b4o0lmdf5glFS6c7GsZQta1VtbvPpHhALqNX72npJXm2PrWuIdElNI0OJy7EUV4gavp5h4PurmdChneF8fyJHA';
        const tokenizedReq = req.clone({
            setHeaders: {
                Authorization: 'Bearer ' + token

            }
        });
        return next.handle(tokenizedReq);

    }
}
