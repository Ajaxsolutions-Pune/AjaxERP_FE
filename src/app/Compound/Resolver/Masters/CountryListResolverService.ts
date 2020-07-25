import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryEntity } from '../../Module/Masters/Country.model';
import { CountryService } from '../../Services/Masters/CountryService';

@Injectable()

export class CountryResolverService implements Resolve<CountryEntity[]> {
    constructor(private sateService: CountryService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CountryEntity[]> {
        return this.sateService.getCountrys();
    }

}
