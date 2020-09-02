import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionService } from '../../Services/Masters/QuestionService';
import { QuestionEntity } from '../../Module/Masters/Question.model';

@Injectable()

export class QuestionListResolverService implements Resolve<QuestionEntity[]> {
    constructor(private questionService: QuestionService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QuestionEntity[]> {
        return this.questionService.getQuestions();
    }

}
