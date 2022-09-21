import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { CompanyService } from './company/company.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyTableComponent } from './company/company-table/company-table.component';
import { Company } from './company/company';
import { By } from '@angular/platform-browser';


describe(`Component: App Component`, () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let companySvc: CompanyService;
  let de: DebugElement;

  // Arrange
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CompanyListComponent,   // Our routing module needs it
        CompanyTableComponent,  // Our routing module needs it
        CompanyEditComponent,   // Our routing module needs it
      ],
      imports: [
        AppRoutingModule, // Routerlink in AppComponent needs it
        HttpClientModule,
        ReactiveFormsModule
      ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    companySvc = TestBed.inject(CompanyService);
  });

  it(`companyCount = 1`, () => {

    // Arrange (specific to test)
    let testCompany: Company = {
      id: 1,
      name: "Fake Company C",
      email: "fakeEmail@ssw.com.au",
      phone: 12345
    };

    // Act
    spyOn(companySvc, 'getCompanies').and.returnValue(of([testCompany]))
    fixture.detectChanges();

    // Assert
    expect(component.companyCount$.subscribe(c => {
      expect(c).toEqual(1);
    }))
  });

  it(`CompanyCount HTML should update`, () => {
    // Arrange (specific to test)
    let testCompany: Company = {
      id: 1,
      name: "Fake Company C",
      email: "fakeEmail@ssw.com.au",
      phone: 12345
    };
    // spy on the service so we can intercept the call
    // to 'getCompanies' and provide our own test value
    spyOn(companySvc, 'getCompanies').and.returnValue(of([
      testCompany
    ]))
    fixture.detectChanges();

    let el = fixture.debugElement.query(By.css('#company-count')).nativeElement;

    expect(el.textContent).toEqual('Companies (#1)');
  });
});
