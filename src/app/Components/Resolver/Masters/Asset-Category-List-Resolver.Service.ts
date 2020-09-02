import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssetCategoryEntity } from '../../Module/Masters/AssetCategory.model';
import { AssetCategoryService } from '../../Services/Masters/AssetCategory';

@Injectable()
export class AssetCategoryListResolverService implements Resolve<AssetCategoryEntity[]> {
    constructor(private assetCategoryService: AssetCategoryService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AssetCategoryEntity[]> {
        return this.assetCategoryService.getAssetCategorys();
    }
}
