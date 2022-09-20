import { Injectable } from '@angular/core';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor() { }

  getCompanies(): Company[] {
    return [
      { name: 'test company one', email: 'one@test.com', phone: 111},
      { name: 'test company two', email: 'two@test.com', phone: 222}
    ];
  }
}
