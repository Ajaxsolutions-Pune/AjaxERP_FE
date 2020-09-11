import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleService } from '../../Services/Masters/RoleService';
import { RoleEntity } from '../../Module/Masters/Role.model';

@Injectable()

export class RoleListResolverService implements Resolve<RoleEntity[]> {
    constructor(private roleService : RoleService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RoleEntity[]> {
        return this.roleService.getRoles();
    }
}