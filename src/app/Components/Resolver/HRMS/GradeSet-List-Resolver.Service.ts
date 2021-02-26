import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { GradeSetEntity } from "../../Module/HRMS/GradeSet.model";
import { GradeSetService } from "../../Services/HRMS/GradeSetService";

@Injectable()

export class GradeSetListResolverService implements Resolve<GradeSetEntity[]> {
    constructor(private gradesetService: GradeSetService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GradeSetEntity[]> {
        return this.gradesetService.getgradesets();
    }

}
