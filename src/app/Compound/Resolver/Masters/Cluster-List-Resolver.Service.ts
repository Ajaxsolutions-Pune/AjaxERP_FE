import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ZoneService } from '../../Services/Masters/ZoneService';
import { ClusterEntity } from '../../Module/Masters/Cluster.model';
import { ClusterService } from '../../Services/Masters/ClusterService';

@Injectable()

export class ClusterListResolverService implements Resolve<ClusterEntity[]> {
    constructor(private clusterService: ClusterService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ClusterEntity[]> {
        return this.clusterService.getClusters();
    }

}
