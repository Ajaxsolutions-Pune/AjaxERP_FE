import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { DialogService } from '../MatServices/Dialog.service';
import { Contact, ContactEntity } from '../../Module/Masters/Contact.model';

@Injectable()
export class ContactService {
    str: string;
    contacts: Contact[];
    env = environment;
    constructor(private httpClient: HttpClient, public dialogService: DialogService) {
        this.str = this.env.apiServiceIPPort;
    }
    getContacts(): Observable<ContactEntity[]> {
        return this.httpClient.get<ContactEntity[]>(this.str + '/Contact/getList', this.env.httpOptions);
    }

    fillDrpContacts(): Observable<ContactEntity[]> {
        return this.httpClient.get<ContactEntity[]>(this.str + '/Contact/getList?status=1', this.env.httpOptions);
    }

    getContact(ContactCode: string): Observable<ContactEntity> {
        return this.httpClient.get<ContactEntity>(this.str + '/Contact/' + ContactCode,
            this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Save(saveEntityObj: ContactEntity): Observable<Insertstatus> {
     //   saveEntityObj.tlCode = null;
        return this.httpClient.post<Insertstatus>(this.str + '/Contact',
            saveEntityObj, this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Update(updateEntityObj: ContactEntity): Observable<Insertstatus> {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/Contact', updateEntityObj
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
