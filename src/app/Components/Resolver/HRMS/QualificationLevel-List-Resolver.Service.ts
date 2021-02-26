import { Injectable } from '@angular/core';
// import { QualificationEntity } from '../../Module/HRMS/Qualification.model';
import { RouterStateSnapshot, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { QualificationLevelEntity } from '../../Module/HRMS/QualificationLevel.model';
import { QualificationLevelService } from '../../Services/HRMS/QualificationLevelService';
// import { QualificationService } from '../../Services/HRMS/QualificationService';

@Injectable()

export class QualificationLevelListResolverService implements Resolve<QualificationLevelEntity[]> {
    constructor(private qualificationLevelService: QualificationLevelService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QualificationLevelEntity[]> {
        return this.qualificationLevelService.getqualificationLevels();
    }

}
