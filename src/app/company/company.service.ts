import { Injectable, OnInit } from '@angular/core';
import { Company } from './company';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  API_BASE = 'https://firebootcamp-crm-api.azurewebsites.net/api';

  companies$: BehaviorSubject<Company[]> = new BehaviorSubject<Company[]>([]);

  constructor(private httpClient: HttpClient) {
    this.loadCompanies();
  }

  loadCompanies(){
    this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
    .pipe(
      catchError(error => this.errorHandler<Company[]>(error))
    )
    .subscribe((companies:Company[]) => {
      this.companies$.next(companies);
    });
  }

  getCompanies(): Observable<Company[]> {
    return this.companies$;
    // return this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
    // .pipe(
    //   tap(data => { }),
    //   catchError(error => this.errorHandler<Company[]>(error))
    // );
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

  getCompany(companyId: number): Observable<Company> {
    return this.httpClient.get<Company>(`${this.API_BASE}/company/${companyId}`)
    .pipe(
      catchError(error => this.errorHandler<Company>(error))
      );
  }

  updateCompany(company: Company): Observable<Company> {
    return this.httpClient.put<Company>(`${this.API_BASE}/company/${company.id}`,
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
