import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ZoneService } from '../../Services/Masters/ZoneService';
import { ClusterEntity } from '../../Module/Masters/Cluster.model';
import { ClusterService } from '../../Services/Masters/ClusterService';
import { CityService } from '../../Services/Masters/CityService';
import { CityEntity } from '../../Module/City';
import { CityGroupService } from '../../Services/Masters/CityGroupService';
import { CityGroupEntity } from '../../Module/Masters/CityGroup';

@Injectable()

export class CityGroupListResolverService implements Resolve<CityGroupEntity[]> {
    constructor(private cityGroupService: CityGroupService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CityGroupEntity[]> {
        return this.cityGroupService.getCityGroups();
    }

}
