import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../Module/environment';
import { Insertstatus } from '../../Module/Masters/Insert_status.model';
import { Commodity, CommodityEntity } from '../../Module/Report/Commodity.model';

@Injectable({
  providedIn: 'root'
})
export class CommodityServiceService {
  str: string;

  env = environment;

  // API path
  base_path = 'http://ajaxdevdbcl.eastus.cloudapp.azure.com:8085/DoctorApp/Emp';

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // Handle API errors
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
        console.error('client side error', errorResponse.error.message);
    }
    return throwError('d');
}

  // Create a new item
  createItem(item): Observable<Commodity> {
    console.log(item);
    return this.http
      .post<Commodity>(this.base_path, item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //   Save(saveEntityObj: EmployeeEntity): Observable<Insertstatus> {
  //     //   saveEntityObj.tlCode = null;
  //     console.log(this.str + '/Grade');
  //     console.log(saveEntityObj);
  //     return this.httpClient.post<Insertstatus>(this.str + '/Grade',
  //         saveEntityObj, this.env.httpOptions).pipe(catchError(this.handleError));
  // }


  // Get single student data by ID
  getItem(empId: string): Observable<CommodityEntity> {
    return this.http
      .get<CommodityEntity>(this.base_path + '/' + empId)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get students data
  getList(): Observable<Commodity[]> {
    return this.http
      .get<Commodity[]>(this.base_path + '/getList')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Update item by id
  updateItem(element): Observable<Commodity[]> {
    return this.http
      .post<Commodity[]>(this.base_path, JSON.stringify(element), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  Save(saveEntityObj: CommodityEntity): Observable<Insertstatus> {
    //   saveEntityObj.tlCode = null;
    // console.log(this.str + '/Grade');
    console.log(saveEntityObj);
    return this.http.post<Insertstatus>(this.base_path,
      saveEntityObj, this.env.httpOptions).pipe(catchError(this.handleError));
  }

  // Delete item by id
  deleteItem(empId: string) {
    return this.http
      .delete<Commodity>(this.base_path + '/delete/' + empId, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}

