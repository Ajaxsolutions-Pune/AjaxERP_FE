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
        Entity.forEach(element => {
            this.form = new FormObj();
            this.form.formId = element.formId;
            this.form.formName = element.formName;
            this.form.isActive = element.isActive;
            this.forms.push(this.form);
        });
        return this.forms;
    }
    formTransfarmerEntity(Entity: FormEntity): FormObj {
        console.log(Entity);
        this.form = new FormObj();
        this.form.formId = Entity.formId;
        this.form.formName = Entity.formName;
        this.form.isActive = Entity.isActive;
        return this.form;
    }

    formTransfarmer(form1: FormObj): FormEntity {
        this.formEntity = new FormEntity();
        this.formEntity.formId = form1.formId;
        this.formEntity.formName = form1.formName;
        this.formEntity.isActive = form1.isActive;
        if (form1.isActive === 'true') { this.formEntity.isActive = '1'; } else { this.formEntity.isActive = '0'; }
        console.log(this.formEntity);
        return this.formEntity;
    }
}
