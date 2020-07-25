import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { State } from '../../Module/Masters/State.model';
import { StateEntity } from '../../Module/Masters/StateEntity.model';
import { District } from '../../Module/Masters/District';
import { DistrictEntity } from '../../Module/Masters/DistrictEntity.model';
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
    ListState: State[];
    AnswerTransfarmers(Entity: AnswerEntity[]): Answer[] {
        // this.states = new State()[Entity.length + 1];
        Entity.forEach(element => {
            this.answer = new Answer();
            this.answer.AnswerID = element.AnswerID;
            this.answer.Answer = element.Answer;
            this.answer.Is_Active = element.Is_Active;
            this.answer.Is_Auto = element.Is_Auto;
            this.answer.Sort_By = element.Sort_By;
            this.answers.push(this.answer);
        });
        return this.answers;
    }
    AnswerTransfarmerEntity(Entity: AnswerEntity): Answer {
        this.answer = new Answer();
        this.answer.AnswerID = Entity.AnswerID;
        this.answer.Answer = Entity.Answer;
        this.answer.Is_Active = Entity.Is_Active;
        this.answer.Is_Auto = Entity.Is_Auto;
        this.answer.Sort_By = Entity.Sort_By;
        return this.answer;
    }

    AnswerTransfarmer(Answer1: Answer): AnswerEntity {
        this.answerEntity = new AnswerEntity();
        this.answerEntity.AnswerID = Answer1.AnswerID;
        this.answerEntity.Answer = Answer1.Answer;
        this.answerEntity.Is_Active = Answer1.Is_Active;
        this.answerEntity.Is_Auto = Answer1.Is_Auto;
        this.answerEntity.Sort_By = Answer1.Sort_By;
        if (this.answer.Is_Active === 'true') { this.answer.Is_Active = '1'; } else { this.answer.Is_Active = '1'; }
        return this.answerEntity;
    }
}
