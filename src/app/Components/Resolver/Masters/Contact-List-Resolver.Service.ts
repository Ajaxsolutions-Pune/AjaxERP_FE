import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactService } from '../../Services/Masters/ContactService';
import { ContactEntity } from '../../Module/Masters/Contact.model';

@Injectable()

export class ContactListResolverService implements Resolve<ContactEntity[]> {
    constructor(private contactService: ContactService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ContactEntity[]> {
        return this.contactService.getContacts();
    }

}
