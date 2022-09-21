import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    private activatedRoute: ActivatedRoute
  ) {

    this.companyId = this.activatedRoute.snapshot.params['id'];
    this.isNewCompany = !this.companyId;

    this.companyForm = this.formBuilder.group(
      {
        name: ['Default', Validators.required],
        email: new FormControl(),
        phone: new FormControl()
      }
    );

    if(!this.isNewCompany){
      // Load the company values from API
    }
  }

  ngOnInit(): void {

  }

}
