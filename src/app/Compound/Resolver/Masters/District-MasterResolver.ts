import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../../Module/Masters/Brand.model';
import { BrandService } from '../../Services/Masters/BrandService';
import { DistrictService } from '../../Services/Masters/DistrictService';
import { DistrictEntity } from '../../Module/Masters/DistrictEntity.model';
@Injectable()

export class DistrictMasterResolverService implements Resolve<DistrictEntity> {
    districtNumber: string;
    constructor(private districtService: DistrictService, private route: ActivatedRoute) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DistrictEntity> {
        this.districtNumber = route.params.id;
        return this.districtService.getDistrict(+this.districtNumber);
    }

}
