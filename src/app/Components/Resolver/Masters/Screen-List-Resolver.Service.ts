import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScreenObjEntity } from '../../Module/Masters/Screen.model';
import { ScreenObjService } from '../../Services/Masters/ScreenService';

@Injectable()

export class ScreenObjListResolverService implements Resolve<ScreenObjEntity[]> {
    constructor(private screenObjService: ScreenObjService) { }
    resolve(): Observable<ScreenObjEntity[]> {
        return this.screenObjService.getScreens();
    }

}
