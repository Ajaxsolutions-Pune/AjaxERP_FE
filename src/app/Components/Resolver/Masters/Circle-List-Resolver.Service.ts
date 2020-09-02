import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CircleService } from '../../Services/Masters/CircleService';
import { CircleEntity } from '../../Module/Masters/Circle.model';

@Injectable()

export class CircleListResolverService implements Resolve<CircleEntity[]> {
    constructor(private circleService: CircleService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CircleEntity[]> {
        return this.circleService.getCircles();
    }

}
