import { Injectable } from '@angular/core';
import { QualificationEntity } from '../../Module/HRMS/Qualification.model';
import { RouterStateSnapshot, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { QualificationService } from '../../Services/HRMS/QualificationService';

@Injectable()

export class QualificationListResolverService implements Resolve<QualificationEntity[]> {
    constructor(private qualificationService: QualificationService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QualificationEntity[]> {
        return this.qualificationService.getqualifications();
    }

}
