import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ZoneService } from '../../Services/Masters/ZoneService';
import { ZoneEntity } from '../../Module/Masters/Zone.model';

@Injectable()

export class ZoneListResolverService implements Resolve<ZoneEntity[]> {
    constructor(private assetGroupService: ZoneService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ZoneEntity[]> {
        return this.assetGroupService.getZones();
    }

}
