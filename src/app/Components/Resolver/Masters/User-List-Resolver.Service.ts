import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../Services/Masters/UserService';
import { UserEntity } from '../../Module/Masters/User.model';

@Injectable()

export class UserListResolverService implements Resolve<UserEntity[]> {
    constructor(private roleService : UserService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserEntity[]> {
        return this.roleService.getUsers();
    }
}