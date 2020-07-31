import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QaTypeEntity } from '../../Module/Masters/QA_Type.model';
import { QaTypeService } from '../../Services/Masters/QaTypeService';

@Injectable()

export class QaTypeListResolverService implements Resolve<QaTypeEntity[]> {
    constructor(private qaTypeService: QaTypeService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QaTypeEntity[]> {
        return this.qaTypeService.getQaTypes();
    }

}
