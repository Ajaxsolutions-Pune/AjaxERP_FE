import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDeviceRegService } from '../../Services/Masters/UserDeviceRegService';
import { UserDeviceRegEntity } from '../../Module/Masters/UserDeviceReg.model';

@Injectable()

export class UserDeviceRegListResolverService implements Resolve<UserDeviceRegEntity[]> {
    constructor(private userDeviceRegService: UserDeviceRegService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserDeviceRegEntity[]> {
        return this.userDeviceRegService.getUserDeviceRegs();
    }

}
