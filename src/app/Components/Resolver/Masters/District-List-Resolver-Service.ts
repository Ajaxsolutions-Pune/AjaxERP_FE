import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../../Module/Masters/Brand.model';
import { BrandService } from '../../Services/Masters/BrandService';
import { DistrictService } from '../../Services/Masters/DistrictService';
import { District } from '../../Module/Masters/District';
import { DistrictEntity } from '../../Module/Masters/DistrictEntity.model';

@Injectable()

export class DistrictListResolverService implements Resolve<DistrictEntity[]> {
    constructor(private districtService: DistrictService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DistrictEntity[]> {
        return this.districtService.getDistricts();
    }

}
