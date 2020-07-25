import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TehsilEntity } from '../../Module/Masters/Tehsil';
import { TehsilService } from '../../Services/Masters/TehsilService';
@Injectable()

export class TehsilMasterResolverService implements Resolve<TehsilEntity> {
    tehsilNumber: string;
    constructor(private tehsilService: TehsilService, private route: ActivatedRoute) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TehsilEntity> {
        this.tehsilNumber = route.params.id;
        return this.tehsilService.getTehsil(+this.tehsilNumber);
    }

}
