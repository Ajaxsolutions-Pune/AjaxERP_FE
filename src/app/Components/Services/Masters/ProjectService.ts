import { Injectable, Component } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Project, ProjectEntity } from '../../Module/Masters/Project.model';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { DialogService } from '../MatServices/Dialog.service';
import { DatePipe } from '@angular/common';

@Injectable()
export class ProjectService {
    str: string;
    projects: Project[];
    env = environment;
    ListProject: Project[];
    constructor(private httpClient: HttpClient, public dialogService: DialogService) {
        this.str = this.env.apiServiceIPPort;
    }
    Listproject: Project[];
    getProjects(): Observable<ProjectEntity[]> {
        console.log(this.httpClient.get<ProjectEntity[]>(this.str + '/Project/getList'));
        return this.httpClient.get<ProjectEntity[]>(this.str + '/Project/getList',
         this.env.httpOptions);
    }   
     
    getProject(ProjectCode: string): Observable<ProjectEntity> {
        return this.httpClient.get<ProjectEntity>(this.str + '/Project/' + ProjectCode,
            this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Save(saveEntityObj: ProjectEntity): Observable<Insertstatus> {
        saveEntityObj.projectCode = null;
        console.log(this.str + '/Project');
        return this.httpClient.post<Insertstatus>(this.str + '/Project',
            saveEntityObj, this.env.httpOptions).pipe(catchError(this.handleError));
            
    }

    Update(updateEntityObj: ProjectEntity): Observable<Insertstatus> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/Project', updateEntityObj
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
        const data = null; // call api
        console.log(this.dialogService);
        this.dialogService.openModal('Title1', 'Message Test', () => {
            // confirmed
            console.log('Yes');
        }, () => {
            // not confirmed
            console.log('No');
        });
    }
}
