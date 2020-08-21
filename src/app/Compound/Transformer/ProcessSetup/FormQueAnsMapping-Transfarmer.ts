import { Injectable } from '@angular/core';
import { environment } from '../../Module/environment';
import { FormQueAnsMappingEntity, FormQueAnsMapping } from '../../Module/ProcessSetup/FormQueAnsMapping.model';
@Injectable()
export class FormQueAnsMappingTransfarmer {
    str: string;
    OjectEntity: FormQueAnsMappingEntity;
    Oject: FormQueAnsMapping;
    arrOject: FormQueAnsMapping[] = [];
    env = environment;
    constructor() {
        this.str = this.env.apiServiceIPPort;
    }
    FormQueAnsMappingTransfarmers(Entity: FormQueAnsMappingEntity[]): FormQueAnsMapping[] {
        this.arrOject = [];
        Entity.forEach(element => {
            this.Oject = new FormQueAnsMapping();
            this.Oject.fqamId = element.fqamId;
            this.Oject.formId = element.formId;
            this.Oject.formQueSeqNo = element.formQueSeqNo;
            this.Oject.questionId = element.questionId;
            this.Oject.questionIdText = element.questionIdText;
            this.Oject.questionIdText = element.questionIdText;
            this.Oject.isQuestionMandatory = element.isQuestionMandatory;
            this.Oject.isQuestionMandatoryText = element.isQuestionMandatoryText;
            this.Oject.answerId = element.answerId.toString();
            this.Oject.answerIdText = element.answerIdText;
            this.Oject.queGroup = element.queGroup;
            this.Oject.nextQueGroup = element.nextQueGroup;
            this.Oject.nextFormId = element.nextFormId;
            this.Oject.nextFormIdText = element.nextFormIdText;
            this.Oject.isActiveText = element.isActiveText;
            if (element.isQuestionMandatory === '1') {
                this.Oject.isQuestionMandatory = 'true'.toString().trim();
            } else { this.Oject.isQuestionMandatory = ''.toString().trim(); }
            if (element.isActive === '1') {
                this.Oject.isActive = 'true'.toString().trim();
            } else { this.Oject.isActive = ''.toString().trim(); }
            this.arrOject.push(this.Oject);
        });
        return this.arrOject;
    }
    FormQueAnsMappingTransfarmerEntity(Entity: FormQueAnsMappingEntity): FormQueAnsMapping {
        console.log(Entity);
        this.Oject = new FormQueAnsMapping();
        this.Oject.fqamId = Entity.fqamId;
        this.Oject.formId = Entity.formId;
        this.Oject.formQueSeqNo = Entity.formQueSeqNo;
        this.Oject.questionId = Entity.questionId;
        this.Oject.questionIdText = Entity.questionIdText;
        this.Oject.questionIdText = Entity.questionIdText;
        this.Oject.isQuestionMandatory = Entity.isQuestionMandatory;
        this.Oject.isQuestionMandatoryText = Entity.isQuestionMandatoryText;
        this.Oject.answerId = Entity.answerId;
        this.Oject.answerIdText = Entity.answerIdText;
        this.Oject.queGroup = Entity.queGroup;
        this.Oject.nextQueGroup = Entity.nextQueGroup;
        this.Oject.nextFormId = Entity.nextFormId;
        this.Oject.nextFormIdText = Entity.nextFormIdText;
        this.Oject.isActiveText = Entity.isActiveText;
        this.Oject.isActive = Entity.isActive;
        if (Entity.isActive === '1') {
            this.Oject.isActive = 'true'.toString().trim();
        } else { this.Oject.isActive = ''.toString().trim(); }

        return this.Oject;
    }

    FormQueAnsMappingTransfarmer(element: FormQueAnsMapping): FormQueAnsMappingEntity {
        this.OjectEntity = new FormQueAnsMappingEntity();
        this.OjectEntity.fqamId = element.fqamId;
        this.OjectEntity.formId = element.formId;
        this.OjectEntity.formQueSeqNo = element.formQueSeqNo;
        this.OjectEntity.questionId = element.questionId;
        this.OjectEntity.questionIdText = element.questionIdText;
        this.OjectEntity.questionIdText = element.questionIdText;
        this.OjectEntity.isQuestionMandatory = element.isQuestionMandatory;
        this.OjectEntity.isQuestionMandatoryText = element.isQuestionMandatoryText;
        this.OjectEntity.answerId = element.answerId;
        this.OjectEntity.answerIdText = element.answerIdText;
        this.OjectEntity.queGroup = element.queGroup;
        this.OjectEntity.nextQueGroup = element.nextQueGroup;
        this.OjectEntity.nextFormId = element.nextFormId;
        this.OjectEntity.nextFormIdText = element.nextFormIdText;
        this.OjectEntity.isActiveText = element.isActiveText;
         if (element.isActive === 'true') {  this.OjectEntity.isActive = '1';
             } else { this.OjectEntity.isActive = '0'; }
        if (element.isActive.toString().trim() === 'true') {
            this.OjectEntity.isActive = '1';
        } else {
            this.OjectEntity.isActive = '0';
        }
        return this.OjectEntity;
    }
}
