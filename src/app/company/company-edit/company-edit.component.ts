import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  }

  ngOnInit(): void {
    if (!this.isNewCompany) {
      this.companyService.getCompany(this.companyId)
        .subscribe((company: Company) => {
          this.companyForm.patchValue(company);
        })

    }

    let nameChanges$ = this.companyForm.controls['name'].valueChanges;

    nameChanges$.subscribe(
      x => console.log(x)
    );
  }

  submitCompanyForm() {
    let company: Company = { ...this.companyForm.value, id: this.companyId };
    // let compamyName = this.companyForm.controls['name'].setValue('SSW', { emitEvent: false })

    // let command$: Observable<Company>;

    if (this.isNewCompany) {

      this.companyService.addCompany(company)
    } else {
      this.companyService.updateCompany(company)
    }

    this.router.navigateByUrl('/company/list');
  }
}
