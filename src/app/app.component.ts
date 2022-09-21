import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Company } from './company/company';
import { CompanyService } from './company/company.service';

@Component({
  selector: 'fbc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'Brisbane';
  companyCount$!: Observable<number>;

  constructor(private companyService: CompanyService) {
    this.companyCount$ = this.companyService.getCompanies()
    .pipe(
      map((companies: Company[]) => companies.length)
    );
  }
}
