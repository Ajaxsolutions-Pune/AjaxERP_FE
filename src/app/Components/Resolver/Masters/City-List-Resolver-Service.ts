import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ZoneService } from '../../Services/Masters/ZoneService';
import { ClusterEntity } from '../../Module/Masters/Cluster.model';
import { ClusterService } from '../../Services/Masters/ClusterService';
import { CityService } from '../../Services/Masters/CityService';
import { CityEntity } from '../../Module/City';

@Injectable()

export class CityListResolverService implements Resolve<CityEntity[]> {
    constructor(private cityService: CityService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CityEntity[]> {
        return this.cityService.getCitys();
    }

}
