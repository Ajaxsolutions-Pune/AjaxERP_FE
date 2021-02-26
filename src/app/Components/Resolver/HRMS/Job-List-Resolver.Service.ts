import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { JobEntity } from '../../Module/HRMS/Job.model';
import { JobService } from '../../Services/HRMS/JobService';

@Injectable()

export class JobListResolverService implements Resolve<JobEntity[]> {
    constructor(private jobService: JobService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<JobEntity[]> {
        return this.jobService.getjobs();
    }

}
