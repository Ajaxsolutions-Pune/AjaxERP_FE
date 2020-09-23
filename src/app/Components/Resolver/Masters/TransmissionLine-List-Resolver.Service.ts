import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransmissionLineService } from '../../Services/Masters/TransmissionLineService';
import { TransmissionLineEntity } from '../../Module/Masters/TransmissionLine.model';

@Injectable()

export class TransmissionLineListResolverService implements Resolve<TransmissionLineEntity[]> {
    constructor(private transmissionLineService: TransmissionLineService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TransmissionLineEntity[]> {
        return this.transmissionLineService.getTransmissionLines();
    }

}
