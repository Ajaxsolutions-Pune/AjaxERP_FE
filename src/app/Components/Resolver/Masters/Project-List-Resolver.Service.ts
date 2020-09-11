import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectService } from '../../Services/Masters/ProjectService';
import { ProjectEntity } from '../../Module/Masters/Project.model';

@Injectable()

export class ProjectListResolverService implements Resolve<ProjectEntity[]> {
    constructor(private projectService: ProjectService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProjectEntity[]> {
        return this.projectService.getProjects();
    }
}