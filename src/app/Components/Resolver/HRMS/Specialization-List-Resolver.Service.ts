import { Injectable } from '@angular/core';
// import { QualificationEntity } from '../../Module/HRMS/Qualification.model';
import { RouterStateSnapshot, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
//import { QualificationLevelEntity } from '../../Module/HRMS/QualificationLevel.model';
import { SpecializationEntity } from '../../Module/HRMS/Specialization.model';
//import { QualificationLevelService } from '../../Services/HRMS/QualificationLevelService';
import { SpecializationService } from '../../Services/HRMS/SpecializationService';
// import { QualificationService } from '../../Services/HRMS/QualificationService';

@Injectable()

export class SpecializationListResolverService implements Resolve<SpecializationEntity[]> {
    constructor(private specializationService: SpecializationService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SpecializationEntity[]> {
        return this.specializationService.getspecializations();
    }

}
