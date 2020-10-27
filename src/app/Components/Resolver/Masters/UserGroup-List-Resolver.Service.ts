import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserGroupService } from '../../Services/Masters/UserGroupService';
import { UserGroupEntity } from '../../Module/Masters/UserGroup.model';

@Injectable()

export class UserGroupListResolverService implements Resolve<UserGroupEntity[]> {
    constructor(private userGroupService: UserGroupService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserGroupEntity[]> {
        return this.userGroupService.getUserGroups();
    }

}
