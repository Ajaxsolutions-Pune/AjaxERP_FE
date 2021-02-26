import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { QualificationTypeEntity } from '../../Module/HRMS/QualificationType.model';
import { QualificationTypeService } from '../../Services/HRMS/QualificationTypeService';


@Injectable()

export class QualificationTypeListResolverService implements Resolve<QualificationTypeEntity[]> {
    constructor(private qualificationTypeService: QualificationTypeService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QualificationTypeEntity[]> {
        return this.qualificationTypeService.getqualificationTypes();
    }

}
