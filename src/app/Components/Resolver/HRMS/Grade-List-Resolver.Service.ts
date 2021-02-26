import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { GradeEntity } from "../../Module/HRMS/Grade.model";
import { GradeService } from "../../Services/HRMS/GradeService";


@Injectable()

export class GradeListResolverService implements Resolve<GradeEntity[]> {
    constructor(private gradeService: GradeService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GradeEntity[]> {
        return this.gradeService.getgrades();
    }

}
