import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardService } from '../../Services/Masters/DashboardService';
import { dashboard } from '../../Module/Masters/Dashboard.model';

@Injectable()

export class DashboardListResolverService implements Resolve<dashboard[]> {
    constructor(private dashboardService: DashboardService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<dashboard[]> {
        return this.dashboardService.getDashboardData();
    }

}
