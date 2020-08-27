import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { Cluster, ClusterEntity } from '../../Module/Masters/Cluster.model';

@Injectable()
export class ClusterService {
    str: string;
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    getClusters(): Observable<ClusterEntity[]> {
        return this.httpClient.get<ClusterEntity[]>(this.str + '/Cluster/getList',
            this.env.httpOptions);
    }

    getCluster(qaTypeCode: string): Observable<ClusterEntity> {
        return this.httpClient.get<ClusterEntity>(this.str + '/Cluster/' + qaTypeCode
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Save(saveEntityObj: ClusterEntity): Observable<Insertstatus> {
        console.log(saveEntityObj);
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.httpClient.post<Insertstatus>(this.str + '/Cluster', saveEntityObj
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Update(updateEntityObj: ClusterEntity): Observable<Insertstatus> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<Insertstatus>(this.str + '/Cluster', updateEntityObj
            , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
