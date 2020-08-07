import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegionService } from '../../Services/Masters/RegionService';
import { RegionEntity } from '../../Module/Masters/Region.model';
@Injectable()
export class RegionListResolverService implements Resolve<RegionEntity[]> {
    constructor(private regionService: RegionService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
     Observable<RegionEntity[]> {
        return this.regionService.getRegions();
    }

}
