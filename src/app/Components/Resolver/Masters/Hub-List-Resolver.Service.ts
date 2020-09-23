import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HubService } from '../../Services/Masters/HubService';
import { HubEntity } from '../../Module/Masters/Hub.model';

@Injectable()

export class HubListResolverService implements Resolve<HubEntity[]> {
    constructor(private hubService: HubService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HubEntity[]> {
        return this.hubService.getHubs();
    }

}
