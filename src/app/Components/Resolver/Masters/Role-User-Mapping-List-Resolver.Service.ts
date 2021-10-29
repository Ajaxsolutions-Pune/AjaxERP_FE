import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleUserMappingService } from '../../Services/Masters/RoleUserMappingService';
import { RoleUserMappingEntity } from '../../Module/Masters/RoleUserMapping.model';

@Injectable()

export class RoleUserMappingListResolverService implements Resolve<RoleUserMappingEntity[]> {
    constructor(private roleusermappingService: RoleUserMappingService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RoleUserMappingEntity[]> {
        return this.roleusermappingService.getRoleUserMappings();
    }

}
