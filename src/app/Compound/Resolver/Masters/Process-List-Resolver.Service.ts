import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  ProcessEntity } from '../../Module/Masters/process.model';
import { ProcessService1 } from '../../Services/Masters/ProcessService1';

@Injectable()

export class ProcessListResolverService implements Resolve<ProcessEntity[]> {
    constructor(private processService: ProcessService1) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProcessEntity[]> {
        return this.processService.getprocesss();
    }

}
