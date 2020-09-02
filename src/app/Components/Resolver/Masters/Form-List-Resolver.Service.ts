import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../../Module/Masters/Brand.model';
import { BrandService } from '../../Services/Masters/BrandService';
import { FormEntity } from '../../Module/Masters/Form.model';
import { FormService } from '../../Services/Masters/FormService';

@Injectable()

export class FormListResolverService implements Resolve<FormEntity[]> {
    constructor(private formService: FormService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FormEntity[]> {
        return this.formService.getForms();
    }

}
