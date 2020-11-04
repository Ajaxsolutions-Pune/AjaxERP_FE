import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccessService } from '../../Services/Masters/AccessService';
import { AccessEntity } from '../../Module/Masters/Access.model';
import { FormService } from '../../Services/Masters/FormService';
import { FormEntity } from '../../Module/Masters/form.model';

@Injectable()

export class FormQueAnsMappingListResolverService implements Resolve<FormEntity[]> {
    constructor(private formService: FormService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FormEntity[]> {
        return this.formService.fillDrpForms();
    }

}
