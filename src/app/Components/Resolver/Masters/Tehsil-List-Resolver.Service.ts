import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tehsil, TehsilEntity } from '../../Module/Masters/Tehsil';
import { TehsilService } from '../../Services/Masters/TehsilService';

@Injectable()

export class TehsilListResolverService implements Resolve<TehsilEntity[]> {
    constructor(private tehsilService: TehsilService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TehsilEntity[]> {
        return this.tehsilService.getTehsils();
    }

}