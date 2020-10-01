import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccessService } from '../../Services/Masters/AccessService';
import { AccessEntity } from '../../Module/Masters/Access.model';

@Injectable()

export class AccessListResolverService implements Resolve<AccessEntity[]> {
    constructor(private accessService: AccessService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AccessEntity[]> {
        return this.accessService.getAccesss();
    }

}
