import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RolelevelService } from '../../Services/Masters/RolelevelService';
import { RolelevelEntity } from '../../Module/Masters/Rolelevel.model';

@Injectable()

export class RolelevelListResolverService implements Resolve<RolelevelEntity[]> {
    constructor(private RolelevelService: RolelevelService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RolelevelEntity[]> {
        return this.RolelevelService.getRolelevels();
    }

}
