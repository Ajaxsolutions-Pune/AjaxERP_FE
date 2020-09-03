import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { FormEntity, FormObj } from '../../Module/Masters/Form.model';

@Injectable()
export class FormTransfarmer {
    str: string;
    formEntity: FormEntity;
    form: FormObj;
    forms: FormObj[] = [];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    fTransfarmers(Entity: FormEntity[]): FormObj[] {
        this.forms = [];
        Entity.forEach(element => {
            this.form = new FormObj();
            this.form.formId = element.formId;
            this.form.formName = element.formName;
            this.form.isActive = element.isActive;
            this.form.createdBy = element.createdBy;
            this.form.createdDate = element.createdDate;
            this.form.modifiedBy = element.modifiedBy;
            this.form.modifiedDate = element.modifiedDate;
            if (element.isActive === '1') {
                this.form.isActive = 'Active'.toString().trim();
            } else { this.form.isActive = 'Inactive'.toString().trim(); }
            this.forms.push(this.form);
        });
        return this.forms;
    }
    formTransfarmerEntity(Entity: FormEntity): FormObj {
        this.form = new FormObj();
        this.form.formId = Entity.formId;
        this.form.formName = Entity.formName;
        this.form.isActive = Entity.isActive;

        this.form.createdBy = Entity.createdBy;
        this.form.createdDate = Entity.createdDate;
        this.form.modifiedBy = Entity.modifiedBy;
        this.form.modifiedDate = Entity.modifiedDate;

        if (Entity.isActive === '1') {
            this.form.isActive = 'true'.toString().trim();
        } else {
            this.form.isActive = ''.toString().trim();
        }
        return this.form;
    }

    formTransfarmer(form1: FormObj): FormEntity {
        this.formEntity = new FormEntity();
        this.formEntity.formId = form1.formId;
        this.formEntity.formName = form1.formName;
        this.formEntity.isActive = form1.isActive;

        this.formEntity.createdBy = form1.createdBy;
        this.formEntity.createdDate = form1.createdDate;
        this.formEntity.modifiedBy = form1.modifiedBy;
        this.formEntity.modifiedDate = form1.modifiedDate;
        if (form1.isActive.toString().trim() === 'true') { this.formEntity.isActive = '1'; } else { this.formEntity.isActive = '0'; }
        return this.formEntity;
    }
}
