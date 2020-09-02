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
    answers: Answer[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    AnswerTransfarmers(Entity: AnswerEntity[]): Answer[] {
        this.answers = [];
        Entity.forEach(element => {
            this.answer = new Answer();
            this.answer.answerId = element.answerId;
            this.answer.answer = element.answer;
            this.answer.createdBy = element.createdBy;
            this.answer.createdDate = element.createdDate;
            this.answer.modifiedBy = element.modifiedBy;
            this.answer.modifiedDate = element.modifiedDate;
            if (element.isActive === '1') {
                this.answer.isActive = 'Active'.toString().trim();
            } else { this.answer.isActive = 'Inactive'.toString().trim(); }
            this.answers.push(this.answer);
        });
        return this.answers;
    }
    AnswerTransfarmerEntity(Entity: AnswerEntity): Answer {
        console.log(Entity);
        this.answer = new Answer();
        this.answer.answerId = Entity.answerId;
        this.answer.answer = Entity.answer;
        this.answer.createdBy = Entity.createdBy;
        this.answer.createdDate = Entity.createdDate;
        this.answer.modifiedBy = Entity.modifiedBy;
        this.answer.modifiedDate = Entity.modifiedDate;
        console.log(Entity.isActive.toString().trim() === '1');
        console.log(Entity.isActive);
         // tslint:disable-next-line:max-line-length
         if (Entity.isActive === '1') { this.answer.isActive = 'true'.toString().trim(); } else { this.answer.isActive = ''.toString().trim(); }
        console.log(this.answer.isActive);
        return this.answer;
    }

    AnswerTransfarmer(Answer1: Answer): AnswerEntity {
        this.answerEntity = new AnswerEntity();
        this.answerEntity.answerId = Answer1.answerId;
        this.answerEntity.answer = Answer1.answer;
        this.answerEntity.createdBy = Answer1.createdBy;
        this.answerEntity.createdDate = Answer1.createdDate;
        this.answerEntity.modifiedBy = Answer1.modifiedBy;
        this.answerEntity.modifiedDate = Answer1.modifiedDate;
         if (Answer1.isActive.toString().trim() === 'true') { this.answerEntity.isActive = '1'; } else { this.answerEntity.isActive = '0'; }
        return this.answerEntity;
    }
}
