import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssetEntity } from '../../Module/Masters/Asset.model';
import { AssetService } from '../../Services/Masters/AssetService';

@Injectable()

export class AssetListResolverService implements Resolve<AssetEntity[]> {
    constructor(private circleService: AssetService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AssetEntity[]> {
        return this.circleService.getAssets();
    }

}
