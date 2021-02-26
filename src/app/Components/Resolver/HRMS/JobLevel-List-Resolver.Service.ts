import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { JobLevelEntity } from '../../Module/HRMS/JobLevel.model';
import { JobLevelService } from '../../Services/HRMS/JobLevelService';

@Injectable()

export class JobLevelListResolverService implements Resolve<JobLevelEntity[]> {
    constructor(private jobLevelService: JobLevelService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<JobLevelEntity[]> {
        return this.jobLevelService.getjobLevels();
    }

}
