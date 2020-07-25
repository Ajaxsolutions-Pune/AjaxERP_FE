import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tehsil } from '../../Module/Masters/Tehsil';
import { TehsilService } from '../../Services/Masters/TehsilService';

@Injectable()

export class TehsilListResolverService implements Resolve<Tehsil[]> {
    constructor(private tehsilService: TehsilService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Tehsil[]> {
        return this.tehsilService.getTehsils();
    }

}
