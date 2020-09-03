import { Injectable } from '@angular/core';
import { environment } from '../../Module/environment';
import { QuestionEntity, Question } from '../../Module/Masters/Question.model';

@Injectable()
export class QuestionTransfarmer {
    str: string;
    questionEntity: QuestionEntity;
    question: Question;
    questions: Question[] = [];
    env = environment;
    constructor() {
        this.str = this.env.apiServiceIPPort;
    }
    QuestionTransfarmers(Entity: QuestionEntity[]): Question[] {
        this.questions = [];
        Entity.forEach(element => {
            this.question = new Question();
            this.question.questionId = element.questionId;
            this.question.question = element.question;
            this.question.qaTypeCode = element.qaTypeCode;

            this.question.createdBy = element.createdBy;
            this.question.createdDate = element.createdDate;
            this.question.modifiedBy = element.modifiedBy;
            this.question.modifiedDate = element.modifiedDate;

            if (element.isActive === '1') {
                this.question.isActive = 'Active'.toString().trim();
            } else { this.question.isActive = 'Inactive'.toString().trim(); }
            this.questions.push(this.question);
        });
        return this.questions;
    }
    QuestionTransfarmerEntity(Entity: QuestionEntity): Question {
        console.log(Entity);
        this.question = new Question();
        this.question.questionId = Entity.questionId;
        this.question.question = Entity.question;
        this.question.qaTypeCode = Entity.qaTypeCode;

        this.question.createdBy = Entity.createdBy;
        this.question.createdDate = Entity.createdDate;
        this.question.modifiedBy = Entity.modifiedBy;
        this.question.modifiedDate = Entity.modifiedDate;

        if (Entity.isActive === '1') {
            this.question.isActive = 'true'.toString().trim();
        } else { this.question.isActive = ''.toString().trim(); }

        return this.question;
    }

    QuestionTransfarmer(question1: Question): QuestionEntity {
        this.questionEntity = new QuestionEntity();
        this.questionEntity.questionId = question1.questionId;
        this.questionEntity.question = question1.question;
        this.questionEntity.qaTypeCode = question1.qaTypeCode;

        this.questionEntity.createdBy = question1.createdBy;
        this.questionEntity.createdDate = question1.createdDate;
        this.questionEntity.modifiedBy = question1.modifiedBy;
        this.questionEntity.modifiedDate = question1.modifiedDate;

        if (question1.isActive.toString().trim() === 'true') {
            this.questionEntity.isActive = '1';
        } else { this.questionEntity.isActive = '0'; }
        return this.questionEntity;
    }
}
