import { Injectable } from '@angular/core';
import { Company } from './company';
import { Observable } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  API_BASE = 'https://firebootcamp-crm-api.azurewebsites.net/api';

  constructor(private httpClient: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
    .pipe(
      tap(data => { }),
      catchError(error => this.errorHandler<Company[]>(error))
    );
  }

  deleteCompany(companyId: any): Observable<Company> {
    return this.httpClient.delete<Company>(`${this.API_BASE}/company/${companyId}`)
    .pipe(
      tap(data => { console.log('tap has been hit!')}),
      catchError(error => this.errorHandler<Company>(error))
      );
  }

  addCompany(company: Company): Observable<Company> {
    return this.httpClient.post<Company>(`${this.API_BASE}/company`,
    company,
    { headers: new HttpHeaders().set('content-type', 'application/json') }
    )
    .pipe(
      catchError(error => this.errorHandler<Company>(error))
    );
  }

  private errorHandler<T>(error: Error): Observable<T> {
    console.error('CompanyService Error', error);
    return new Observable<T>();
  }

}
