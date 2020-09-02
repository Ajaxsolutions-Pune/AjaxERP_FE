import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StateEntity } from '../Module/Masters/StateEntity.model';
import { StateService } from '../Services/Masters/StateService';

@Injectable()

export class StateListResolverService implements Resolve<StateEntity[]> {
    constructor(private sateService: StateService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<StateEntity[]> {
        return this.sateService.getStates();
    }

}
