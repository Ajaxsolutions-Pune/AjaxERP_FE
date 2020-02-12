
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardProd } from '../../../Compound/Module/DashboardProd.model';
import { LoginUser } from '../../../Compound/Module/LoginUser';
import { DashboardService } from '../../../Compound/Services/Dashboard.service';

@Injectable({
    providedIn: 'root'
})
export class DashboardListResolverService implements Resolve<DashboardProd[]> {
    constructor(private dashboardService: DashboardService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DashboardProd[]> {
        return this.dashboardService.getDashBoard(LoginUser.BranchNo.toString(), '', '0', '0');
    }
}
