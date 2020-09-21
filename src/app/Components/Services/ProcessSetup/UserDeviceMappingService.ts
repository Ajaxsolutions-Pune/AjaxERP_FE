import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { UserDeviceMappingEntity } from '../../Module/ProcessSetup/UserDeviceMapping.model';
@Injectable()
export class UserDeviceMappingService {
    str: string;
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    getUserDeviceMappings(): Observable<UserDeviceMappingEntity[]> {
        return this.httpClient.get<UserDeviceMappingEntity[]>(this.str +
            '/UserDeviceMapping/getList',            
            this.env.httpOptions);
            //'/ProcessFormMapping/getList',
    }

    /* filldrpUserDeviceMappings(): Observable<UserDeviceMappingEntity[]> {
        return this.httpClient.get<UserDeviceMappingEntity[]>(this.str +
            '/UserDeviceMapping/getList?status=1',
            this.env.httpOptions);
    }*/

    getUserDeviceMapping(deviceId: string): Observable<UserDeviceMappingEntity[]> {
        console.log(this.str + '/UserDeviceMapping/getList');
        return this.httpClient.get<UserDeviceMappingEntity[]>(
            this.str + '/ProcessFormMapping/getList?processId=' + deviceId
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Save(saveEntityObj: UserDeviceMappingEntity[]): Observable<Insertstatus> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        console.log("####### Before send to service ####");
        saveEntityObj.forEach(element => {
            /*console.log('Id ->'+element.fqamId +' Is_active -->'+element.isActive);  
            console.log('ansId ->'+element.answerId +' AnsText -->'+element.answerIdText);
            console.log('CreatedBy ->'+element.createdBy +' CreatedDate -->'+element.createdDate);
            console.log('FormId ->'+element.formId +' FormQueSeqNo -->'+element.formQueSeqNo);
            console.log('isQueMandatory ->'+element.isQuestionMandatory +' NextFormId -->'+element.nextFormId);
            console.log('ModifyBy ->'+element.modifiedBy +' ModifyDate -->'+element.modifiedDate);
            console.log('NextQueGrp ->'+element.nextQueGroup +' Que Grp -->'+element.queGroup);
            console.log('Que Id ->'+element.questionId +' Question ID -->'+element.questionIdText);
            console.log('Update flag ->'+element.updateFlag ); */    
            
            console.log('Id ->'+element.udmId +' Is_active -->'+element.isActive);  
            //console.log('ansId ->'+element.answerId +' AnsText -->'+element.answerIdText);
            console.log('CreatedDate ->'+element.createdBy +' CreatedDate -->'+element.createdDate);
            console.log('LoginId ->'+element.loginId +' LoginName -->'+element.loginIdText);
            //console.log('isQueMandatory ->'+element.isQuestionMandatory +' NextFormId -->'+element.nextFormId);
            console.log('ModifyBy ->'+element.modifiedBy +' ModifyDate -->'+element.modifiedDate);
            //console.log('NextQueGrp ->'+element.nextQueGroup +' Que Grp -->'+element.queGroup);
            //console.log('Que Id ->'+element.questionId +' Question ID -->'+element.questionIdText);
            console.log('Update flag ->'+element.updateFlag );            
        });
        ///FormQueAnsMapping/createList
        return this.httpClient.post<Insertstatus>(this.str + '/UserDeviceMapping', saveEntityObj
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Update(updateEntityObj: UserDeviceMappingEntity): Observable<Insertstatus> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/UserDeviceMapping', updateEntityObj
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
