import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../../Module/Masters/Brand.model';
import { BrandService } from '../../Services/Masters/BrandService';
import { AnswerService } from '../../Services/Masters/AnswerService';
import { AnswerEntity } from '../../Module/Masters/Answer.model';

@Injectable()

export class AnswerListResolverService implements Resolve<AnswerEntity[]> {
    constructor(private answerService: AnswerService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AnswerEntity[]> {
        return this.answerService.getAnswers();
    }

}
