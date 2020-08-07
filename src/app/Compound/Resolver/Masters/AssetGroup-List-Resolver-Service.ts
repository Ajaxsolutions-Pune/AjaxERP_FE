import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssetGroupService } from '../../Services/Masters/AssetGroupService';
import { AssetGroupEntity } from '../../Module/Masters/AssetGroup.model';

@Injectable()

export class AssetGroupListResolverService implements Resolve<AssetGroupEntity[]> {
    constructor(private assetGroupService: AssetGroupService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AssetGroupEntity[]> {
        return this.assetGroupService.getAssetGroups();
    }

}
