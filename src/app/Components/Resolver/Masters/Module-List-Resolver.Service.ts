import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModuleobjEntity } from '../../Module/Masters/Module.model';
import { ModuleobjService } from '../../Services/Masters/ModuleService';

@Injectable()

export class ModuleobjListResolverService implements Resolve<ModuleobjEntity[]> {
    constructor(private moduleobjService: ModuleobjService) { }
    resolve(): Observable<ModuleobjEntity[]> {
        return this.moduleobjService.getModuleobjs();
    }

}
