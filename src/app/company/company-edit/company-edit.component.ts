import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'fbc-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {
  isNewCompany: boolean;
  companyId: number;
  companyForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

    this.companyId = this.activatedRoute.snapshot.params['id'];
    this.isNewCompany = !this.companyId;

    this.companyForm = this.formBuilder.group(
      {
        name: ['SSW', Validators.required],
        email: new FormControl(),
        phone: new FormControl(),
      }
    );

    if (!this.isNewCompany) {
      this.companyService.getCompany(this.companyId)
        .subscribe((company: Company) => {
          this.companyForm.patchValue(company);
        })
    }
  }

  ngOnInit(): void {
  }

  submitCompanyForm() {
    let company: Company = { ...this.companyForm.value, id: this.companyId };

    if (this.isNewCompany) {
      this.companyService.addCompany(company)
        .subscribe(company => {
          this.router.navigateByUrl('/company/list');
        });
    } else {
      this.companyService.updateCompany(company)
        .subscribe(company => {
          this.router.navigateByUrl('/company/list');
        });
    }
  }
}
