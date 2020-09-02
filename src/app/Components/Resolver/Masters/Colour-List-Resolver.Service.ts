import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ColourService } from '../../Services/Masters/ColourService';
import { ColourEntity } from '../../Module/Masters/Colour.model';

@Injectable()

export class ColourListResolverService implements Resolve<ColourEntity[]> {
    constructor(private colourService: ColourService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ColourEntity[]> {
        return this.colourService.getColours();
    }

}
