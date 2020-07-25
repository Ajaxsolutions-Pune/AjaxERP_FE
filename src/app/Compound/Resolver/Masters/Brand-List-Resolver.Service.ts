import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../../Module/Masters/Brand.model';
import { BrandService } from '../../Services/Masters/BrandService';

@Injectable()

export class BrandListResolverService implements Resolve<Brand[]> {
    constructor(private brandService: BrandService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Brand[]> {
        return this.brandService.getBrands();
    }

}
