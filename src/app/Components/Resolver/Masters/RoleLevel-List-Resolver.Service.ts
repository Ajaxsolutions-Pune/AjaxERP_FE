import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RolelevelService } from '../../Services/Masters/RolelevelService';
import { RoleLevelEntity } from '../../Module/Masters/RoleLevel.model';

@Injectable()

export class RolelevelListResolverService implements Resolve<RoleLevelEntity[]> {
    constructor(private RolelevelService: RolelevelService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RoleLevelEntity[]> {
        return this.RolelevelService.getRolelevels();
    }

}
