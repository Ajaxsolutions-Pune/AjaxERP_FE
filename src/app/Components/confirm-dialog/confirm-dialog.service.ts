import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable() export class ConfirmDialogService {
    private subject = new Subject<any>();

    confirmThis(message: string, yesFn: (obj: object) => void, noFn: () => void): any {
        console.log();
        this.setConfirmation(message, yesFn, noFn);
    }

    setConfirmation(message: string, yesFn: (obj: object) => void, noFn: () => void): any {
        const that = this;
        this.subject.next({
            type: 'confirm',
            text: message,
            yesFn(obj): any {
                that.subject.next(); // This will close the modal  
                yesFn(obj);
            },
            noFn(): any {
                that.subject.next();
                noFn();
            }
        });

    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}  