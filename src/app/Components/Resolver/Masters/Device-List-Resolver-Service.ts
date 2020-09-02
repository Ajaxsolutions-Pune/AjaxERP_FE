import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceService } from '../../Services/Masters/DeviceService';
import { DeviceEntity } from '../../Module/Masters/Device.model';

@Injectable()
export class DeviceListResolverService implements Resolve<DeviceEntity[]> {
    constructor(private ceviceService: DeviceService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DeviceEntity[]> {
        return this.ceviceService.getDevices();
    }
}
