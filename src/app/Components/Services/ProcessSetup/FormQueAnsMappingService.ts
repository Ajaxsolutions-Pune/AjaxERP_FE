import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { FormQueAnsMappingEntity } from '../../Module/ProcessSetup/FormQueAnsMapping.model';
@Injectable()
export class FormQueAnsMappingService {
    str: string;
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    getFormQueAnsMappings(): Observable<FormQueAnsMappingEntity[]> {
        return this.httpClient.get<FormQueAnsMappingEntity[]>(this.str +
            '/FormQueAnsMapping/getList',
            this.env.httpOptions);
    }
    filldrpFormQueAnsMappings(): Observable<FormQueAnsMappingEntity[]> {
        return this.httpClient.get<FormQueAnsMappingEntity[]>(this.str +
            '/FormQueAnsMapping/getList?status=1',
            this.env.httpOptions);
    }

    getFormQueAnsMapping(formId: string): Observable<FormQueAnsMappingEntity[]> {
        return this.httpClient.get<FormQueAnsMappingEntity[]>(
            this.str + '/GetFQAMapping/getList/Sudarshan/' + this.env.OuCode +
            '?formId=' + formId
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Save(saveEntityObj: FormQueAnsMappingEntity[]): Observable<Insertstatus> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        console.log('####### Before send to service ####');
        // saveEntityObj.forEach(element => {
        //    console.log('Id ->' + element.fqamId + ' Is_active -->' + element.isActive);
        //    console.log('ansId ->' + element.answerId + ' AnsText -->' + element.answerIdText);
        //    console.log('CreatedBy ->' + element.createdBy + ' CreatedDate -->' + element.createdDate);
        //    console.log('FormId ->' + element.formId + ' FormQueSeqNo -->' + element.formQueSeqNo);
        //    console.log('isQueMandatory ->' + element.isQuestionMandatory + ' NextFormId -->' + element.nextFormId);
        //    console.log('ModifyBy ->' + element.modifiedBy + ' ModifyDate -->' + element.modifiedDate);
        //    // console.log('NextQueGrp ->' + element.nextQueGroup + ' Que Grp -->' + element.queGroup);
        //  console.log('Que Id ->' + element.questionId + ' Question ID -->' + element.questionIdText);
        //    console.log('Update flag ->' + element.updateFlag);
        //  });

        return this.httpClient.post<Insertstatus>(this.str + '/FormQueAnsMapping/createList', saveEntityObj
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Update(updateEntityObj: FormQueAnsMappingEntity): Observable<Insertstatus> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/FormQueAnsMapping', updateEntityObj
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
