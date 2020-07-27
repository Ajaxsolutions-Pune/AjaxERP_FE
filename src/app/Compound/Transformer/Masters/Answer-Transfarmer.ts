import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { AnswerEntity, Answer } from '../../Module/Masters/Answer.model';

@Injectable()
export class AnswerTransfarmer {
    str: string;
    answerEntity: AnswerEntity;
    answer: Answer;
    answers: Answer[] = [];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    AnswerTransfarmers(Entity: AnswerEntity[]): Answer[] {
        Entity.forEach(element => {
            this.answer = new Answer();
            this.answer.answerId = element.answerId;
            this.answer.answer = element.answer;
            this.answer.isActive = element.isActive;
            this.answers.push(this.answer);
        });
        return this.answers;
    }
    AnswerTransfarmerEntity(Entity: AnswerEntity): Answer {
        console.log(Entity);
        this.answer = new Answer();
        this.answer.answerId = Entity.answerId;
        this.answer.answer = Entity.answer;
        this.answer.isActive = Entity.isActive;
        return this.answer;
    }

    AnswerTransfarmer(Answer1: Answer): AnswerEntity {
        this.answerEntity = new AnswerEntity();
        this.answerEntity.answerId = Answer1.answerId;
        this.answerEntity.answer = Answer1.answer;
        this.answerEntity.isActive = Answer1.isActive;
        if (this.answer.isActive === 'true') { this.answer.isActive = '1'; } else { this.answer.isActive = '1'; }
        return this.answerEntity;
    }
}
