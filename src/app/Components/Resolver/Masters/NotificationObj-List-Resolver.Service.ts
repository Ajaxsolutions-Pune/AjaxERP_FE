import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationObjService } from '../../Services/Masters/NotificationObjService';
import { NotificationObjEntity } from '../../Module/Masters/NotificationObj.model';

@Injectable()

export class NotificationObjListResolverService implements Resolve<NotificationObjEntity[]> {
    constructor(private roleService : NotificationObjService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<NotificationObjEntity[]> {
        return this.roleService.getNotificationObjs();
    }
}