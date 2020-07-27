import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

    constructor() { }
    intercept(req, next) {
        // tslint:disable-next-line:max-line-length
        const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMURwIiwiZXhwIjoxNTk1Nzg4OTA1LCJpYXQiOjE1OTU3NzA5MDV9.j91KUDV3Z8FcYW2qbIK5fxQq4RFl7G1EHDYfwtnU95ne0Xrj9LXVuZPLrC0sr7OrwMwwLE6udCDLGIU21f8J9w';
        const tokenizedReq = req.clone({
            setHeaders: {
                Authorization: 'Bearer ' + token

            }
        });
        return next.handle(tokenizedReq);

    }
}
