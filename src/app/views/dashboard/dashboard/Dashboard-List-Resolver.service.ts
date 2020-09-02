
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardProd } from '../../../Components/Module/DashboardProd.model';
import { LoginUser } from '../../../Components/Module/LoginUser';
import { DashboardService } from '../../../Components/Services/Dashboard.service';

@Injectable({
    providedIn: 'root'
})
export class DashboardListResolverService implements Resolve<DashboardProd[]> {
    constructor(private dashboardService: DashboardService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DashboardProd[]> {
        return this.dashboardService.getDashBoard('1', '', '0', '0');
    }
}
